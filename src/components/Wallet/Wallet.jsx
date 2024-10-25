import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDataQuery } from "../../features/apiSlice";
import MerchantSidebar from "../Sidebar/MerchantSidebar";
import FarmerSidebar from "../Sidebar/FarmerSidebar";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

const WalletComponent = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading, isError } = useGetUserDataQuery();
  const [transactions, setTransactions] = useState([
    {
      id: "P112-109945",
      amount: 3000,
      date: "22/08/2024, 12:46:03 pm",
      gateway: "Razorpay",
    },
    {
      id: "P112-109720",
      amount: 4000,
      date: "22/08/2024, 12:44:03 pm",
      gateway: "Razorpay",
    },
  ]);

  const [walletBalance, setWalletBalance] = useState(4150);

  const rechargeSchema = z.object({
    amount: z
      .string()
      .refine((val) => !isNaN(val) && val.trim() !== "", {
        message: "Amount is required",
      })
      .transform((val) => parseFloat(val)) // Transform string to number
      .refine((val) => val > 0, {
        message: "Amount must be greater than 0",
      }),
    mobileNumber: z
      .string()
      .length(10, "Mobile number must be 10 digits")
      .regex(/^[0-9]+$/, "Mobile number must be numeric"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rechargeSchema),
  });

  const onSubmit = (data) => {
    const options = {
      key: "rzp_test_xQsftNSOJZ1Igi",
      amount: data.amount * 100,
      currency: "INR",
      name: userData?.name,
      description: "Recharge your wallet",
      handler: function (response) {
        console.log("Payment successful:", response);
        const newTransaction = {
          id: response.razorpay_payment_id,
          amount: data.amount,
          date: new Date().toLocaleString(),
          gateway: "Razorpay",
        };
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          newTransaction,
        ]);
        setWalletBalance((prevBalance) => prevBalance + data.amount);
        // Reset form values
        reset();
      },
      prefill: {
        name: userData?.fname || "",
        email: userData?.email || "",
        contact: data.mobileNumber,
      },
      theme: {
        color: "#4a7c59",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const userType = Cookies.get("user_type");

  return (
    <div className="flex h-screen overflow-auto">
      {userType === "merchant" ? <MerchantSidebar /> : <FarmerSidebar />}
      <div className="flex flex-col flex-grow">
        <header className="bg-white shadow-md z-10 sticky top-0 w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-lg sm:text-3xl font-bold text-gray-800">
              {isLoading
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-6 p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold mb-4">Recharge Your Wallet</h2>
            <div className="flex items-center space-x-4">
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    className={`border border-gray-300 px-4 py-2 rounded w-full focus:ring focus:ring-green-300 appearance-none ${errors.amount ? "border-red-500" : ""}`}
                    placeholder="Enter amount"
                    {...field}
                    style={{ MozAppearance: "textfield" }}
                  />
                )}
              />
              {errors.amount && (
                <p className="text-red-500">{errors.amount.message}</p>
              )}

              <Controller
                name="mobileNumber"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className={`border border-gray-300 px-4 py-2 rounded w-full focus:ring focus:ring-green-300 ${errors.mobileNumber ? "border-red-500" : ""}`}
                    placeholder="Enter mobile number"
                    {...field}
                  />
                )}
              />
              {errors.mobileNumber && (
                <p className="text-red-500">{errors.mobileNumber.message}</p>
              )}

              <button
                type="submit"
                className="bg-[#4a7c59] transition ease-in-out duration-300 hover:bg-green-800 text-white px-6 py-2 rounded"
              >
                Recharge
              </button>
            </div>
          </form>

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
                      className="border-t hover:bg-gray-50 transition"
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

// key: "rzp_test_xQsftNSOJZ1Igi",
