import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import axios from "axios";

const UpdateBrand = ({ brandId, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState({});
  const [logoFileList, setLogoFileList] = useState([]);

  useEffect(() => {
    console.log("brandId",brandId);
    const fetchBrandDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://localhost:7036/api/brands/${brandId}`);
        setBrand(response.data);
      } catch (error) {
        console.log("error getting brand details");
      }
      setLoading(false);
    };
    fetchBrandDetails();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("brandId", brandId);
      formData.append("brandName", values.brandName);

      // Check if brandLogoImg array exists and is not empty before appending to formData
      if (values.brandLogoImg && values.brandLogoImg.length > 0) {
        formData.append("brandLogoImg", values.brandLogoImg[0]); // Assuming brandLogoImg is an array of uploaded files
      }

      const response = await axios.post(
        `https://localhost:7036/api/brands/${brandId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSubmit("brand");
      console.log("Brand updated successfully:", response.data);
      message.success("Brand updated successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error updating brand:", error);
      message.error("Failed to update brand");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // Restrict to only one file
    setLogoFileList(fileList);
  };

  return (
    <div>
      <h2>Update Brand</h2>
      <Form form={form} onFinish={handleSubmit} initialValues={brand}>
        <Form.Item name="brandName" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter brand name" />
        </Form.Item>

        <Form.Item label="Logo">
          <Upload
            accept="image/*"
            fileList={logoFileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Prevent default upload behavior
          >
            <Button>Upload Logo</Button>
          </Upload>
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

export default UpdateBrand;