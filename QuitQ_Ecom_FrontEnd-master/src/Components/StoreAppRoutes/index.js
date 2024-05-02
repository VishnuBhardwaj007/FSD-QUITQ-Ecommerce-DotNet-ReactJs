import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext, UserProvider } from '../../User/UserContext';
import Customers from "../../pages/Customers/index";
import Dashboard from "../../pages/Dashbaord";
import Inventory from "../../pages/Inventory/index";
import Orders from "../../pages/Orders/index";
import { useContext, useEffect, useState } from "react";
import InventoryProductDetail from "../../pages/Inventory/InventoryProductDetail";

function StoreAppRoutes() {
  const [stores, setStores] = useState([]);
  //here get the all the stores regarding this user
  useEffect(() => {
    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // Perform async operation to fetch stores related to the userId
    const fetchStores = async () => {
      try {
        // Example API call to fetch stores
        const response = await fetch(`https://localhost:7036/api/stores/userstores/${userId}`,{headers: {
          'Authorization': `Bearer ${token}`
        }

        });
        const data = await response.json();
        // Update the stores state with the fetched data
        // console.log(data)
        // setStores(data);
        const storeIds = data.map(store => store.storeId);
        console.log(storeIds);
        // Update the stores state with the store IDs
        setStores(storeIds);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    // Call the fetchStores function when the component mounts
    if(userId>0 && token!=undefined){
      fetchStores();
    }
    
  }, []);


  return (
   
     
    <Routes>
      <Route path="/" element={<Dashboard stores={stores}/>}></Route>
      <Route path="inventory" element={<Inventory stores={stores}/>}></Route>
      {/* <Route path="inventory/product" element={<InventoryProductDetail/>}></Route> */}
      <Route path="orders" element={<Orders stores={stores}/>}></Route>
      <Route path="customers" element={<Customers />}></Route>
    </Routes>
    
  );

  
}
export default StoreAppRoutes;
