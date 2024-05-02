import React, { useState, useEffect } from 'react';
import "./AddProductForm.css"
import { toast } from 'react-toastify';

const AddProductForm = (props) => {
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null); // For handling file input
  const [storeId, setStoreId] = useState(props.storeId);
  const [productStatusId, setProductStatusId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productDetails, setProductDetails] = useState([{ Attribute: '', Value: '', isDuplicate: false, isEmpty: false }]);
  const [productImages, setProductImages] = useState([{ ImageFile: null}]);


  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [nameValidation,setNameValidation] = useState(false)
  const [productImageValidation,setProductImageValidation] = useState(false)
  const [brandValidation,setBrandValidation] = useState(false)
  const [categoryValidation,setCategoryValidation] = useState(false)
  const [subCategoryValidation,setSubCategoryValidation] = useState(false)
  const [quantityValidation,setQuantityValidation] = useState(false)
  const [priceValidation,setPriceValidation] = useState(false)


  useEffect(() => {
    // Fetch brands data
    const fetchBrands = async () => {
      try {
        const response = await fetch('https://localhost:7036/api/brands');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBrands(data);
        } else {
          console.error('Failed to fetch brands');
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:7036/api/categories');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCategories(data);
        } else {
          console.error('Failed to fetch brands');
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    const fetchSuCategories = async () => {
      try {
        const response = await fetch('https://localhost:7036/api/subcategories');
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSubcategories(data);
        } else {
          console.error('Failed to fetch brands');
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
    fetchCategories();
    fetchSuCategories();
  }, []);
  const handleAddImage = () => {
    setProductImages([...productImages, { ImageFile: null }]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...productImages];
    updatedImages.splice(index, 1);
    setProductImages(updatedImages);
  };

  const handleChangeImage = (index, imageFile) => {
    const updatedImages = [...productImages];
    updatedImages[index].ImageFile = imageFile;
    setProductImages(updatedImages);
  };



  const handleAddDetail = () => {
    setProductDetails([...productDetails, { Attribute: '', Value: '', isDuplicate: false, isEmpty: false }]);
  };

  const handleRemoveDetail = (index) => {
    const newProductDetails = [...productDetails];
    newProductDetails.splice(index, 1);
    setProductDetails(newProductDetails);
  };

  const handleChangeDetail = (index, key, value) => {
    const newProductDetails = [...productDetails];
    if (key === "Attribute") { var attributeName = value.trimStart().trimEnd(); }
    else {
      attributeName = value
    }
    
    newProductDetails[index][key] = attributeName.toUpperCase()
    newProductDetails[index].isDuplicate = checkForDuplicates(newProductDetails, index);
    newProductDetails[index].isEmpty = attributeName === '';
    setProductDetails(newProductDetails);
  };

  const checkForDuplicates = (details, currentIndex) => {
    const attributeSet = new Set();
    for (let i = 0; i < details.length; i++) {
      if (i !== currentIndex && details[i].Attribute === details[currentIndex].Attribute) {
        return true; // Duplicate found
      }
      attributeSet.add(details[i].Attribute);
    }
    return false; // No duplicate found
  };

  const resetForm = () => {
    setProductName('');
    setProductImage(null);
    setStoreId('');
    setProductStatusId('');
    setBrandId('');
    setCategoryId('');
    setSubCategoryId('');
    setPrice('');
    setQuantity('');
    setProductDetails([{ Attribute: '', Value: '', isDuplicate: false, isEmpty: false }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if(nameValidation || productImageValidation || categoryValidation || subCategoryValidation || brandValidation || quantityValidation || priceValidation||prod){
    //   toast.warning("fill all required fields")
    //   return
    // }

    const formData = new FormData();
    formData.append('ProductName', productName);
    formData.append('ProductImageFile', productImage);
    formData.append('StoreId', storeId);
    formData.append('ProductStatusId', productStatusId);
    formData.append('BrandId', brandId);
    formData.append('CategoryId', categoryId);
    formData.append('SubCategoryId', subCategoryId);
    formData.append('Price', price);
    formData.append('Quantity', quantity);

    // Append each product detail to the form data
    productDetails.forEach((detail, index) => {
      if (!detail.isEmpty) {
        formData.append(`ProductDetails[${index}].Attribute`, detail.Attribute);
        formData.append(`ProductDetails[${index}].Value`, detail.Value);
      }
    });


    productImages.forEach((image, index) => {
      formData.append(`Images[${index}].ImageFile`, image.ImageFile);
      
    });

    // try {
    const token = localStorage.getItem('token');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    try {
      const response = await fetch('https://localhost:7036/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        //show toast msg
        props.onSubmit("refresh")
        console.log("Product added successfully");
        resetForm();

      } else {
        console.log("Could not add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <div className="form-container">
        <h1>Add New Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label>Product Name:</label>
              <input type="text" value={productName} onChange={(e) => {setProductName(e.target.value)  ;setNameValidation(true)}}/>
              {nameValidation && productName.trim() === '' && <div style={{ color: 'red' }}>Product name is required</div>}
              {nameValidation && productName.length < 3 && productName.trim() !== '' && <div style={{ color: 'red' }}>Product name must be at least 3 characters</div>}
            </div>
            <div>
              <label>Product Image:</label>
              <input type="file" onChange={(e) => {setProductImage(e.target.files[0]);setProductImageValidation(true)}} />
              {productImageValidation && !productImage && <div style={{ color: 'red' }}>Product image is required</div>}

            </div>
            <div>
              <label>Product Status:</label>
              <input
                type="checkbox"
                checked={productStatusId === 1}
                onChange={(e) => setProductStatusId(e.target.checked ? 1 : 2)}
              />
              Available
              {productStatusId !== '1' && productStatusId !== '2' && <div style={{ color: 'red' }}>Please select product status</div>}
            </div>

          </div>
          <div className="form-row">
            <div>
              <label>Brand Name:</label>
              <select value={brandId} onChange={(e) => {setBrandId(e.target.value);setBrandValidation(true)}}>
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                ))}
              </select>
              {brandValidation &&brandId.trim() === '' && <div style={{ color: 'red' }}>Brand name is required</div>}
            </div>

            <div>
              <label>Category:</label>
              <select value={categoryId} onChange={(e) => {setCategoryId(e.target.value);setCategoryValidation(true)}}>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                ))}
              </select>
              {categoryValidation && categoryId.trim() === '' && <div style={{ color: 'red' }}>Category is required</div>}
            </div>
            <div>
              <label>Subcategory:</label>
              <select value={subCategoryId} onChange={(e) => {setSubCategoryId(e.target.value);setSubCategoryValidation(true)}}>
                <option value="">Select Subcategory</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>{subcategory.subCategoryName}</option>
                ))}
              </select>
              {subCategoryValidation && subCategoryId.trim() === '' && <div style={{ color: 'red' }}>Subcategory is required</div>}
            </div>
          </div>
          <div className="form-row">
            <div>
              <label>Price:</label>
              <input type="number" value={price} onChange={(e) => {setPrice(e.target.value);setPriceValidation(true)}} />
              {priceValidation && price.trim() === '' && <div style={{ color: 'red' }}>Price is required</div>}
              {priceValidation && parseFloat(price) <= 0 && <div style={{ color: 'red' }}>Price must be greater than 0</div>}
            </div>
            <div>
              <label>Quantity:</label>
              <input type="number" value={quantity} onChange={(e) => {setQuantity(e.target.value);setQuantityValidation(true)}} />
              {quantityValidation &&quantity.trim() === '' && <div style={{ color: 'red' }}>Quantity is required</div>}
              {quantityValidation &&quantity <= 0 && <div style={{ color: 'red' }}>Quantity must be greater than 0</div>}
            </div>
          </div>
          <hr />
          <h4>Product Details:</h4>
          {productDetails.map((detail, index) => (
            <div key={index} className="form-row">
              <input
                type="text"
                value={detail.Attribute}
                placeholder="Attribute"
                onChange={(e) => handleChangeDetail(index, 'Attribute', e.target.value)}
              />
              {detail.Attribute.trim() === '' && <div style={{ color: 'red' }}>Attribute is required</div>}
        {detail.Attribute.trim().length < 3 && detail.Attribute.trim() !== '' && <div style={{ color: 'red' }}>Attribute must be at least 3 characters</div>}
              {index > 0 && productDetails.slice(0, index).some((prevDetail) => prevDetail.Attribute === detail.Attribute) && (
                <div className="validation-message">Duplicate attribute</div>
              )}
              <input
                type="text"
                value={detail.Value}
                placeholder="Value"
                onChange={(e) => handleChangeDetail(index, 'Value', e.target.value)}
              />
              {detail.Value.trim() === '' && <div style={{ color: 'red' }}>Value is required</div>}
              <button type="button" onClick={() => handleRemoveDetail(index)} >Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddDetail}>Add Detail</button>
          <hr />
          <div>
  <h4>Product Images:</h4>
  {productImages.map((image, index) => (
    <div key={index}>
      <input
        type="file"
        onChange={(e) => handleChangeImage(index, e.target.files[0])}
      />
      {index >= 0 && (
        <button type="button" onClick={() => handleRemoveImage(index)}>
          Remove Image
        </button>
      )}
    </div>
  ))}
  <button type="button" onClick={handleAddImage}>Add Image</button>
</div>

          <div className="form-row">
            <button type="submit" className="add-product-button">Add Product</button>
            <button type="button" onClick={resetForm} className="reset-button">Reset Form</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProductForm;