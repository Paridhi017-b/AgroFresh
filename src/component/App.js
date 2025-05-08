import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;