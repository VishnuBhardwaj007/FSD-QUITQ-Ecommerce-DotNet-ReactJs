import React, { useState } from "react";
import axios from "axios";
import "./AddCategory.css";

const AddCategory = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await axios.post(
        "https://localhost:7036/api/categories",
        {
          categoryName: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );
      props.onSubmit("refresh")
      setSuccessMessage("Category added successfully.");
      setCategoryName("");
    } catch (error) {
      setErrorMessage("An error occurred while adding the category.");
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="add-category-container">
      <h2>Add Category</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleAddCategory}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            className="category-input"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-category-button">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
