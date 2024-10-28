import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import {
  useGetUserDataQuery,
  useGetWalletBalanceQuery,
  useTopUpPaymentMutation,
  useSendOrderIdMutation,
  usePaymentHistoryQuery,
} from "../../features/apiSlice";
import MerchantSidebar from "../Sidebar/MerchantSidebar";
import FarmerSidebar from "../Sidebar/FarmerSidebar";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

const WalletComponent = () => {
  const {
    data: paymentHistoryData,
    isLoading: paymentHistoryLoading,
    isError: paymentHistoryError,
  } = usePaymentHistoryQuery();

  const navigate = useNavigate();
  const [topUpPayment] = useTopUpPaymentMutation();
  const [sendOrderId] = useSendOrderIdMutation();

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserDataQuery();

  const {
    data: walletData,
    isLoading: walletLoading,
    isError: walletError,
    refetch,
  } = useGetWalletBalanceQuery();

  const walletBalance = walletData ? Number(walletData) : 0;

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

  const onSubmit = async (data) => {
    const token = Cookies.get("token");
    try {
      const apiResponse = await topUpPayment(
        { amount: data.amount * 100 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).unwrap();

      if (apiResponse.order_id) {
        console.log("Order ID received:", apiResponse.order_id);

        const options = {
          key: "rzp_test_xQsftNSOJZ1Igi",
          order_id: apiResponse.order_id,
          handler: async function (response) {
            console.log("Payment successful", response);

            try {
              // Send the order ID to the backend after successful payment
              await sendOrderId(
                { order_id: apiResponse.order_id },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              ).unwrap();
              console.log("Order ID sent successfully");
              refetch();

              await refetch();
            } catch (sendError) {
              console.error("Error sending order ID:", sendError);
            }
          },
          prefill: {
            name: userData?.fname || "",
            email: userData?.email || "",
          },
          theme: {
            color: "#4a7c59",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.error("Error handling payment:", error);
      if (error.data) {
        console.error("Error data:", error.data);
      }
      if (error.status) {
        console.error("Error status:", error.status);
      }
    }
  };

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
          <div className="mb-6 flex justify-between items-center">
            <div className="bg-gradient-to-r from-[#4a7c59] to-green-800 text-white text-xl text-center px-10 py-4 rounded-lg shadow-lg">
              Wallet Balance:
              <br />
              <span className="font-bold text-2xl mt-2">
                ₹
                {walletLoading
                  ? "Loading..."
                  : walletError
                    ? "Error"
                    : walletBalance.toFixed(2)}
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

              <button
                type="submit"
                className="bg-[#4a7c59] transition ease-in-out duration-300 hover:bg-green-800 text-white px-6 py-2 rounded"
              >
                Recharge
              </button>
            </div>
          </form>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-left p-4">Order ID</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-left p-4">Payment Status</th>
                    <th className="text-left p-4">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistoryData?.map((transaction) => (
                    <tr
                      key={transaction.order_id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 text-gray-700">
                        {transaction.order_id}
                      </td>
                      <td className="p-4 text-gray-700">
                        ₹{transaction.amount}
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
                        {transaction.created_at}
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

// await sendOrderId({ order_id: response.order_id }).unwrap();
