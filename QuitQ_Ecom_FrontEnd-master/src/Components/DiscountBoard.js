import React from 'react';
import './DiscountBoard.css';

// Import the images
import Off from '../Assets/30Off.avif';
import Offf from '../Assets/45Off.jpg';
import offff from '../Assets/50Off.jpg';

const DiscountBoard = () => {
  return (
    <div className="footer2-container">
      <h2 className="footer2-heading">Summer Specials</h2>
      <h3 className='footer2-subline'>
        Latest Styles to Sizzle In!
      </h3>
      <div className="footer2-bar" />
      <div className="footer2-images">
        <img src={Off} alt="30% Off" className="footer2-img" />
        <img src={Offf} alt="45% Off" className="footer2-img" />
        <img src={offff} alt="50% Off" className="footer2-img" />
      </div>
      
    </div>
  );
};

export default DiscountBoard;
