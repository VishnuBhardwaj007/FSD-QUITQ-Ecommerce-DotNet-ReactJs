import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate, useParams } from "react-router-dom";
  
  function SideMenu(props) {
    const { storeId } = useParams(); // Retrieve the storeId parameter from the URL
    const navigate = useNavigate();
   const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");

    

    

    
  
    // useEffect(() => {
    //   const pathName = location.pathname;
    //   setSelectedKeys(pathName);
    // }, [location.pathname]);
    
    //here write a useeffect, which will get all the stores of the linked to the user
    //if anyvalue not in this then display like , not found
  
    
    return (
      <div className="SideMenu">
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            //item.key
            //navigate(item.key);
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
         
          
          items={[
            {
              label: "Dashboard",
              icon: <AppstoreOutlined />,
              key: `/stores/${storeId}`,
            },
            {
              label: "Inventory",
              key: `/stores/${storeId}/inventory`,
              icon: <ShopOutlined />,
            },
            {
              label: "Orders",
              key: `/stores/${storeId}/orders`,
              icon: <ShoppingCartOutlined />,
            

            }
            // },
            // {
            //   label: "Customers",
            //   key: `/store/${storeId}/customers`,
            //   icon: <UserOutlined />,
            // },
          ]}
        ></Menu>
      </div>
    );
    
  }
  export default SideMenu;