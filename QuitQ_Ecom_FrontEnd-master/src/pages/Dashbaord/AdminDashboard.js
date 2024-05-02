import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography, Button, Modal } from "antd";
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
import AddCategory from "../AddCategory";
import AddSubCategory from "../AddSub-Category";
import BrandForm from "../BrandForm";
import '../../Components/ProductDetail.css';
import { toast } from "react-toastify";
import UpdateCategory from "../UpdateCategory";
import UpdateSubCategory from "../UpdateSub-Category";
import UpdateBrand from "../UpdateBrand";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard(props) {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [showBrandForm, setBrandForm] = useState(false);


  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subCategories, setSubCategories] = useState([]);


  const [loading, setLoading] = useState(false);


  const [deleteCategoryModalVisible, setDeleteCategoryModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showUpdateCategory,setShowUpdateCategory] = useState(false)
  const [updatedCategory,setUpdatedCategory] = useState(false)


  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [showUpdateSubCategory,setShowSubUpdateCategory] = useState(false)
  const [updatedSubCategory,setUpdatedSubCategory] = useState(false)


  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showUpdateBrand,setShowBrand] = useState(false)
  const [updatedBrand,setUpdatedBrand] = useState(false)




  const [deleteBrandModalVisible, setDeleteBrandModalVisible] = useState(false);
  

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const response = await fetch('https://localhost:7036/api/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }

      setLoading(false);
    };

    const fetchSubcategories = async () => {
      setLoading(true);

      try {
        const response = await fetch('https://localhost:7036/api/subcategories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch subcategories');
        }

        const data = await response.json();
        setSubCategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }

      setLoading(false);
    };

    const fetchBrands = async () => {
      setLoading(true);

      try {
        const response = await fetch('https://localhost:7036/api/brands', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }

        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }

      setLoading(false);
    };

    fetchCategories();
    fetchBrands();
    fetchSubcategories();
  }, [updatedCategory,updatedSubCategory,refresh]);

  function handleCategoryRowClick(record){
    setShowUpdateCategory(true)
    setSelectedCategoryId(record.categoryId)
    

  }
  function handleSubCategoryRowClick(record){
    setShowSubUpdateCategory(true)
    setSelectedSubCategoryId(record.subCategoryId)
    

  }

  function handleBrandRowClick(record){
    setShowBrand(true)
    setSelectedBrandId(record.brandId)
    

  }
  function onSubmit(data){
    if(data=="category"){
      setUpdatedCategory(true);
    }
    else if(data=="subcategory"){
      setUpdatedSubCategory(true)
    }
    else if(data=="brands"){
      console.log("need to do");
    }
    else{
      setRefresh(refresh+1)
    }
  }

  function handleAddCategory() {
    setShowSubCategoryForm(false);
    setBrandForm(false);
    setShowCategoryForm(!showCategoryForm);
  }

  function handleAddSubCategory() {
    setBrandForm(false);
    setShowCategoryForm(false);
    setShowSubCategoryForm(!showSubCategoryForm);
  }

  function handleBrands() {
    setShowCategoryForm(false);
    setShowSubCategoryForm(false);
    setBrandForm(!showBrandForm);
  }

  function handleDeleteCategory(id) {
    setSelectedCategoryId(id);
    setDeleteCategoryModalVisible(true);
  }

  function handleDeleteSubCategory(id) {
    console.log(id);
  }

  function handleDeleteBrand(id) {
    console.log(id);
  }

  function showModal(record) {
    setSelectedCategoryId(record.categoryId);
    setDeleteCategoryModalVisible(true);
  }

  function handleDeleteCategoryConfirm() {
    // Perform delete category operation here
    console.log("Deleting category with ID:", selectedCategoryId);
  
    // Fetch call to delete the category
    const deleteCategory = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await fetch(`https://localhost:7036/api/categories/${selectedCategoryId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete category');
        }
        setRefresh(refresh+1)
        console.log('Category deleted successfully');
        // Optionally, you can update the categories state to reflect the change
        // For example, refetch categories from the server after deletion
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };
  
    deleteCategory();
  
    setDeleteCategoryModalVisible(false);
  }
  

  function handleDeleteCategoryCancel() {
    setDeleteCategoryModalVisible(false);
  }



  function handleDeleteBrand(id) {
    setSelectedBrandId(id);
    setDeleteBrandModalVisible(true);
  }


  function handleDeleteBrandConfirm() {
    // Perform delete brand operation here
    console.log("Deleting brand with ID:", selectedBrandId)
    const deleteBrand = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`https://localhost:7036/api/brands/${selectedBrandId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete brand');
        }
        setRefresh(refresh+1)
        console.log('Brand deleted successfully');
        toast.success("deleted successfully")
        // Optionally, you can update the brands state to reflect the change
        // For example, refetch brands from the server after deletion
      } catch (error) {
        console.error('Error deleting brand:', error);
      }
    };

    deleteBrand();

    setDeleteBrandModalVisible(false);
  }

  function handleDeleteBrandCancel() {
    setDeleteBrandModalVisible(false);
  }


  return (
    <div className="app" style={{display:"flex",justifyContent:"center"}}>
    <Space size={20} direction="vertical" className="cat">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={<ShoppingOutlined style={{ color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={"Add Category"}
          onClick={handleAddCategory}
        />
        <DashboardCard
          icon={<ShoppingOutlined style={{ color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={"Add Sub Category"}
          onClick={handleAddSubCategory}
        />
        <DashboardCard
          icon={<ShoppingOutlined style={{ color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={"Add Brands"}
          onClick={handleBrands}
        />
      </Space>
      <Space>
      {showCategoryForm ? <AddCategory onSubmit={onSubmit}/> : ""}
        {showSubCategoryForm ? <AddSubCategory onSubmit={onSubmit}/> : ""}
        {showBrandForm ? <BrandForm onSubmit={onSubmit}/> : ""}
      </Space>
      <Space direction="horizontal">
     
      <Space className="cat">
        <Table
          columns={[
            { title: "category-Id", dataIndex: "categoryId" },
            { title: "category Name", dataIndex: "categoryName" },
            {
              title: 'Delete',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <Button type="link" onClick={() => handleDeleteCategory(record.categoryId)}>
                    <DeleteOutlined />
                  </Button>
                </Space>
              ),
            },
          ]}
          loading={loading}
          dataSource={categories}
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({
            onClick: () => handleCategoryRowClick(record),
          })}
        ></Table>
         <Space>
     {showUpdateCategory?<UpdateCategory categoryId={selectedCategoryId} onSubmit={onSubmit}/>:""}
        {/* //here show update form */}
      </Space>
      </Space>
      </Space>
      
      <Space className="cat">
        <Table
          columns={[
            { title: "SubCategory-Id", dataIndex: "subCategoryId" },
            { title: "Subcategory Name", dataIndex: "subCategoryName" },
            
          ]}
          loading={loading}
          dataSource={subCategories}
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({
            onClick: () => handleSubCategoryRowClick(record),
          })}
        ></Table>
         <Space>
     {showUpdateSubCategory?<UpdateSubCategory subCategoryId={selectedSubCategoryId} onSubmit={onSubmit}/>:""}
        {/* //here show update form */}
      </Space>
      </Space>
      <Space className="cat">
        <Table
          columns={[
            { title: "Brand-Id", dataIndex: "brandId" },
            { title: "Brand Name", dataIndex: "brandName" },
            {
              title: 'Delete',
              key: 'action',
              render: (text, record) => (
                <Space size="middle">
                  <Button type="link" onClick={() => handleDeleteBrand(record.brandId)}>
                    <DeleteOutlined />
                  </Button>
                </Space>
              ),
            },
          ]}
          loading={loading}
          dataSource={brands}
          pagination={{ pageSize: 5 }}
          onRow={(record) => ({
            onClick: () => handleBrandRowClick(record),
          })}
        ></Table>
         <Space>
     {showUpdateBrand?<UpdateBrand brandId={selectedBrandId} onSubmit={onSubmit}/>:""}
        {/* //here show update form */}
      </Space>
      </Space>
      <Modal
        title="Confirm Deletion"
        visible={deleteCategoryModalVisible}
        onOk={handleDeleteCategoryConfirm}
        onCancel={handleDeleteCategoryCancel}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
      <Modal
      title="Confirm Deletion"
      visible={deleteBrandModalVisible}
      onOk={handleDeleteBrandConfirm}
      onCancel={handleDeleteBrandCancel}
    >
      <p>Are you sure you want to delete this brand?</p>
    </Modal>
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

export default AdminDashboard;
