import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import "./UserDetails.css"; // Import the CSS file for styling
import UpdateUser from "./UpdateUser";

const UserDetails = () => {
  const [user, setUser] = useState(null); // State to store user details

  useEffect(() => {
    // Function to fetch user details from the backend
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(
          `https://localhost:7036/api/users/${userId}`
        ); // Replace {userId} with the actual user ID
        setUser(response.data); // Set the user details in the state
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails(); // Call the fetchUserDetails function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once
  const formatDateOfBirth = (dob) => {
    const date = new Date(dob);
    // Format the date in dd/mm/yyyy format
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return formattedDate;
  };
  return (
    <div className="user-details-container">
      {/* <h2>User Details</h2> */}
      {user ? (
        <>
        {/* <div className="user-details">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Date of Birth:</strong> {formatDateOfBirth(user.dob)}
          </p>
          <p>
            <strong>Contact Number:</strong> {user.contactNumber}
          </p>
        </div> */}
        <div>
          <UpdateUser/>
        </div>
        </>
      ) : (
        <div className="loading">
         <img src="Image/access_denied.png"/>

        </div>
      )}
    </div>
  );
};

export default UserDetails;
