import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddSub-Category.css";

const AddSubCategory = (props) => {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      const response = await axios.get(
        "https://localhost:7036/api/categories",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const token = localStorage.getItem("token"); // Get token from local storage
    //   const response = await axios.post(
    //     "https://localhost:7036/api/subcategories/",
    //     {
    //       subCategoryName,
    //       categoryId,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`, // Include token in the request headers
    //       },
    //     }
    //   );
    //   console.log("Sub-category added successfully:", response.data);
    //   // Reset form fields after successful submission
    //   setSubCategoryName("");
    //   setCategoryId("");
    // } catch (error) {
    //   console.error("Error adding sub-category:", error);
    // }
    e.preventDefault();
    

try {
  const token = localStorage.getItem("token"); // Get token from local storage
  const requestBody = {
    SubCategoryName:subCategoryName,
    CategoryId:categoryId,
  };

  const response = await fetch("https://localhost:7036/api/subcategories/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include token in the request headers
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Failed to add sub-category");
  }

  const responseData = await response.json();
  props.onSubmit("refresh")
  console.log("Sub-category added successfully:", responseData);

  // Reset form fields after successful submission
  setSubCategoryName("");
  setCategoryId("");
} catch (error) {
  console.error("Error adding sub-category:", error);
}

  };

  return (
    <div className="add-sub-category-container">
      <h2>Add Sub-Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Sub-Category Name:</label>
          <input
            type="text"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="form-label">Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Add Sub-Category
        </button>
      </form>
    </div>
  );
};

export default AddSubCategory;
