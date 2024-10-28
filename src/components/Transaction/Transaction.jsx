import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import {
  useGetUserDataQuery,
  useTransactionHistoryQuery,
} from "../../features/apiSlice";
import MerchantSidebar from "../Sidebar/MerchantSidebar";
import FarmerSidebar from "../Sidebar/FarmerSidebar";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

const Transaction = () => {
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserDataQuery();

  const {
    data: paymentHistoryData,
    isLoading: paymentHistoryLoading,
    isError: paymentHistoryError,
  } = useTransactionHistoryQuery();

  const rechargeSchema = z.object({
    amount: z
      .string()
      .refine((val) => !isNaN(val) && val.trim() !== "", {
        message: "Amount is required",
      })
      .transform((val) => parseFloat(val))
      .refine((val) => val > 0, { message: "Amount must be greater than 0" }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rechargeSchema),
  });

  const userType = Cookies.get("user_type");

  return (
    <div className="flex h-screen overflow-auto">
      {userType === "merchant" ? <MerchantSidebar /> : <FarmerSidebar />}
      <div className="flex flex-col flex-grow">
        <header className="bg-white shadow-md z-10 sticky top-0 w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-lg sm:text-3xl font-bold text-gray-800">
              {userLoading
                ? "Loading..."
                : userError
                  ? "Error loading user data."
                  : `Welcome, ${userData.fname.charAt(0).toUpperCase() + userData.fname.slice(1)}`}
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

        <div className="flex-grow bg-gray-100 p-6 overflow-auto">
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-left p-4">Opening Amount</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Closing</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Gateway</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistoryData?.map((transaction) => (
                    <tr
                      key={transaction.opening}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 text-gray-700">
                        {transaction.opening}
                      </td>
                      <td className="p-4 text-gray-700">
                        ₹{transaction.amount}
                      </td>
                      <td className="p-4 text-gray-700">
                        ₹{transaction.closing}
                      </td>
                      <td className="p-4 text-gray-700">
                        {transaction.status === "success" ? (
                          <span className="text-white p-2 rounded-full bg-green-600">
                            Success
                          </span>
                        ) : transaction.status === "failed" ? (
                          <span className="text-white p-2 rounded-full bg-red-600">
                            Failed
                          </span>
                        ) : (
                          <span className="text-white p-2 rounded-full bg-gray-400">
                            Pending
                          </span>
                        )}
                      </td>
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

export default Transaction;
