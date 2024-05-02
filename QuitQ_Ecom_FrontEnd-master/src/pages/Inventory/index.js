import { Avatar, Card, Rate, Space, Table, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { getInventory } from "../../API";
import { useNavigate, useParams } from "react-router-dom";
import "../../Components/ProductDetail.css"
import { toBeChecked } from "@testing-library/jest-dom/matchers";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import UpdateProduct from "../../pages/UpdateProduct";
import Temp from "../../Components/Temp";
import AddProductForm from "../../pages/AddProductForm"
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AddNewStoreForm from "../AddNewStoreForm";

function Inventory(props) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false)
  const [dataSource, setDataSource] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectRow, setSelectedRow] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [updateDisplay, setUpdateDisplay] = useState(false);
  const [refresh, setRefresh] = useState(0)


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
  const [product, setProduct] = useState({
    brandId: 0,
    categoryId: 0,
    images: [],
    price: 0,
    productDetails: [],
    productId: 0,
    productImage: '',
    productImageFile: null,
    productName: '',
    productStatusId: 0,
    quantity: 0,
    sellerName: '',
    storeId: 0,
    subCategoryId: 0,
    BrandName: "",
    CategoryName: "",
    SubCategoryName: "",
    StoreName: ""
  });
  const [imagesProcessedArray, setImagesProcessedArray] = useState([]);
  const navigate = useNavigate();
  const loc = useParams();
  const storeIDVal = loc.storeId
  const myRef = useRef();


  function handleAddNewProduct() {
    console.log("came here in add product");
    setShowForm(!showForm)
  }
  var donot = false;
  props.stores.forEach(element => {
    if (element == storeIDVal) {
      donot = true
      console.log("came here", donot);
    }
  });
  useEffect(() => {
    setLoading(true);


    if (donot == true) {
      getInventory(storeIDVal)
        .then((res) => {
          // Log the JSON response
          setDataSource(res); // Assuming `res` has a `products` property
          setLoading(false); // Update loading state
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
          setLoading(false); // Update loading state in case of error
        });
    }
    setLoading(false);
  }, [refresh]);
  function onSubmit(data) {
    if (data == "refresh") {
      setRefresh(refresh + 1)
      donot = true
    }
  }

  const handleTab = (index) => {
    setSelectedIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };




  const handleRowClick = (record) => {
    setDeleteAlert(false)
    if (record === product) {
      return
    }

    const mainImageFilename = record.productImage ? `/Images/${record.productImage.split('\\').pop()}` : '';

    if (record.images && Array.isArray(record.images)) {


      const tempImagesProcessedArray = record.images.map(image => `/Images/${image.storedImage.split('\\').pop()}`);

      if (mainImageFilename) {
        tempImagesProcessedArray.unshift(mainImageFilename);
      }
      setImagesProcessedArray(tempImagesProcessedArray);

    }
    setProduct(record)




    setSelectedRow(true)
  };

  function handleDelete(productId) {
    console.log(productId);
    //call the fetch call here
    const token = localStorage.getItem("token")

    fetch(`https://localhost:7036/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        // Add any additional headers if needed, such as authorization token
      },
      // Optionally, include a request body if necessary
      // body: JSON.stringify({}),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle successful deletion
        setProduct({
          brandId: 0,
          categoryId: 0,
          images: [],
          price: 0,
          productDetails: [],
          productId: 0,
          productImage: '',
          productImageFile: null,
          productName: '',
          productStatusId: 0,
          quantity: 0,
          sellerName: '',
          storeId: 0,
          subCategoryId: 0,
          BrandName: "",
          CategoryName: "",
          SubCategoryName: "",
          StoreName: ""
        })
        setSelectedRow(false)
        getInventory(storeIDVal)
          .then((res) => {
            // Log the JSON response
            setDataSource(res); // Assuming `res` has a `products` property
            setLoading(false); // Update loading state
          })
          .catch((error) => {
            // Handle any errors
            console.error('Error:', error);
            setLoading(false); // Update loading state in case of error
          });
        // notify
        toast.success('Product Deleted Successfully!', {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });

        // Optionally, you can perform additional actions here, such as updating UI
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting item:', error);
        // Optionally, you can notify the user about the error
      });
  }

  function handleUpdate() {
    setUpdateDisplay(true);
  }

  return (

    <Space size={20} direction="vertical">
      {!donot ? (<div className="app">
      <div className="details" style={{justifyContent:"center"}}>

          <div className="big-img">
              <img src='/Images/access_denied.png
              ' alt="" />
              
          </div>
          </div>
</div>) :
        <>
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
                title={"Add New Product"}
                onClick={handleAddNewProduct}

              // value={inventory}
              />


            </div>
          </div>
          <div className="box">
            <Table
              loading={loading}
              columns={[
                {
                  title: "Thumbnail",
                  dataIndex: "productImage",
                  render: (productImage) => {
                    const mainImageFilename = productImage ? `/Images/${productImage.split('\\').pop()}` : '';

                    return <Avatar src={mainImageFilename} />;
                  },
                },
                {
                  title: "Title",
                  dataIndex: "productName",
                },
                {
                  title: "Price",
                  dataIndex: "price",
                  render: (value) => <span>${value}</span>,
                },

                {
                  title: "Stock",
                  dataIndex: "quantity",
                },

                {
                  title: "Brand",
                  dataIndex: "brandName",
                },
                {
                  title: "Category",
                  dataIndex: "categoryName",
                },
                {
                  title: "Sub-Category",
                  dataIndex: "subCategoryName",
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
          </div></>}
      {selectRow ?
        <div className="app">
          <div style={{ display: "flex", flexDirection: "row-reverse", gap: "9px", padding: "14px" }}>
            <button style={{ backgroundColor: "red" }} onClick={() => setDeleteAlert(true)}>Delete</button>
            <button style={{ background: "orange" }} onClick={() => handleUpdate(product.productId)}>Update</button>

          </div>
          {deleteAlert ?
            <div style={{ display: "flex", flexDirection: "row-reverse", gap: "9px", padding: "14px", color: "red" }}>
              <button style={{ backgroundColor: "green" }} onClick={() => setDeleteAlert(false)}>No</button>
              <button style={{ backgroundColor: "red" }} onClick={() => handleDelete(product.productId)}>Yes</button>
              <div >Are You Sure You Want To delete this Product?</div></div> : ""}
          <div className="details" key={product.productId}>
            <div className="big-img">
              <img src={imagesProcessedArray[selectedIndex]} alt={product.images[selectedIndex]} />

            </div>

            <div className="box">
              <div className="row" style={{ flexDirection: "column", margin: 0, paddingBottom: 0 }}>
                <h2>{product.productName}</h2>


              </div>

              <p>{product.content}</p>

              <div className="thumb" ref={myRef}>
                {imagesProcessedArray.map((img, index) => (
                  <img src={img} alt="" key={index} onClick={() => handleTab(index)} />
                ))}
              </div>
              <h1>${product.price}</h1>


            </div>

          </div>
          <div className="box">
            <div className="row">
              <h2>Product Details</h2>

            </div>
            <p></p>
            <p style={{ lineHeight: "12px" }}> <strong>Category</strong>:{product.categoryName}</p>
            <p style={{ lineHeight: "12px" }}> <strong>SubCategory</strong>:{product.subCategoryName}</p>
            <p style={{ lineHeight: "12px" }}> <strong>Brand</strong>:{product.brandName}</p>




            {product.productDetails.map((vallue, index) => (
              <div >

                <p key={index} style={{ lineHeight: "12px" }}> <strong>{vallue.attribute}</strong>:{`${vallue.value}`}</p>


              </div>

            ))}



          </div>
          {updateDisplay ? <UpdateProduct productId={product.productId} storeIDVal={storeIDVal} onSubmit={onSubmit} /> : ""}
        </div> : ""}
      {showForm ? <AddProductForm storeId={storeIDVal} onSubmit={onSubmit} /> : ""}
      <ToastContainer />
    </Space>
  );
}
export default Inventory;