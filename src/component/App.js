/*import logo from './logo.svg';
import './App.css';
import Home from './home';
import './home.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*<p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


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
import PremiumMembership from "./PremiumMembership"
import ContactUs from "./pages/ContactUs";
import OurCulture from './pages/AboutUs/OurCulture';
import Footer from "./Footer";
import OurTeam from "./pages/AboutUs/OurTeam";

import './App.css';
//import './Explore.css'
//import './home.css'
//import './product.css'
//import './SignUp.css'
import "./FarmerMarketPlace.css"
//import "./FarmerRegistration.css";
//import "./pages/Farmers"
import "./Navbar.css"
import "./FarmerAccountPage.css"
import "./PremiumMembership.css"
//import "./ContactUs.css"


function App() {
  const [currentFarmer, setCurrentFarmer] = useState('ramesh');
  
  const handleSwitchFarmer = (farmerId) => {
    setCurrentFarmer(farmerId);
  };

  return (
    <div className="page-wrapper"> {/* 👈 Wrapper to control layout */}
    <BrowserRouter>
      <Navbar />
    
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
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;