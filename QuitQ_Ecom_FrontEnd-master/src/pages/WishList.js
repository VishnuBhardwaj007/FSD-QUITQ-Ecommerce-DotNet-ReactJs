import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  // State for wishlist products
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistDetails, setWishlistDetails] = useState([]);
  const navigate = useNavigate();

  // Fetch wishlist products from the backend
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in local storage.");
          setLoading(false);
          return;
        }
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://localhost:7036/api/wishlist/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setWishlistProducts(response.data);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, []);

  // Fetch product details using product IDs from the wishlist
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          wishlistProducts.map(async (product) => {
            const response = await axios.get(
              `https://localhost:7036/api/products/${product.productId}`
            );
            return response.data;
          })
        );
        setWishlistDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (wishlistProducts.length > 0) {
      fetchProductDetails();
    }
  }, [wishlistProducts]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://localhost:7036/api/wishlist/${userId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Remove the product from the wishlist details state
      setWishlistDetails((prevDetails) =>
        prevDetails.filter((product) => product.productId !== productId)
      );
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (wishlistDetails.length === 0) {
    return (<div className="app">
    <div className="details" style={{justifyContent:"center"}}>

        <div className="big-img">
            <img src='/Images/wishlist_empty.png' alt="" />
            
        </div>
        </div>
</div>);
  }

  return (
    <div className="product-list-container">
      <h2 className="product-list-heading">Wishlist</h2>
      <div className="product-grid">
        {wishlistDetails.map((product) => {
          // Split the productImage URL by '/' and get the last part (image name)
          const imageName = product.productImage.split('\\').pop();
  
          return (
            <div
              key={product.productId}
              className="product-card"
              onClick={() => handleProductClick(product.productId)}
            >
              <img
                src={`/Images/${imageName}`} 
                alt={imageName}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-price">${product.price}</p>
              </div>
              <button
                className="remove-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent product click event from firing
                  handleRemoveProduct(product.productId);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}

export default Wishlist;
