import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FarmerDashboard from "./components/Dashboard/FarmerDashboard";
import MerchantDashboard from "./components/Dashboard/MerchantDashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Login/SignUp";
import RegistrationForm from "./components/Register/RegistrationForm";
import Wallet from "./components/Wallet/Wallet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route index path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
