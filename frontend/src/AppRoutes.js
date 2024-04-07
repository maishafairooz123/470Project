import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import CartPage from './components/Pages/Cart/CartPage';
import Login from './components/Pages/Login/Login';
import RegisterPage from './components/Pages/Register/registerPage';
import AuthRoute from './components/Authroute/AuthRoute';
import Admin from './components/Pages/Admin/Admin';
import FoodAdmin from './components/Pages/FoodAdmin/FoodAdmin';
import OrdersAdmin from './components/Pages/OrdersAdmin/OrdersAdmin'
import CallsAdmin from './components/Pages/CallsAdmin/CallsAdmin'
import Edit from './components/Pages/Edit/Edit';
import CheckoutPage from './components/Pages/Checkout/CheckoutPage';
import OrderTrackPage from './components/Pages/OrderTrack/OrderTrackPage';
import OrderDetailsPage from './components/Pages/OrderDetails/OrderDetailsPage';
import ApproveOrderPage from './components/Pages/ApproveOrder/ApproveOrderPage';
import ServeItemPage from './components/Pages/ServeItem/ServeItemPage';
import PaymentPage from './components/Pages/Payment/PaymentPage';
import CallWaiterPage from './components/Pages/CallWaiter/CallWaiterPage';
import AnswerCallerPage from './components/Pages/AnswerCaller/AnswerCaller';
import Employee from './components/Pages/Employee/Employee';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path ="/" element={<Home />} />
        <Route path ="/search/:searchTerm" element={<Home />} />
        <Route path ="/cart" element={<AuthRoute><CartPage /></AuthRoute>} />
        <Route path ="/login" element={<Login />} />
        <Route path ="/register" element={<RegisterPage />} />
        <Route path ="/admin" element={<AuthRoute><Admin /></AuthRoute>} />
        <Route path ="/foodadmin" element={<AuthRoute><FoodAdmin /></AuthRoute>} />
        <Route path ="/employees" element={<AuthRoute><Employee /></AuthRoute>} />
        <Route path ="/ordersadmin" element={<AuthRoute><OrdersAdmin /></AuthRoute>} />
        <Route path ="/callsadmin" element={<AuthRoute><CallsAdmin /></AuthRoute>} />
        <Route path ="/foodadd" element={<AuthRoute><Edit /></AuthRoute>} />
        <Route path ="/foodadd/:foodId" element={<AuthRoute><Edit /></AuthRoute>} />
        <Route path = "/checkout" element = {<AuthRoute><CheckoutPage /></AuthRoute>} />
        <Route path = "/payment" element = {<AuthRoute><PaymentPage /></AuthRoute>} />
        <Route path = "/callwaiter" element = {<AuthRoute><CallWaiterPage /></AuthRoute>} />
        <Route path = "/answercaller" element = {<AuthRoute><AnswerCallerPage /></AuthRoute>} />
        <Route path = "/track" element = {<AuthRoute><OrderTrackPage /></AuthRoute>} />
        <Route path = "/details/:orderId" element = {<AuthRoute><OrderDetailsPage /></AuthRoute>} />
        <Route path = "/approveorder/:orderId" element = {<AuthRoute><ApproveOrderPage /></AuthRoute>} />
        <Route path = "/serve/:orderId/:itemFoodId" element = {<AuthRoute><ServeItemPage /></AuthRoute>} />
    </Routes>
  );
}
