import { useState } from "react";
import React from "react";
import ReactDom from "react-dom"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import SignUp from "./Register/SignUp";
import SignIn from "./Register/SignIn";
import Explore from "./pages/Explore";
import FarmerMarketplace from "./FarmerMarketPlace";
import FarmerRegistration from "./Register/FarmerRegistration";
import Farmer from "./pages/Farmers";
import Navbar from "./Navbar";
import FarmerAccountPage from "./FarmerAccountPage";
import PremiumMembership from "./PremiumMembership";
import ContactUs from "./pages/ContactUs";
import OurCulture from './pages/AboutUs/OurCulture';
import Footer from "./Footer";
import OurTeam from "./pages/AboutUs/OurTeam";
import './App.css';
import AgriGenie from "./AgriGenie";
import Payment from "./payment/Payment";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailed from "./payment/PaymentFailed";
import ThankYou from "./payment/ThankYou";
import ForgotPassword from "./Register/ForgotPassword";
import ResetPassword from "./Register/ResetPassword";
import FarmerProductManagement from "./pages/FarmerProductManagement";
import FarmerLogin from "./Register/FarmerLogin";

function App() {
  const [currentFarmer, setCurrentFarmer] = useState('ramesh');
  
  const handleSwitchFarmer = (farmerId) => {
    setCurrentFarmer(farmerId);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Explore />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/farmer-marketplace" element={<FarmerMarketplace />} />
            <Route path="/farmer-registration" element={<FarmerRegistration />} />
            <Route path="/farmer-account" element={<FarmerAccountPage />} />
            <Route path="/premium" element={<PremiumMembership />} />
            <Route 
              path="/farmers" 
              element={
                <Farmer 
                  farmerId={currentFarmer} 
                  onSwitchFarmer={handleSwitchFarmer} 
                />
              } 
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/our-culture" element={<OurCulture />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/payment" element={<PaymentWrapper />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
<Route path="/farmer/products" element={<FarmerProductManagement />} />   
<Route path="/register-farmer" element={<FarmerRegistration />} />  
<Route path="/farmer-login" element={<FarmerLogin />} />




     </Routes>
        </main>
        <AgriGenie/>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// Wrapper component to access location state
function PaymentWrapper() {
  const location = useLocation();
  return <Payment 
    cartItems={location.state?.cartItems || []} 
    totalAmount={location.state?.totalAmount || 0} 
  />;
}

export default App;