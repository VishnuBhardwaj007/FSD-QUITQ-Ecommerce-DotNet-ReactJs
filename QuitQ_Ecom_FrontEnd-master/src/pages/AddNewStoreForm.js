import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './AddProductForm.css';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const AddNewStoreForm = (props) => {
  const [form] = Form.useForm();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sellerId, setSellerId] = useState(localStorage.getItem("userId"));
  const [fileList,setFileList] = useState([]);


  useEffect(() => {
    // Fetch all states
    fetch('https://localhost:7036/api/states')
      .then(response => response.json())
      .then(data => {
        setStates(data);
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch cities based on selectedState
    if (selectedState) {
      fetch(`https://localhost:7036/api/states/cities/${selectedState}`)
        .then(response => response.json())
        .then(data => {
          setCities(data);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [selectedState]);

  const handleStateChange = value => {
    setSelectedState(value);
    setSelectedCity('');
  };

  const handleCityChange = value => {
    setSelectedCity(value);
  };

  const onFinish = async values => {
    const formData = new FormData();
    // console.log(sellerId);
    // console.log(values.storeName);
    // console.log(values.storeFullAddress);
    // console.log(selectedCity);
    // console.log(values.description);
    // console.log(file);
    // console.log(values.contactNumber);
    formData.append('sellerId', sellerId);
    formData.append('storeName', values.storeName);
    formData.append('description', values.description);
    formData.append('storeImageFile', fileList[0]);
    formData.append('storeFullAddress', values.storeFullAddress);
    formData.append('cityId', selectedCity);
    formData.append('contactNumber', values.contactNumber);
    // console.log(formData);
    // return

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://localhost:7036/api/stores', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        message.success('Store added Successfully');
        form.resetFields();
        setSelectedState('');
        setSelectedCity('');
        props.onSubmit("refresh");
      } else {
        message.error('Failed to add store');
      }
    } catch (error) {
      console.error('Error occurred while adding store:', error.message);
      message.error('Error occurred while adding store');
    }
  };

  return (
    <div className='hold'>
      <Form
        form={form}
        name="addStoreForm"
        className="form-container"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="storeName"
          label="Store Name"
          rules={[{ required: true, message: 'Please input your store name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="storeImageFile"
          label="Store Image"
          valuePropName='fileList'
          getValueFromEvent={(event)=>{
            return event?.fileList;
          }}
          rules={[{ required: true, message: 'Please upload store image!' }]}
        >
          <Upload
            customRequest={(info)=>{
              setFileList([info.file])
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
            {/* {fileList[0].name} */}
          </Upload>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input store description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="contactNumber"
          label="Contact Number"
          rules={[{ required: true, message: 'Please input your contact number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="storeFullAddress"
          label="Store Address"
          rules={[{ required: true, message: 'Please input store address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="state"
          label="State"
          rules={[{ required: true, message: 'Please select state!' }]}
        >
          <Select onChange={handleStateChange}>
            {states.map(state => (
              <Option key={state.stateId} value={state.stateId}>{state.stateName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please select city!' }]}
        >
          <Select disabled={!selectedState} onChange={handleCityChange}>
            {cities.map(city => (
              <Option key={city.cityId} value={city.cityId}>{city.cityName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewStoreForm;
