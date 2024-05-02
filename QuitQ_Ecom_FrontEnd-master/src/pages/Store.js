import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {

  ShoppingOutlined,

} from "@ant-design/icons";
import { Card, Space } from 'antd';
import AddNewStoreForm from './AddNewStoreForm';
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
function StoreCard(store) {
  const navigate = useNavigate();
  const filename = store.storeLogo.split('\\').pop();
  function handleStore(storeId) {
    navigate(`/stores/${storeId}`);
  }

  return (

    <div className="product-card" onClick={() => handleStore(store.storeId)}>
      <img src={`Images/${filename}`} alt={store.storeName} className="product-image" />
      <div style={{ display: "flex", lineHeight: "0px", justifyContent: "" }}>


        <h3 className="product-name">{store.storeName}</h3>






      </div>
      <p>{store.description}</p>







    </div>
  );
}

const Store = (props) => {
  const [stores, setStores] = useState([]);
  const [showForm,setShowForm] = useState(false)
  const [refresh,setRefresh] = useState(0)
  //here get the all the stores regarding this user
  function handleAddNewStore() {
    console.log("clicked on Add New Store");
    setShowForm(!showForm)
  }
  function onSubmit(data){
    if(data=="refresh"){
      setRefresh(refresh+1)
    }
  }
  useEffect(() => {
    // Retrieve userId from localStorage
    // const userId = props.userData.userId
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem('token');

    // Perform async operation to fetch stores related to the userId
    const fetchStores = async () => {
      try {
        // Example API call to fetch stores
        const response = await fetch(`https://localhost:7036/api/stores/userstores/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }

        });
        const data = await response.json();
       
        // Update the stores state with the fetched data
        // console.log(data)
        if(data.status!=404){
          setStores(data);
          console.log("came here and set the data");
        console.log(data.status);
        }
        else if(data.status==404){
          setStores([])
          console.log("came here");
        }
        

      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    // Call the fetchStores function when the component mounts
    if (userId > 0 && token != undefined) {
      fetchStores();
    }

  }, [refresh]);




  return (
    props.userloggedin ? (
      <div className='app'>
        <div className="details" >

          <div className="big-img">
            <DashboardCard
              icon={
                <ShoppingOutlined
                  style={{
                    color: "blue",
                    backgroundColor: "rgba(0,0,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
              title={"Add New Store"}
              onClick={handleAddNewStore}

            // value={inventory}
            />
            {showForm?<AddNewStoreForm onSubmit={onSubmit}/>:""}
          
          </div>
        </div>
        <h1>Your Stores</h1>
        <section className="product-grid">
          {stores.length != 0 ?

            stores.map((store) => (

              <StoreCard key={store.storeId} {...store} />
            )) : <div className="app">

            </div>}
        </section>
      </div>
    ) : (
      <div className="app">
        <div className="details" style={{ justifyContent: "center" }}>

          <div className="big-img">
            <img src='/Images/LoginRequiredLogo.webp' alt="" />
            <h1>Login To Access This Page</h1>

          </div>
        </div>
      </div>
    )
  );
}

export default Store
