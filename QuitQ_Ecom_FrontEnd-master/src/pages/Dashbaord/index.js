import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Card, Space, Statistic, Table, Typography } from "antd";
  import { useEffect, useState } from "react";
  import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
  import './AdminDashboard.css'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import Temp from "../../Components/Temp";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  function Dashboard(props) {
    const [orders, setOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);
    

    const loc = useParams();
    const storeIDVal = loc.storeId
  // console.log("loc",loc.storeId);
  var donot = false;
  props.stores.forEach(element => {
    if(element==storeIDVal){
      donot=true
      console.log("came here",donot);
    }
  });
  
  

 
    // In Dashboard component
useEffect(() => {
  if(donot==true){
  getOrders(storeIDVal)
  .then((res) => {
      if (Array.isArray(res)) { // Check if response is an array (assuming orders are returned as an array)
          const count = res.length;
          setOrders(count);
          let totalRevenue = 0;
          res.forEach((element) => {
              if (element.orderStatus === "delivered") {
                  totalRevenue += element.totalAmount;
              }
          });
          setRevenue(totalRevenue);
      } else {
          console.error('Unexpected response format:', res);
      }
  })
  .catch((error) => {
      console.error('Error fetching orders:', error);
  });
  getInventory(storeIDVal).then((res) => {
    const count = res.length
    setInventory(count);
  });
}
}, []);

// Similar error handling for other useEffect hooks in Dashboard component


  
    return (
      <div className="app">
         <div className="details">
         <div className="box">
      <Space  direction="vertical">
        {!donot?<h1 className="app">You cannot access this page</h1>:
      <>
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal"  className="cat">
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Orders"}
            value={orders}
          />
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
            title={"Inventory"}
            value={inventory}
          />
          
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
          />
          
        </Space>
        
        
        <DashboardChart storeIDVal={storeIDVal} />
          <RecentOrders storeIDVal={storeIDVal}/>
          
       
        </>}
       
      </Space>
      </div>
      </div>
      </div>
       
    );
  }
  
  function DashboardCard({ title, value, icon }) {
    return (
      <Card >
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }
  function RecentOrders(props) {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      
      setLoading(true);

      getOrders(props.storeIDVal).then((res) => {
        if (Array.isArray(res)) {
        //setDataSource(res.products.splice(0, 3));
        const filteredOrders = res.filter(order => order.orderStatus === 'pending');
        const sortedOrders = filteredOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      
      // Get the last 5 elements from the sorted array
      const recentOrders = sortedOrders.slice(0, 5);
        setDataSource(recentOrders);
        setLoading(false);
        }
        setLoading(false);
      });
    }, []);
  
    return (
      <>
        <Typography.Text>Recent Orders</Typography.Text>
        <Table style={{ width: "80%", height: "100%" }}
          columns={[
            {
              title: "Order-Id",
              dataIndex: "orderId",
            },
            {
              title: "Order-Date",
              dataIndex: "orderDate",
            },
            {
              title: "TotalAmount",
              dataIndex: "totalAmount",
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={false}
        ></Table>
      </>
    );
  }
  
  function DashboardChart(props) {
    const [reveneuData, setReveneuData] = useState({
      labels: [],
      datasets: [],
    });

    useEffect(() => {
      getOrders(props.storeIDVal).then((res) => {
        if (Array.isArray(res)) {
        const ordersByMonth = {};
        
        // Initialize counts for each month to 0
        for (let i = 0; i < 12; i++) {
          const date = new Date();
          date.setMonth(i);
          const month = date.toLocaleString('en-US', { month: 'long' });
          ordersByMonth[month] = 0;
        }
    
        // Count orders for each month
        res.forEach((order) => {
          const orderDate = new Date(order.orderDate);
          const month = orderDate.toLocaleString('en-US', { month: 'long' });
          ordersByMonth[month]++;
        });
    
        // Extract labels and data from ordersByMonth object
        const labels = Object.keys(ordersByMonth);
        const data = Object.values(ordersByMonth);
    
        // Set the revenue data
        const dataSource = {
          labels: labels,
          datasets: [
            {
              label: "Orders",
              data: data,
              backgroundColor: "rgba(255, 0, 0, 1)",
            },
          ],
        };
    
        setReveneuData(dataSource);}
        
      });
    }, []);
    
  
    
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Orders",
        },
      },
    };
  
    return (
      <Card >
        <Bar  style={{width:"100%", height:"100%"}}options={options} data={reveneuData} />
      </Card>
    );
  }
  export default Dashboard;