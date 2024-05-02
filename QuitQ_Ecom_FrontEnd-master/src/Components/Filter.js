import React, { useState, useEffect } from "react";
import "./Filter.css";

function Filters({ onSubmit }) {
  // State for filter criteria
  const [filterCriteria, setFilterCriteria] = useState({
    minPrice: null,
    maxPrice: null,
    brandId: null,
    categoryId: null,
    subCategoryId: null,
  });

  // State for dropdown options
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch brands, categories, and subcategories from API
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch("https://localhost:7036/api/brands");
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://localhost:7036/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await fetch(
        `https://localhost:7036/api/categories/${categoryId}/subcategories`
      );
      const data = await response.json();
      setSubCategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handler for when the filter criteria change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  // Handler for when the search button click
  const handleSearch = async () => {
    try {
      console.log(filterCriteria, "filter");
      // Send filterCriteria to the backend API for filtering
      const response = await fetch(
        "https://localhost:7036/api/products/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filterCriteria),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to apply filters");
      }

      const data = await response.json();
      console.log("Filtered products:", data);
      onSubmit(data);
      // Handle filtered products here (e.g., update state to display filtered products)
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  function handleReset(){
    setFilterCriteria({
      minPrice: null,
      maxPrice: null,
      brandId: null,
      categoryId: null,
      subCategoryId: null,
    })
    onSubmit(null)
  }


  return (
    <div className="filters">
      <div className="filter-section">
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="range"
          id="minPrice"
          name="minPrice"
          min="0"
          max="1000"
          value={filterCriteria.minPrice || ""}
          onChange={handleFilterChange}
        />
        <span>${filterCriteria.minPrice}</span>
      </div>
      <div className="filter-section">
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="range"
          id="maxPrice"
          name="maxPrice"
          min="0"
          max="1000"
          value={filterCriteria.maxPrice || ""}
          onChange={handleFilterChange}
        />
        <span>${filterCriteria.maxPrice}</span>
      </div>
      <div className="filter-section">
        <label htmlFor="brandId">Brand:</label>
        <select
          id="brandId"
          name="brandId"
          value={filterCriteria.brandId || ""}
          onChange={handleFilterChange}
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.brandId} value={brand.brandId}>
              {brand.brandName}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label htmlFor="categoryId">Category:</label>
        <select
          id="categoryId"
          name="categoryId"
          value={filterCriteria.categoryId || ""}
          onChange={(e) => {
            handleFilterChange(e);
            fetchSubCategories(e.target.value);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label htmlFor="subCategoryId">Subcategory:</label>
        <select
          id="subCategoryId"
          name="subCategoryId"
          value={filterCriteria.subCategoryId || ""}
          onChange={handleFilterChange}
        >
          <option value="">All Subcategories</option>
          {subCategories.map((subcategory) => (
            <option
              key={subcategory.subCategoryId}
              value={subcategory.subCategoryId}
            >
              {subcategory.subCategoryName}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <button onClick={handleSearch}>Apply Filters</button>
        <button onClick={handleReset}>Reset Filters</button>
      </div>
    </div>
  );
}

export default Filters;
