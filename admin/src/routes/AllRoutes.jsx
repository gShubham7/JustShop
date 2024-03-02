import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import ViewOrder from "../pages/ViewOrder";
import Customers from "../pages/Customers";
import CategoryList from "../pages/CategoryList";
import AddCategory from "../pages/AddCategory";
import BrandList from "../pages/BrandList";
import AddBrand from "../pages/AddBrand";
import ProductList from "../pages/ProductList";
import AddProduct from "../pages/AddProduct";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order/:id" element={<ViewOrder />} />
        <Route path="customers" element={<Customers />} />
        <Route path="list-category" element={<CategoryList />} />
        <Route path="category" element={<AddCategory />} />
        <Route path="category/:id" element={<AddCategory />} />
        <Route path="list-brand" element={<BrandList />} />
        <Route path="brand" element={<AddBrand />} />
        <Route path="brand/:id" element={<AddBrand />} />
        <Route path="list-product" element={<ProductList />} />
        <Route path="product" element={<AddProduct />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
