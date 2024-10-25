import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Login/SignUp";
import RegistrationForm from "./components/Register/RegistrationForm";
import Wallet from "./components/Wallet/Wallet";
import BidComponent from "./components/BidComponent";
import BoughtCrops from "./components/BoughtCrops";
import CropManagement from "./components/CropManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/bids" element={<BidComponent />} />
        <Route path="/bought-crops" element={<BoughtCrops />} />
        <Route path="/crops-added" element={<CropManagement />} />
        <Route index path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
