// Banner.js
import React from 'react';
import './Banner.css';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/products")
   
  };

  return (
    <div className="banner">
      <div className="banner-content">
        <h1>The Best Place To Find And Buy Amazing Product</h1>
        <button onClick={handleClick}>Shop now!</button>
      </div>
    </div>
  );
}

export default Banner;
