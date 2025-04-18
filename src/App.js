// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import ContactForm from './ContactForm';
import Gallery from './Gallery';
import Payment from './Payment';
import OrderForm from './OrderForm';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminOrders from './AdminOrders';
import ViewProducts from './ViewProducts';
import EditProduct from './EditProduct';
import AdminUpload from './AdminUpload'; // create this component
import Footer from './Footer';

function App() {
    const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");

    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<ContactForm />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/order" element={<OrderForm />} />
                    <Route path="/customers/order/:productId" element={<OrderForm />} />
                    <Route path="/payment/:orderId" element={<Payment />} />
                    
                    {/* Pass setAdminToken to AdminLogin */}
                    <Route path="/admin_login" element={<AdminLogin setAdminToken={setAdminToken} />} />

                    {/* Protect this route using adminToken */}
                    <Route path="/admin/orders" element={adminToken ? <AdminOrders /> : <Navigate to="/" />} />
                    <Route path="/admin/upload" element={localStorage.getItem("adminToken") ? <AdminUpload /> : <Navigate to="/" />} />
                    <Route path="/admin/products" element={<ViewProducts />} />
                    <Route path="/edit-product/:productId" element={<EditProduct />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>    
            </div>
            <Footer />
        </Router>
    );
}

export default App;
