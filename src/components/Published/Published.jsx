import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate } from "react-router-dom";
import {
  usePublishedCropsQuery,
  useGetUserDataQuery,
} from "../../features/apiSlice";
import MerchantSidebar from "../Sidebar/MerchantSidebar";
import FarmerSidebar from "../Sidebar/FarmerSidebar";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

const Published = () => {
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserDataQuery();

  const { data: publishedCropsData } = usePublishedCropsQuery();

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
            <h2 className="text-2xl font-semibold mb-2">Published Crops</h2>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
              <table className="min-w-full table-auto divide-y divide-gray-200 border border-gray-300 shadow-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Crop Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                      Bag
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                      Base Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                      Trigger Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {publishedCropsData?.map((publishedCropsData) => (
                    <tr
                      key={publishedCropsData.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {publishedCropsData.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {publishedCropsData.bag}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {publishedCropsData.qty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {publishedCropsData.base_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {publishedCropsData.trigger_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {new Date(
                          publishedCropsData.created_at,
                        ).toLocaleString()}
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

export default Published;
