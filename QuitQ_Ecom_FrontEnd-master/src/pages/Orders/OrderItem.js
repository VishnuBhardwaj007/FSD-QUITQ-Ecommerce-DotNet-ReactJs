import React, { useEffect, useState } from 'react'

const OrderItem = (props) => {
    const [imgs, setImgs] = useState({})
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let imagesByOrderId = {}; // Object to store images by order ID
        console.log(props.ordersData);
        let orderId = props.ordersData.orderId;
       
           
            imagesByOrderId[orderId] = []; // Initialize an empty array for each order ID

            props.ordersData.orderItemListDTOs.forEach(item => {
                // Assuming 'productImage' is the property containing the image URL
                if (item.product.productImage !== null) {
                    let img = item.product.productImage.split('\\').pop();
                    imagesByOrderId[orderId].push(img); // Push image to the array associated with the order ID
                }
            });
       
        setImgs(imagesByOrderId)
        setLoading(false);
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        
       <div>Loading...</div>
       
    )
}
export default OrderItem
