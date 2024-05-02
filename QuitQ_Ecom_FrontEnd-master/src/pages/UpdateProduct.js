import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProductForm = ({ productId, storeIDVal, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productData, setProductData] = useState({});
  const [productImage, setProductImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const [productResponse, categoriesResponse, subCategoriesResponse, brandsResponse] = await Promise.all([
          axios.get(`https://localhost:7036/api/products/${productId}`),
          axios.get('https://localhost:7036/api/categories'),
          axios.get('https://localhost:7036/api/subcategories'),
          axios.get('https://localhost:7036/api/brands'),
        ]);
        const productData = productResponse.data;
        setProductName(productData.productName);
        setPrice(productData.price);
        setQuantity(productData.quantity);
        setProductData(productData);
        setProductImage(productData.productImage);
        setCategoryId(productData.categoryId);
        setBrandId(productData.brandId);
        setSubCategoryId(productData.subCategoryId);
        setCategories(categoriesResponse.data);
        setSubCategories(subCategoriesResponse.data);
        setBrands(brandsResponse.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryId(e.target.value);
  };

  const handleBrands = (e) => {
    setBrandId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('ProductId', productData.productId);
      formData.append('ProductName', productName);
      formData.append('StoreId', productData.storeId);
      formData.append('ProductStatusId', productData.productStatusId);
      formData.append('price', price);
      formData.append('Quantity', quantity);
      formData.append('CategoryId', categoryId);
      formData.append('SubCategoryId', subCategoryId);
      formData.append('BrandId', brandId);

      formData.append('ProductImage', productImage);

      const token = localStorage.getItem('token');

      const response = await axios.put(`https://localhost:7036/api/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      onSubmit('refresh');
      console.log('Product updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-product-form-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="update-product-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select value={categoryId} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Sub Category:</label>
          <select value={subCategoryId} onChange={handleSubCategoryChange}>
            {subCategories.map((subcategory) => (
              <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>
                {subcategory.subCategoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Brands:</label>
          <select value={brandId} onChange={handleBrands}>
            {brands.map((brand) => (
              <option key={brand.brandId} value={brand.brandId}>
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Product Image:</label>
          <input type="file" onChange={(e) => setProductImage(e.target.files[0])} />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
