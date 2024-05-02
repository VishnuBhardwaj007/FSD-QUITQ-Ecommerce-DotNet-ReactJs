import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const UpdateSubCategory = ({ subCategoryId ,onSubmit}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subCategory,setSubCategory] = useState({})

  useEffect(() => {
  
    fetchSubCategory();
    fetchCategories();
  }, []);

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7036/api/subcategories/${subCategoryId}`
      );
      const subCategoryData = response.data;
      setSubCategory(subCategory)
      console.log("subcategory record",subCategoryData);
      form.setFieldsValue(subCategoryData);
    } catch (error) {
      console.error("Error fetching sub-category data:", error);
      message.error("Failed to fetch sub-category data");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:7036/api/categories");
      const categoryData = response.data;
      console.log(categoryData, "Categories");
      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `https://localhost:7036/api/subcategories/${subCategoryId}`,
        values,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }}
      );
      onSubmit("subcategory")
      console.log("Sub-category updated successfully:", response.data);
      message.success("Sub-category updated successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error updating sub-category:", error);
      message.error("Failed to update sub-category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Sub-Category</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={subCategory}
      >
        <Form.Item name="subCategoryName" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter sub-category name" />
        </Form.Item>
        
        <Form.Item name="categoryId" label="Category">
          <Select placeholder="Select category">
            {categories.map((category) => (
              <Option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateSubCategory;
