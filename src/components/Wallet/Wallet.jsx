import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDataQuery } from "../../features/apiSlice";
import Sidebar from "../Sidebar/Sidebar";

const WalletComponent = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useGetUserDataQuery();
  const [amount, setAmount] = useState("");
  const [transactions] = useState([
    {
      id: "P112-109945",
      amount: 3000,
      date: "27-Sep-2024 10:20:09",
      gateway: "Easebuzz",
    },
    {
      id: "P112-109720",
      amount: 4000,
      date: "22-Sep-2024 16:44:03",
      gateway: "PhonePe",
    },
    {
      id: "P112109338",
      amount: 5000,
      date: "18-Sep-2024 13:43:18",
      gateway: "PhonePe",
    },
    {
      id: "P112109304",
      amount: 3300,
      date: "17-Sep-2024 17:26:16",
      gateway: "PhonePe",
    },
    {
      id: "P112108847",
      amount: 3500,
      date: "07-Sep-2024 11:01:18",
      gateway: "PhonePe",
    },
  ]);

  const walletBalance = 4150.75;

  const handleRecharge = () => {
    console.log(`Recharging with amount: ${amount}`);
    // Implement recharge functionality here
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <header className="bg-white flex justify-between items-center py-4 px-2">
          <div className="flex items-center mr-6">
            <h1 className="text-3xl ml-3 font-bold text-gray-800">
              {isLoading
                ? "Loading..."
                : isError
                ? "Error loading user data."
                : `${
                    userData.fname.charAt(0).toUpperCase() +
                    userData.fname.slice(1)
                  }'s Wallet`}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div
              onClick={() => navigate("/wallet")}
              className="flex gap-2 bg-[#4a7c59] transition ease-in-out duration-300 hover:bg-green-800 px-4 py-2 rounded-lg items-center"
            >
              <AccountBalanceWalletIcon style={{ color: "white" }} />
              <p className="text-white">Wallet</p>
            </div>
            <img
              src="https://via.placeholder.com/100x50"
              alt="profile"
              className="rounded-full h-12 w-12"
            />
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-grow bg-gray-100 p-6 overflow-auto">
          <div className="mb-6 flex justify-between items-center">
            <div className="bg-gradient-to-r from-[#4a7c59] to-green-800 text-white text-xl text-center px-10 py-4 rounded-lg shadow-lg">
              Wallet Balance:
              <br />
              <span className="font-bold text-2xl mt-2">
                ₹{walletBalance.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recharge Your Wallet</h2>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                className="border border-gray-300 px-4 py-2 rounded w-full focus:ring focus:ring-green-300"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={handleRecharge}
                className="bg-[#4a7c59] transition ease-in-out duration-300 hover:bg-green-800 text-white px-6 py-2 rounded"
              >
                Recharge
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-left p-4">Transaction ID</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Payment Date</th>
                    <th className="text-left p-4">Payment Gateway</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-100 transition"
                    >
                      <td className="p-4 text-gray-700">{transaction.id}</td>
                      <td className="p-4 text-gray-700">
                        ₹{transaction.amount}
                      </td>
                      <td className="p-4 text-gray-700">{transaction.date}</td>
                      <td className="p-4 text-gray-700">
                        {transaction.gateway}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;
