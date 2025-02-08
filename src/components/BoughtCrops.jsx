import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFetchCropsQuery,
  useGetContractsQuery,
  useGetUserDataQuery,
  useUpdateContractsMutation,
} from "../features/apiSlice";
import FarmerSidebar from "./Sidebar/FarmerSidebar";
import MerchantSidebar from "./Sidebar/MerchantSidebar";
const BoughtCrops = () => {
  const navigate = useNavigate();
  const { data: userData, isLoadingData, isError } = useGetUserDataQuery();
  const { data: crops = [], error, isLoading } = useFetchCropsQuery();
  const [updateContract] = useUpdateContractsMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const {
    data: contracts,
    isLoading: isContractLoading,
    refetch,
  } = useGetContractsQuery();

  useEffect(() => {
    refetch();
  }, []);

  const userType = Cookies.get("user_type");
  console.log(crops);

  const handleSignClick = (crop) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedCrop) {
      try {
        await updateContract({ id: selectedCrop.id, status: 1 }).unwrap();
        console.log(`Signed contract for: ${selectedCrop.name}`);
      } catch (error) {
        console.error("Error updating contract:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleReject = async () => {
    if (selectedCrop) {
      try {
        await updateContract({ id: selectedCrop.id, status: 2 }).unwrap();
        console.log(`Rejected contract for: ${selectedCrop.name}`);
      } catch (error) {
        console.error("Error updating contract:", error);
      }
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <p>Loading crops...</p>;
  }

  if (error) {
    return <p>Error loading crops: {error.message}</p>;
  }

  return (
    <div className="flex bg-gray-100">
      {userType === "merchant" ? <MerchantSidebar /> : <FarmerSidebar />}
      <div className="flex-grow bg-gray-50">
        <header className="bg-white shadow-md z-10 sticky top-0 w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-lg sm:text-3xl font-bold text-gray-800">
              {isLoadingData
                ? "Loading..."
                : isError
                ? "Error loading user data."
                : `Welcome, ${
                    userData.fname.charAt(0).toUpperCase() +
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

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Crops Bought</h2>
          <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200 border border-gray-300 shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Bag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Sold Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contract.crop_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contract.bag}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contract.sold_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {contract.status == 0 && (
                        <button
                          className="bg-[#4a7c59] text-white px-4 py-2 rounded hover:bg-[#3b634a] transition duration-300 ease-in-out"
                          onClick={() => handleSignClick(contract)}
                        >
                          Sign Contract
                        </button>
                      )}
                      {contract.status == 1 && (
                        <p className="bg-[#4a7c59] w-32 text-center text-white px-4 py-2 rounded-full transition duration-300 ease-in-out">
                          Signed
                        </p>
                      )}
                      {contract.status == 2 && (
                        <p className="bg-[#FF0000] w-32 text-center text-white px-4 py-2 rounded-full transition duration-300 ease-in-out">
                          Rejected
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ContractModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirm}
            onReject={handleReject}
          />
        </div>
      </div>
    </div>
  );
};

const ContractModal = ({ isOpen, onClose, onConfirm, onReject }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-[520px] pl-3 w-full">
        <iframe
          src="/Crop_Purchase_Contract.pdf"
          width={"500px"}
          height={"500px"}
          className="mb-5"
        ></iframe>
        <h2 className="text-xl font-semibold mb-4">
          Do you want to sign the contract?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onReject}
          >
            Reject
          </button>
          <button
            className="bg-[#4a7c59] text-white px-4 py-2 rounded hover:bg-[#3b634a]"
            onClick={onConfirm}
          >
            Sign
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoughtCrops;
