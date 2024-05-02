import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory, getOrders } from "../../API";
import { useParams } from "react-router-dom";
import Temp from "../../Components/Temp";
import OrderItem from "./OrderItem";

function Orders(props) {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectRow, setSelectedRow] = useState(false);
  const [rec,setRec] = useState({})
  const [imgs, setImgs] = useState({})
 
  const loc = useParams();
    const storeIDVal = loc.storeId

    

  useEffect(() => {
    setLoading(true);
    getOrders(storeIDVal)
    .then((res) => {
        console.log(res); // Log the JSON response
        setDataSource(res); // Assuming `res` has a `products` property
        console.log(dataSource);
        setLoading(false); // Update loading state
    })
    .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        setLoading(false); // Update loading state in case of error
    });
  }, []);

  
  function handleRowClick(record){
    setSelectedRow(true)
    console.log(record);
    setRec(record)
    let imagesByOrderId = {}; // Object to store images by order ID
        console.log(rec);
        let orderId = record.orderId;
        console.log(orderId);
       
           
            imagesByOrderId[orderId] = []; // Initialize an empty array for each order ID

            record.orderItemListDTOs.forEach(item => {
                // Assuming 'productImage' is the property containing the image URL
                if (item.product.productImage !== null) {
                    let img = item.product.productImage.split('\\').pop();
                    imagesByOrderId[orderId].push(img); // Push image to the array associated with the order ID
                }
            });
       console.log(imagesByOrderId)
        setImgs(imagesByOrderId)
    

  }


  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Order-Id",
            dataIndex: "orderId",
          },
          {
            title: "Order Date",
            dataIndex: "orderDate",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Total",
            dataIndex: "totalAmount",
          },
          {
            title: "Shipping Address",
            dataIndex: "shippingAddress",
          },
          {
            title: "Order-Status",
            dataIndex: "orderStatus",
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
      {selectRow?<div className="app">
            <h1>Order Items</h1>

            <div className="details" >

                <div className="row" style={{ flexDirection: "column", margin: 0, paddingBottom: 0, margin: "20px" }}>
                    {/* <h2>{product.productName}</h2> */}

                    
                        <div key={rec.orderId} style={{ border: "2px solid black", marginBottom: "3px", padding: "20px" }}>
                            <h2>Order ID: {rec.orderId}</h2>

                            <p>Total Amount: ${rec.totalAmount}</p>
                            <p>Order Status: {rec.orderStatus}</p>
                            <h3>Order Items:</h3>
                            <ul>
                                {rec.orderItemListDTOs.map((orderItem, index) => (
                                    <li key={index}>
                                        <p>Product Name: {orderItem.product.productName}</p>
                                        <p>Quantity Ordered: {orderItem.quantity}</p>
                                    </li>
                                ))}
                            </ul>
                            <p>Shipping Address: {rec.shippingAddress}</p>
                            {imgs[rec.orderId].length > 0 ?
                                <div className="thumb" >

                                    {imgs[rec.orderId].map((img, index) => (

                                        <img src={`/Images/${img}`} alt={img} key={index} />
                                    ))}   </div> : <h6>No Images To display</h6>}

                        </div>
                    
                </div>
            </div>
        </div>:""}
    </Space>
  );
}
export default Orders;