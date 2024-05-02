import { Avatar, Card, Rate, Space, Statistic, Table, Typography } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import { useLocation, useParams } from "react-router-dom";
import UserRegistrationForm from "../UserRegistraion";
import UpdateUser from "../UpdateUser";
import UserRegistrationByAdmin from "../UserRegistrationByAdmin";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [showUserRegistrationForm,setShowUserRegistrationForm] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [selectRow, setSelectedRow] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [selectedUser,setSelectedUser] = useState({})
  const [showUpdateForm,setShowUpdateForm] = useState(false)
  const [refresh,setRefresh] = useState(0)

  function onSubmit(data){
    if(data=="refresh"){
      setRefresh(refresh+1)
    }
  }

  

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      console.log(res);
      setDataSource(res);
      
      setLoading(false);
    });
  }, [createdUser,refresh]);


  function handleAddUser(){
    console.log("handleAddUSer");
    setShowUserRegistrationForm(true);
  }

  function handleUserCreated(userData) {
    setCreatedUser(userData);
    setShowUserRegistrationForm(false);
  }
  function handleRowClick(record){
    setDeleteAlert(false)
    console.log(record);
    setSelectedUser(record);
    setSelectedRow(true)
  }
  function handleUpdate() {
    console.log("user updated form show");
    setShowUpdateForm(true)
  }
  function handleDelete(userId) {
    const token = localStorage.getItem("token")
    fetch(`https://localhost:7036/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
        // Add any other headers if required, like authentication token
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("User deleted successfully");
        setCreatedUser({})
        setSelectedRow(false)
        // Handle success, e.g., update UI or show a success message
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // Handle error, e.g., show an error message to the user
      });
  }
  

  if(selectRow===true){
    var userType = "";
    var userStatus = ""
    var gender = ""
    if(selectedUser.userTypeId===1){
      userType="admin"
    }
    if(selectedUser.userTypeId===2){
      userType="user"
    }
    if(selectedUser.userTypeId===3){
      userType="seller"
    }
    if(selectedUser.genderId===1){
      gender="Male"
    }
    if(selectedUser.genderId===2){
      gender="Female"
    }
    if(selectedUser.genderId===3){
      gender="Other"
    }
    if(selectedUser.userStatusId===1){
      userStatus="Active"
    }
    if(selectedUser.userStatusId===2){
      userStatus="InActive"
    }
  }
 
  return (
    <div className="app">
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Space direction="horizontal">
          
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Add User"}
            onClick={handleAddUser}
            // value={inventory}
          />
          
          
        </Space>
        <div className="app">
      <Table
        loading={loading}
        columns={[
          {
            title: "username",
            dataIndex: "username",
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "LastName",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "contactNumber",
          },

        
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      ></Table>
      </div>
      <Space>
      {selectRow ?
        <div className="app">
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: "9px", padding: "14px" }}>
            <button style={{ backgroundColor: "red" }} onClick={() => setDeleteAlert(true)}>Delete</button>
            <button style={{ background: "orange" }} onClick={() => handleUpdate(selectedUser.userId)}>Update</button>

          </div>
          {deleteAlert ?
            <div style={{ display: "flex", flexDirection: "row-reverse", gap: "9px", padding: "14px", color: "red" }}>
              <button style={{ backgroundColor: "green" }} onClick={() => setDeleteAlert(false)}>No</button>
              <button style={{ backgroundColor: "red" }} onClick={() => handleDelete(selectedUser.userId)}>Yes</button>
              <div >Are You Sure You Want To delete this User?</div></div> : ""}
          <div className="details" key={selectedUser.userId}>
           

            <div className="box">
              <div className="row" style={{ flexDirection: "column", margin: 0, paddingBottom: 0 }}>
                <h2>User-Id : {selectedUser.userId}</h2>
                <h2>{selectedUser.username}</h2>


              </div>

              <p>FirstName : {selectedUser.firstName}</p>
              <p>LastName : {selectedUser.lastName}</p>
              <p>Email : {selectedUser.email}</p>
              <p>Contact Number : {selectedUser.contactNumber}</p>
              <p>Date Of Birth : {selectedUser.dob}</p>
              
              <p>Gender : {gender}</p>
              <p>Status : {userStatus}</p>
              <p>UserRole : {userType}</p>
              


              
              


            </div>
            <div className="box">
            {showUpdateForm?<UpdateUser userId = {selectedUser.userId} onSubmit={onSubmit}/>:""}
            </div>

          </div>
          

        </div> : ""}
      </Space>
      {/* <Space> */}
            {/* <div className="box"> */}
            {showUserRegistrationForm?<UserRegistrationByAdmin onUserCreated={handleUserCreated} onSubmit={onSubmit}/>:""}
            {/* </div> */}
      
      {/* </Space> */}
    </Space>
    </div>
  );
}


function DashboardCard({ title, value, icon, onClick }) {
  return (
    <Card onClick={onClick}>
      <Space direction="horizontal">
        {icon}
        {title}
      </Space>
    </Card>
  );
}
export default Customers;