
import React, { useState ,useRef,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { Bounce, Flip, ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function ProductDetail(props) {
    const { productId } = useParams();
    const [addedToCart, setAddedToCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [product,setProduct] = useState({
        brandId: 0,
        categoryId: 0,
        images: [],
        price: 0,
        productDetails: [],
        productId: 0,
        productImage: '',
        productImageFile: null,
        productName: '',
        productStatusId: 0,
        quantity: 0,
        sellerName: '',
        storeId: 0,
        subCategoryId: 0,
        BrandName:"",
        CategoryName:"",
        SubCategoryName:"",
        StoreName:""
      });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const myRef = useRef();
    
    const fetchCartItems = async () => {
        try {
    
          
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId')
    
          
          const options = {
            method: 'GET',
            headers: {
              
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          };
    
          const response = await fetch(`https://localhost:7036/api/cart/${userId}`,options);
          if (response.ok) {
            const data = await response.json();
            setCartItems(data);
            console.log(data);
          } else {
            console.error('Failed to fetch cart items');
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`https://localhost:7036/api/products/${productId}`);
                if (!response.ok){setProduct([]); throw new Error('Network response was not ok');}
                const data = await response.json();
                console.log(data);
               

                const mainImageFilename = data.productImage ? `/Images/${data.productImage.split('\\').pop()}` : '';

                // Update paths in the images array
                if (data.images && Array.isArray(data.images)) {
                    data.images = data.images.map(image => `/Images/${image.storedImage.split('\\').pop()}`);
                }
    
                // Prepend the main product image to the images array if it exists
                if (mainImageFilename) {
                    data.images.unshift(mainImageFilename);
                }
            console.log(data);
                setProduct(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProductDetail();
        fetchCartItems();


        
    }, [productId,addedToCart]);

    const isProductInCart = (productId) => {
        return cartItems.some(item => item.productId === productId);
        
      };

    const handleTab = (index) => {
        setSelectedIndex(index);
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };

    const notify=()=>{
        {!props.userloggedin?toast.warn('Log In To Add To Cart', {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
            }):toast.success('Product Added To Cart!', {
                position: "top-center",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
                });}
        
    }
    const handlAddToCart = async (productId) => {
       if(props.userloggedin){
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('https://localhost:7036/api/cart/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
              },
              body: JSON.stringify({
                cartId: 0,
  userId: localStorage.getItem('userId'),
  productId: productId,
  quantity: 1,
              })
            });
      
            if (response.ok) {
              
              console.log('added successful!');
              setAddedToCart(true);
              notify();
              
            } else {
             
              console.error('add failed');
            }
          } catch (error) {
            console.error('Error:', error);
          }
          }
          else{
            notify();
          }
          
        
    }

    if (product.length===0) return( 
      <div className="app">
      <div className="details" style={{justifyContent:"center"}}>
          <div className="big-img">
              <img src="/Images/productNotFound.webp" alt="" />
              
          </div>
          </div>
          </div>
  )
    ;
    
    //const filename = product.productImage.split('\\').pop(); 
    
    return (
        <div className="app">
            <div className="details" key={product.productId}>
                <div className="big-img">
                    <img src={product.images[selectedIndex]} alt="" />
                   
                </div>

                <div className="box">
                    <div className="row" style={{flexDirection:"column",margin: 0, paddingBottom: 0}}>
                        <h2>{product.productName}</h2><span style={{ lineHeight:"0px", margin: 0, paddingBottom: 0}}>Store : {product.storeName}</span>
                    
                        
                    </div>
                    
                    <p>{product.content}</p>

                    <div className="thumb" ref={myRef}>
                        {product.images.map((img, index) => (
                            <img src={img} alt={img} key={index} onClick={() => handleTab(index)} />
                        ))}
                    </div>
                    <h1>${product.price}</h1>
                    {/* {product.quantity>0? <button className="cart" onClick={() => handlAddToCart(product.productId)}>
        {isProductInCart(product.productId) ? 'Added to Cart' : 'Add to Cart'}
    </button>:<button className="cart">Out Of Stock</button>} */}
    {product.quantity>0?isProductInCart(product.productId)?<button className="cart" >Added To Cart</button>: <button className="cart" onClick={() => handlAddToCart(product.productId)}>
       Add To Cart
    </button>:<button className="cart">Out Of Stock</button>}
                    
                </div>
                
            </div>
            <div className="box">
                    <div className="row">
                        <h2>Product Details</h2>
                        
                    </div>
                    <p></p>
                    <p style={{lineHeight:"12px"}}> <strong>Category</strong>:{product.categoryName}</p>
                    <p style={{lineHeight:"12px"}}> <strong>SubCategory</strong>:{product.subCategoryName}</p>
                    <p style={{lineHeight:"12px"}}> <strong>Brand</strong>:{product.brandName}</p>
                    
                    
                    
                    
                    {product.productDetails.map((vallue, index) => (
                        <div >
                        
                        <p key={index} style={{lineHeight:"12px"}}> <strong>{vallue.attribute}</strong>:{`${vallue.value}`}</p>

                            
                        </div>
                            
                        ))}

                    
                    
                </div>
            <ToastContainer/>
        </div>
    );
}

export default ProductDetail;
