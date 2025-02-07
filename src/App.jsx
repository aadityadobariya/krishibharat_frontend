import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BidComponent from "./components/BidComponent";
import BoughtCrops from "./components/BoughtCrops";
import Contracts from "./components/Contracts/Contracts";
import CropManagement from "./components/CropManagement";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/Login/SignUp";
import Published from "./components/Published/Published";
import RegistrationForm from "./components/Register/RegistrationForm";
import Transaction from "./components/Transaction/Transaction";
import Wallet from "./components/Wallet/Wallet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/bids" element={<BidComponent />} />
        <Route path="/bought-crops" element={<BoughtCrops />} />
        <Route path="/crops-added" element={<CropManagement />} />
        <Route path="/published-crops" element={<Published />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route index path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
