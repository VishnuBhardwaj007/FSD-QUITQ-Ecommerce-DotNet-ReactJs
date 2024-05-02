import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateCategory = ({ categoryId,onSubmit }) => {
  const [category, setCategory] = useState({});

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(categoryId);
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7036/api/categories/${categoryId}`
        );
        setCategory(response.data);
      } catch (error) {
        setErrorMessage("Failed to fetch category details");
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(category);
    // return
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `https://localhost:7036/api/categories/${categoryId}`,
        category,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }}
      );
      onSubmit("category")
      setSuccessMessage("Category updated successfully");
    } catch (error) {
      setErrorMessage("Failed to update category");
    }
  };

  return (
    <div>
      <h2>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={category.categoryName}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Category</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
     
    </div>
  );
};

export default UpdateCategory;
