import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddBrand from "../pages/AddBrand";
import AddCategory from "../pages/AddCategory";
import AddProduct from "../pages/AddProduct";
import BrandList from "../pages/BrandList";
import CategoryList from "../pages/CategoryList";
import Customers from "../pages/Customers";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import ProductList from "../pages/ProductList";
import ViewOrder from "../pages/ViewOrder";
import Layout from "../components/Layout";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<ViewOrder />} />
        <Route path="customers" element={<Customers />} />
        <Route path="category" element={<AddCategory />} />
        <Route path="category/:id" element={<AddCategory />} />
        <Route path="list-category" element={<CategoryList />} />
        <Route path="brand" element={<AddBrand />} />
        <Route path="brand/:id" element={<AddBrand />} />
        <Route path="list-brand" element={<BrandList />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="list-product" element={<ProductList />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
