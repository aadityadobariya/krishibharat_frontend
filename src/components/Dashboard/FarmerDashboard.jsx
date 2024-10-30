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
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useGetUserDataQuery } from "../../features/apiSlice.js";
import { useCropsCountQuery } from "../../features/apiSlice.js";
import FarmerSidebar from "../Sidebar/FarmerSidebar.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const FarmerDashboard = () => {
  const { data: userData, isLoading, isError } = useGetUserDataQuery();
  const {
    data: cropsCountData,
    isLoading: cropsCountLoading,
    isError: cropsCountError,
  } = useCropsCountQuery();
  const navigate = useNavigate();
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
        data: [50000, 20000, 80000, 81000, 56000, 55000, 40000],
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

  return (
    <div className="flex h-screen overflow-hidden">
      <FarmerSidebar />
      <div className="flex-1 flex flex-col">
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

        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                <h3 className="text-lg font-medium text-[#4a7c59]">
                  Sold Crops
                </h3>
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

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Most Sold Items</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <p className="flex-1">Wheat</p>
                <div className="w-full bg-gray-200 rounded-full h-3 ml-4">
                  <div
                    className="bg-[#4a7c59] h-3 rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
                <span className="ml-2 text-[#4a7c59]">70%</span>
              </div>
              <div className="flex items-center">
                <p className="flex-1">Corn</p>
                <div className="w-full bg-gray-200 rounded-full h-3 ml-4">
                  <div
                    className="bg-[#4a7c59] h-3 rounded-full"
                    style={{ width: "30%" }}
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

          <div>
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Bar data={data} options={options} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
