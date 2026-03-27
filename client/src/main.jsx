import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Now from "./pages/Now";


import Services from "./pages/Services";
import Confirmation from "./pages/Confirmation";
import MyBookings from "./pages/MyBookings";

import CheckOut from "./pages/CheckOut";

import CheckoutSuccess from "./pages/CheckoutSuccess";




ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <Routes>

    {/* PUBLIC ROUTES */}
    <Route path="/" element={<Home />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/services" element={<Services />} />

 <Route path="/now" element={<Now />} />
    <Route path="/confirmation/:serviceId" element={<Confirmation />} />
    <Route path="/my-bookings" element={<MyBookings />} />
  
    <Route path="/checkout" element={<CheckOut />} />
   
<Route path="/checkout-success" element={<CheckoutSuccess />} />

    {/* OPTIONAL: Catch-all to redirect unknown routes */}
    <Route path="*" element={<Home />} />

  </Routes>
</BrowserRouter>

);
