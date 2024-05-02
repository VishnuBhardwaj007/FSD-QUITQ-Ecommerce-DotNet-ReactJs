import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';

const InventoryProductDetail = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [product, setProduct] = useState([]);
    const myRef = useRef();
    const location = useLocation();
    

    var data = location.state?.data;
    console.log(data);

    
    if (data == undefined) {
        
       return <h1>No Item Found</h1>
      }


    const mainImageFilename = data.productImage ? `/Images/${data.productImage.split('\\').pop()}` : '';
    

    // Prepend the main product image to the images array if it exists
    if (mainImageFilename) {
        data.images.unshift(mainImageFilename);
    }
    setProduct(data)
    const handleTab = (index) => {
        setSelectedIndex(index);
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };
    return (
        <div className="app">
            <div className="details" key={product.productId}>
                <div className="big-img">
                    <img src={product.images[selectedIndex]} alt="" />
                   
                </div>

                <div className="box">
                    <div className="row" style={{flexDirection:"column",margin: 0, paddingBottom: 0}}>
                        <h2>{product.productName}</h2>
                    
                        
                    </div>
                    
                    <p>{product.content}</p>

                    <div className="thumb" ref={myRef}>
                        {product.images.map((img, index) => (
                            <img src={img} alt="" key={index} onClick={() => handleTab(index)} />
                        ))}
                    </div>
                    <h1>${product.price}</h1>
                    
                    
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
            
        </div>
    );
}

export default InventoryProductDetail
