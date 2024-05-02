import React from 'react';
import './Footer2.css';

// Import the images
import FastDelivery from '../Assets/FastDelivery.png';
import FreeShipping from '../Assets/FreeShipping.png';
import BestQuality from '../Assets/BestQuality.png';

const Footer2 = () => {
  return (
    <div className="footer2-container">
      <h2 className="footer2-heading">Why Shop With Us</h2>
      <div className="footer2-bar" />
      <div className="footer2-images">
        <img src={FastDelivery} alt="Fast Delivery" className="footer2-img" />
        <img src={FreeShipping} alt="Free Shipping" className="footer2-img" />
        <img src={BestQuality} alt="Best Quality" className="footer2-img" />
      </div>
    </div>
  );
};

export default Footer2;
