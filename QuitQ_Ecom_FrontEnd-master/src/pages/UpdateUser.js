import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import "./UpdateUser.css";

const UpdateUser = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [oldData, setoldData] = useState();
  const [updatingUserId,setUpdatingUserId] = useState()
  const [byAdmin,setByAdmin] = useState(false)

  // Custom password validation function
  const validatePassword = (_, value) => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // Password must contain at least 8 characters, including one letter and one number
    if (!value || pattern.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      "Password must be at least 8 characters long and contain at least one letter and one number"
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if(props?.userId){
      setByAdmin(true)
    }
    const userId = props?.userId||localStorage.getItem("userId");
    setUpdatingUserId(userId)

    
    try {
      const response = await axios.get(
        `https://localhost:7036/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData1 = response.data;
      setoldData(userData1);
      // Convert date format to "yyyy-MM-dd"
      userData1.dob = userData1.dob.split("T")[0];
      form.setFieldsValue(userData1);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data");
    }
  };
  console.log(oldData, "oldData");
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { confirmPassword, ...userData2 } = values;
      const { genderId, userTypeId, userStatusId } = oldData;
      console.log(userData2, "data");
      console.log(genderId, "gender");
      console.log(userData2, "data1");
      const token = localStorage.getItem("token");
      //const userId = localStorage.getItem("userId");
      const userId = updatingUserId;

      const response = await axios.put(
        `https://localhost:7036/api/users/${userId}`,
        {
          ...userData2,
          genderId,
          userStatusId,
          userTypeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(byAdmin){
        props?.onSubmit("refresh")
      }
      
      console.log("User updated successfully:", response.data);
      message.success("User updated successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-user-container">
      <h2>User Details</h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          username: "",
          email: "",
          firstName: "",
          lastName: "",
          dob: "",
          contactNumber: "",
        }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please enter your first name" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please enter your last name" }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="dob"
          rules={[
            { required: true, message: "Please enter your date of birth" },
          ]}
        >
          <Input type="date" placeholder="Date of Birth" />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="Contact Number" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
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

export default UpdateUser;