import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext, UserProvider } from '../../User/UserContext';
import Customers from "../../pages/Customers/index";
import Dashboard from "../../pages/Dashbaord";
import Inventory from "../../pages/Inventory/index";
import Orders from "../../pages/Orders/index";
import { useContext, useEffect, useState } from "react";
import InventoryProductDetail from "../../pages/Inventory/InventoryProductDetail";
import AdminDashboard from "../../pages/Dashbaord/AdminDashboard";

function AdminAppRoutes() {

    

  return (
   
     
    <Routes>
      {/* <Route path="/" element={<Dashboard />}></Route> */}
      <Route path="/" element={<AdminDashboard />}></Route>
      {/* <Route path="inventory/product" element={<InventoryProductDetail/>}></Route> */}
      
      <Route path="users" element={<Customers />}></Route>
    </Routes>
    
  );
}
export default AdminAppRoutes;
