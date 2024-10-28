import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FarmerDashboard from "./FarmerDashboard";
import MerchantDashboard from "./MerchantDashboard";
import { setUserType } from "../../features/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.user_type);

  useEffect(() => {
    const storedUserType = Cookies.get("user_type");
    if (storedUserType) {
      dispatch(setUserType(storedUserType));
    }
  }, [dispatch]);

  if (userType === "farmer") {
    return <FarmerDashboard />;
  } else if (userType === "merchant") {
    return <MerchantDashboard />;
  } else {
    return <div>Please log in to access the dashboard.</div>;
  }
}

export default Dashboard;
