import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
  useFetchCropsQuery,
  useGetUserDataQuery,
  useCropsCountQuery,
} from "../../features/apiSlice.js";
import MerchantSidebar from "../Sidebar/MerchantSidebar.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ContractModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-[520px] pl-3 w-full">
        <iframe
          src="/document.pdf"
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
            onClick={onClose}
          >
            Cancel
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

const MerchantDashboard = () => {
  const {
    data: cropsCountData,
    isLoading: cropsCountLoading,
    isError: cropsCountError,
  } = useCropsCountQuery();
  const { data: userData, isLoadingData, isError } = useGetUserDataQuery();
  const navigate = useNavigate();
  const { data: crops = [], error, isLoading } = useFetchCropsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const handleSignClick = (crop) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(`Signed contract for: ${selectedCrop.name}`);
    setIsModalOpen(false);
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "#4a7c59",
        borderColor: "#4a7c59",
        borderWidth: 1,
        hoverBackgroundColor: "#3b634a",
        hoverBorderColor: "#3b634a",
        data: [65000, 59000, 80000, 81000, 56000, 55000, 40000],
      },
      {
        label: "Expenses",
        backgroundColor: "#2f4f4f",
        borderColor: "#2f4f4f",
        borderWidth: 1,
        hoverBackgroundColor: "#2c3e50",
        hoverBorderColor: "#2c3e50",
        data: [30000, 40000, 45000, 50000, 35000, 32000, 25000],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return <p>Loading crops...</p>;
  }

  return (
    <div className="flex h-screen">
      <MerchantSidebar />
      <div className="flex-1 bg-gray-100 overflow-auto">
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

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-[#4a7c59]">
                Total Crops
              </h3>
              <p className="text-2xl font-semibold">
                {cropsCountLoading
                  ? "Loading..."
                  : cropsCountError
                    ? "Error loading crops data."
                    : cropsCountData?.totalCrops || 0}
              </p>
            </div>
            <div className="bg-[#4a7c59] p-2 rounded-full text-white">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-[#4a7c59]">Sold Crops</h3>
              <p className="text-2xl font-semibold">
                {cropsCountLoading
                  ? "Loading..."
                  : cropsCountError
                    ? "Error loading crops data."
                    : cropsCountData?.soldCrops || 0}
              </p>
            </div>
            <div className="bg-[#4a7c59] p-2 rounded-full text-white">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>

        <div className="mb-6 p-6">
          <h2 className="text-2xl font-semibold mb-4">Most Sold Items</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <p className="flex-1">Wheat</p>
              <div className="w-full bg-gray-200 rounded-full h-3 ml-4">
                <div
                  className="bg-[#4a7c59] h-3 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <span className="ml-2 text-[#4a7c59]">70%</span>
            </div>
            <div className="flex items-center">
              <p className="flex-1">Corn</p>
              <div className="w-full bg-gray-200 rounded-full h-3 ml-4">
                <div
                  className="bg-[#4a7c59] h-3 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
              <span className="ml-2 text-[#4a7c59]">40%</span>
            </div>
            <div className="flex items-center">
              <p className="flex-1">Rice</p>
              <div className="w-full bg-gray-200 rounded-full h-3 ml-4">
                <div
                  className="bg-[#4a7c59] h-3 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <span className="ml-2 text-[#4a7c59]">75%</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Bar data={data} options={options} />
          </div>
        </div>

        <div className="mt-6 p-6">
          <h2 className="text-2xl font-semibold mb-4">Crops Available</h2>
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
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Sold Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {crops.slice(0, 5).map((crop) => (
                  <tr key={crop.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {crop.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {crop.bag}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {crop.qty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {crop.sold_price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="bg-[#4a7c59] text-white px-4 py-2 rounded hover:bg-[#3b634a] transition duration-300 ease-in-out"
                        onClick={() => handleSignClick(crop)}
                      >
                        Sign Contract
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => navigate("/bought-crops")}
            >
              Show More
            </button>
          </div>
        </div>

        <ContractModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
};

export default MerchantDashboard;
