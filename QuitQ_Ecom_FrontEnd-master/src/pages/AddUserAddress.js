// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AddUserAddress.css";

// const AddUserAddress = () => {
//   const [formData, setFormData] = useState({
//     userId: null,
//     doorNumber: "",
//     apartmentName: null,
//     landmark: null,
//     street: "",
//     cityId: null,
//     postalCode: "",
//     contactNumber: "",
//     statusId: null,
//   });
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     // Fetch states from the database
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get("https://localhost:7036/api/states");
//         console.log(response.data);
//         setStates(response.data);
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };

//     fetchStates();
//   }, []);

//   const handleChange = async (e) => {
//     const { name, value } = e.target;

//     if (name === "stateId") {
//       // Fetch cities related to the selected state
//       try {
//         const response = await axios.get(
//           `https://localhost:7036/api/states/cities/${value}`
//         );
//         setCities(response.data);
//       } catch (error) {
//         console.error("Error fetching cities:", error);
//       }
//     } else if (name === "cityId") {
//       // Set the selected city ID in the formData
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Send user address data to API
//       const token = localStorage.getItem('token');

//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       };
//       const response = await axios.post(
//         "https://localhost:7036/api/user-addresses",
//         formData,
//         { headers: headers }
//       );    
//       console.log(response.data);
//       // Handle success, e.g., show a success message or redirect the user
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error, e.g., show an error message to the user
//     }
//   };

//   return (
//     <div className="container-address">
//       <h2>Add New Address</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <input
//             type="text"
//             name="doorNumber"
//             placeholder="Door Number"
//             value={formData.doorNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             name="apartmentName"
//             placeholder="Apartment Name"
//             value={formData.apartmentName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             name="landmark"
//             placeholder="Landmark"
//             value={formData.landmark}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             name="street"
//             placeholder="Street"
//             value={formData.street}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
        
//         <label htmlFor="stateId">State</label> 
//            <select
//             name="stateId"
//             id = "stateId"
//             value={formData.stateId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select State</option>
//             {states.map((state) => (
//               <option key={state.stateId} value={state.stateId}>
//                 {state.stateName}
//               </option>
//             ))}
//           </select> 
//         </div>

//         <div className="form-group">
//         <label htmlFor="stateId">city</label> 
//           <select
//             name="cityId"
//             value={formData.cityId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select City</option>
//             {cities.map((city) => (
//               <option key={city.cityId} value={city.cityId}>
//                 {city.cityName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             name="postalCode"
//             placeholder="Postal Code"
//             value={formData.postalCode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="text"
//             name="contactNumber"
//             placeholder="Contact Number"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn-submit">
//           Add Address
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddUserAddress;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddUserAddress.css"
import { useNavigate } from "react-router-dom";

const AddUserAddress = (props) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")
  const [formData, setFormData] = useState({
    userId: userId,
    doorNumber: "",
    apartmentName: null,
    landmark: null,
    street: "",
    stateId: null,
    cityId: null,
    postalCode: "",
    contactNumber: "",
    statusId: 2,
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch states from the database
    const fetchStates = async () => {
      try {
        const response = await axios.get("https://localhost:7036/api/states");
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "stateId") {
      // Fetch cities related to the selected state
      try {
        const response = await axios.get(
          `https://localhost:7036/api/states/cities/${value}`
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token  = localStorage.getItem("token")
    
    setFormData({ ...formData, [userId]: userId });
    try {

      const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              };
      // Send user address data to API
      const response = await axios.post(
        "https://localhost:7036/api/user-addresses",
        formData,
        { headers: headers }
      );
      console.log(response.data);
      if(props.isCheckOutClicked){
        console.log("came here");
        props.onSubmit("refresh")
        navigate('/useraddresses',{state:{isCheckOutClicked:true}})
      }
      else{
        props.onSubmit("refresh")
        navigate('/useraddresses')
      }
      //console.log(props.isCheckOutClicked);

      // Handle success, e.g., show a success message or redirect the user
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="container-address">
      <h2>Add User Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="doorNumber"
            placeholder="Door Number"
            value={formData.doorNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="apartmentName"
            placeholder="Apartment Name"
            value={formData.apartmentName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <select
            name="stateId"
            value={formData.stateId}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.stateId} value={state.stateId}>
                {state.stateName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <select
            name="cityId"
            value={formData.cityId}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.cityId} value={city.cityId}>
                {city.cityName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Add Address
        </button>
      </form>
    </div>
  );
};

export default AddUserAddress;