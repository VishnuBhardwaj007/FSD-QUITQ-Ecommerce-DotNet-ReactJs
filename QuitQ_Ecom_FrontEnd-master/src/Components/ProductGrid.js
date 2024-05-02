// ProductGrid.js
import React, { useState,useEffect } from 'react';
import './ProductGrid.css';

import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function ProductCard({ productId,productName, price, productImage }) {
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const navigate = useNavigate();
  const filename = productImage.split('\\').pop(); 
  const token = localStorage.getItem('token');
    function handleProductCardClick(productId){
      navigate(`/products/${productId}`);
    }
    const handleAddToWishlist = async (productId) => {
      if (token!="") {
        try {
          
          const response = await fetch('https://localhost:7036/api/wishlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({
              UserId: localStorage.getItem('userId'),
              ProductId: productId,
            })
          });
    
          if (response.ok) {
            setIsAddedToWishlist(true);
            toast.success('Product added to wishlist successfully!');
          } else {
            console.error('Failed to add product to wishlist');
            toast.error('Failed to add product to wishlist');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Error adding product to wishlist');
        }
      } else {
        // Handle scenario if user is not logged in
        // For example, you may display a message or redirect to the login page
        toast.error('Please login to add products to wishlist');
      }
    };
  return (
    
    <div className="product-card" >
      <img src={`Images/${filename}`} alt={productName} className="product-image" onClick={()=>{handleProductCardClick(productId)}}/>
      <div style={{display:"flex", lineHeight:"0px",justifyContent:""}}>
      
     
      <h3 className="product-name">{productName}</h3>

      
      
      
      
      </div>
      <div style={{display:"flex", lineHeight:"0px",justifyContent:""}}>
      
     
     
      
      
      
      </div>
      
      
      
      <div style={{display:"flex" ,justifyContent:"space-between",}}>
      
     
      {/* <button className="cart">Add to cart</button> */}
      <p className="product-price">${price}</p>
      {/* <button className="cart">w</button> */}
      {isAddedToWishlist ? (
          <button className="cart" disabled style={{background:"white",color:"black",border:"2px solid black"}}>
            w
          </button>
        ) : (
          <button className="cart" onClick={() => handleAddToWishlist(productId)}>
            w
          </button>
        )}
      
      </div>
      
    </div>
  );
}

function ProductGrid(props) {
    const[wishListData,setWishListData] = useState([])
    const[products,setProducts] = useState([])
    const fetchWishListItems = async ()=>{
      const userId = localStorage.getItem("userId")
      if(userId!=undefined){
      try {
       
       const token = localStorage.getItem("token")
        const response = await fetch(`https://localhost:7036/api/wishlist/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            
            'Authorization': `Bearer ${token}`, // Example
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist items');
        }
    
        const data = await response.json();
        console.log("whishlist data",data);

        setWishListData(data)
        // Assuming the response data is an array of wishlist items
        return data;
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
        // Handle error appropriately, e.g., return an empty array
        return [];
      }}
      
    }
    const fetchProductItems = async () => {
      var status = 0
    if(props.subCategoryId>0){
      status=1;
    }
      try {
        var response = "";
        if(status==0){
          response = await fetch("https://localhost:7036/api/products/");
        }
        else{
          response = await fetch(`https://localhost:7036/api/products/subcategories/${props.subCategoryId }`);
        }
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data); // Set the fetched cart items
          console.log(data);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    useEffect(() => {
      fetchWishListItems();
      console.log('productgrid component re-rendered! and got the filters data',props?.filterData);
      console.log("data in product detail input value",props.searchQuery);
      console.log("data in product detail input value",props.isSearchActive);
      if(props.filterData!=undefined){
        setProducts(props.filterData)
      }
      else{
      if (props.isSearchActive===true && props.searchQuery!=="") {
        console.log("came here in search")
        const search = async () =>{
        try{
        const response = await fetch(`https://localhost:7036/api/products/search/${props.searchQuery}`);
            if (response.ok) {
              const data = await response.json();
              setProducts(data); // Set the fetched cart items
              
            } else {
              console.error('Failed to search product items');
            }
          }catch (error) {
            console.error('Error fetching search product items:', error);
          }}
          search();
      }
      else{
        fetchProductItems();
      }}
  },[props.searchQuery,props.isSearchActive,props.filterData]);
useEffect(() => {
  
    
    console.log("came here")
    
    
    

    fetchProductItems();} // Fetch cart items when component mounts
    , []);

  return (
    <section className="product-grid">
      {products.length!=0?

      products.map((product) => (
        
        <ProductCard key={product.id} {...product} />
      )):<div className="app">
      <div className="details" style={{justifyContent:"center"}}>

          <div className="big-img">
              <img src='/Images/productNotFound.webp' alt="" />
              
          </div>
          </div>
</div>}
    </section>
  );
}

export default ProductGrid;
