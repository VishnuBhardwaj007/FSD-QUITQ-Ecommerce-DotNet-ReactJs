import React from "react";
import { Form, Input, Button, Select, message, Row, Col } from "antd";
import axios from "axios";
import "./UserRegistration.css";
import { Link } from 'react-router-dom';

const { Option } = Select;

const UserRegistrationForm = (props) => {
  const [form] = Form.useForm();

  // Custom password validation function
  const validatePassword = (_, value) => {
    const pattern =  /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // Password must contain at least 8 characters, including one letter and one number
    if (!value || pattern.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      "Password must be at least 8 characters long and contain at least one letter and one number"
    );
  };

  // Custom validation for confirming password
  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue("password");
    if (!value || password === value) {
      return Promise.resolve();
    }
    return Promise.reject("The two passwords do not match");
  };

  const handleSubmit = async (formData) => {
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    formData.userStatusId = 1;

    // Check if passwords match
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    // Check if username or email already exists
    try {
      const response = await axios.get("https://localhost:7036/api/users");
      const users = response.data;

      // Check if username or email already exists in the database
      const existingUser = users.find(
        (user) =>
          user.username === formData.username || user.email === formData.email
      );

      if (existingUser) {
        message.error("Username or email already exists");
        return;
      }
      console.log(formData);

      // If username and email are unique, proceed with registration
      const registerResponse = await axios.post(
        "https://localhost:7036/register",
        formData
      );

      console.log(registerResponse.data);
      
      message.success("User registered successfully");
      // Handle success, e.g., show a success message or redirect the user
    } catch (error) {
      console.error("Error:", error);
      //message.error("Failed to register user");
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="app" >
      
    <div className="user-registration-form">
      <h2>User Registration</h2>
      <Form form={form} onFinish={handleSubmit} >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input placeholder="Username" autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input type="email" placeholder="Email" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="genderId"
              rules={[
                { required: true, message: "Please select your gender!" },
              ]}
            >
              <Select placeholder="Select Gender">
                <Option value={1}>Male</Option>
                <Option value={2}>Female</Option>
                <Option value={3}>Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              rules={[
                { required: true, message: "Please enter your first name!" },
              ]}
            >
              <Input placeholder="First Name" autoComplete="off" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              rules={[
                { required: true, message: "Please enter your last name!" },
              ]}
            >
              <Input placeholder="Last Name" autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Please select your date of birth!",
                },
              ]}
            >
              <Input
                type="date"
                placeholder="Date of Birth"
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="contactNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your contact number!",
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit contact number!",
                },
              ]}
            >
              <Input placeholder="Contact Number" autoComplete="off" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { validator: validatePassword },
              ]}
            >
              <Input.Password
                placeholder="Password"
                autoComplete="new-password"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {/* <Col span={12}>
            <Form.Item
              name="userStatusId"
              rules={[
                { required: true, message: "Please select your status!" },
              ]}
            >
              <Select placeholder="Select Status" defaultValue={1}>
                <Option value={1} >Active</Option>
                <Option value={2}>-</Option>
              </Select>
            </Form.Item>
          </Col> */}
          <Col span={12}>
            <Form.Item
              name="userTypeId"
              rules={[{ required: true, message: "Please select your Type!" }]}
            >
              <Select placeholder="Seller?User">
                <Option value={2}>User</Option>
                <Option value={3}>Become A Seller</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className="lined">
        <div className="login_form_items">Already a User?</div>
        <button
          className="login_form_items login_button"
          onClick={props.toggle}
        >
          <Link to="/login_register" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default UserRegistrationForm;