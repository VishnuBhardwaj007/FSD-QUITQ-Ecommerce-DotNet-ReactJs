import { Space } from "antd";
import "./StoreApp.css";
import PageContent from "../Components/PageContent";
import SideMenu from "../Components/SideMenu";

function StoreApp() {
  return (
    
      
      <div className="app">

        <div className="main_room">
          <div className="room_left"><SideMenu></SideMenu></div>
          <div className="room_right"><PageContent></PageContent></div>
        </div>
        
        
      </div>
     
   
  );
}
export default StoreApp;