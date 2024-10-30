import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import MerchantSidebar from "./Sidebar/MerchantSidebar";
import FarmerSidebar from "./Sidebar/FarmerSidebar";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useGetUserDataQuery } from "../features/apiSlice";

const BidComponent = () => {
  const { data: userData, isLoading, isError } = useGetUserDataQuery();
  const [socket, setSocket] = useState(null);
  const [crops, setCrops] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState({ id: null, base_price: 0 });
  const [bidAmount, setBidAmount] = useState("");
  const navigate = useNavigate();

  const userType = Cookies.get("user_type");

  useEffect(() => {
    const token = Cookies.get("token");
    const newSocket = io("https://platform.krishibharat.tech:8855", {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("crops_data_update", (data) => {
      if (Array.isArray(data)) {
        setCrops(data);
      } else if (data && data.crops && Array.isArray(data.crops)) {
        setCrops(data.crops);
      }
    });

    newSocket.on("bid_updated", (updatedCrop) => {
      setCrops((prevCrops) =>
        prevCrops.map((crop) =>
          crop.id === updatedCrop.id ? updatedCrop : crop,
        ),
      );
    });

    newSocket.on("error", (error) => {
      setError(`WebSocket error: ${error}`);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && selectedState) {
      socket.emit("set_zone", selectedState);
      socket.send(`get_crops_by_zone:${selectedState}`);
    }
  }, [selectedState, socket]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const openModal = (crop) => {
    if (crop && crop.id) {
      setSelectedCrop(crop);
      setBidAmount("");
      setShowModal(true);
    } else {
      console.error("Crop does not have an id:", crop);
      setError("Invalid crop data. Please try again.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCrop(null);
  };

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const placeBid = () => {
    console.log("selectedCrop:", selectedCrop.id);
    if (!selectedCrop || !selectedCrop.id) {
      console.error(
        "Error placing bid: 'selectedCrop' or 'selectedCrop.id' is not defined.",
        selectedCrop,
      );
      setError("Please select a crop before placing a bid.");
      return;
    }

    const bidValue = parseFloat(bidAmount);
    if (isNaN(bidValue) || bidValue <= selectedCrop.base_price) {
      alert("Please enter a valid bid higher than the current bid.");
      return;
    }

    fetch("https://platform.krishibharat.tech:8855/api/crops/place_bid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify({
        id: selectedCrop.id,
        buyer_id: 14,
        sold_price: bidValue,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${errorText || response.statusText}`);
        }
        const responseText = await response.text();
        console.log("Raw server response:", responseText);
        return responseText;
      })
      .then((text) => {
        let data;
        try {
          data = text ? JSON.parse(text) : {};
          console.log("data:", data);
        } catch (e) {
          console.warn("Response is not valid JSON:", text);
          data = {};
        }

        console.log("selected cropaoeu:", selectedCrop);
        setCrops((prevCrops) =>
          prevCrops.map((crop) =>
            crop.id === selectedCrop.id
              ? { ...crop, sold_price: bidValue, is_sold: true }
              : crop,
          ),
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error placidhnhhng bid: ", error);
        setError(error.message);
      });
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar based on user type */}
      {userType === "merchant" ? <MerchantSidebar /> : <FarmerSidebar />}

      <div className="flex-grow bg-gray-50">
        {/* Navbar */}
        <header className="bg-white shadow-md z-10 sticky top-0 w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-lg sm:text-3xl font-bold text-gray-800">
              {isLoading
                ? "Loading..."
                : isError
                  ? "Error loading user data."
                  : `Welcome, ${userData.fname.charAt(0).toUpperCase() +
                  userData.fname.slice(1)
                  }`}
            </h1>
            <div className="flex items-center">
              <div
                onClick={() => navigate("/wallet")}
                className="mr-6 flex gap-2 bg-[#4a7c59] transition ease-in-out duration-300 hover:bg-green-800 px-4 py-2 rounded-lg cursor-pointer"
              >
                <AccountBalanceWalletIcon style={{ color: "white" }} />
                <p className="text-white">Wallet</p>
              </div>
              <img
                src="/profile-circle.svg"
                alt="Default profile picture"
                className="w-10 h-8 sm:w-12 sm:h-10"
              />
            </div>
          </div>
        </header>

        {/* State Selector */}
        <div className="mb-6 p-6">
          <label
            htmlFor="state"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select State:
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select State --</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
          </select>
        </div>

        {/* Crops list based on selected state */}
        {selectedState && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Crops Available in {selectedState}:
            </h2>
            {crops.length === 0 ? (
              <p className="text-gray-600">
                No crops available for bidding in this state.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto divide-y divide-gray-200 border border-gray-300 shadow-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Crop Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Minimum Bid
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Current Bid Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {crops.map((crop) => (
                      <tr key={crop.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {crop.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {crop.qty}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {crop.base_price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {crop.sold_price ? crop.sold_price : "Not Sold"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {crop.is_sold ? "Sold" : "Available"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {!crop.is_sold && (
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                              onClick={() => openModal(crop)}
                            >
                              Place Bid
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Error message display */}
        {error && <p className="text-red-500 my-4">{error}</p>}

        {/* Modal for placing bid */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-semibold mb-4">
                Place a Bid for {selectedCrop?.name}
              </h2>
              <p className="mb-4 text-gray-600">
                Current Bid: ₹{selectedCrop?.base_price}
              </p>
              <input
                type="number"
                placeholder="Enter your bid"
                value={bidAmount}
                onChange={handleBidAmountChange}
                className="block w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={placeBid}
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BidComponent;

