import { Space } from "antd";
import "./StoreApp.css";
import PageContent from "../Components/PageContent";
import SideMenu from "../Components/SideMenu";
import AdminSideMenu from "../Components/SideMenu/AdminSideMenu";
import AdminPageContent from "../Components/PageContent/AdminPageContent";

function AdminApp(props) {
  
    return (
      props.userloggedin ? (
        <div className="app">
          <div className="app">
            <AdminSideMenu></AdminSideMenu>
            <AdminPageContent></AdminPageContent>
          </div>
        </div>
      ) : (
        <div className="app">
      <div className="details" style={{justifyContent:"center"}}>

          <div className="big-img">
              <img src='/Images/LoginRequiredLogo.webp' alt="" />
              <h1>Login To Access This Page</h1>
              
          </div>
          </div>
</div>
      )
    );
    
  
}
export default AdminApp;