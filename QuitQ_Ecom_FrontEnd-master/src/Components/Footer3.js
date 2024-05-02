import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Footer3.css';

// Import the images for the slijpg
import Brand1 from '../Assets/Brand1.jpg';
import Brand2 from '../Assets/Brand2.png';
import Brand3 from '../Assets/Brand3.png';
import Brand4 from '../Assets/Brand4.png';
import Brand5 from '../Assets/Brand5.png';
import Brand6 from '../Assets/Brand6.png';
import Brand7 from '../Assets/Brand7.png';
import Brand8 from '../Assets/Brand8.png';
import Brand9 from '../Assets/Brand9.png';
import Brand10 from '../Assets/Brand10.png';

const Footer3 = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="footer3-container">
      <h2 className="footer3-heading">Our Trusted Brands</h2>
      <div className="footer3-bar" />

      <Slider {...sliderSettings} className="footer3-slider">
        <img src={Brand1} alt="Brand 1" className="footer3-slider-img" />
        <img src={Brand2} alt="Brand 2" className="footer3-slider-img" />
        <img src={Brand3} alt="Brand 3" className="footer3-slider-img" />
        <img src={Brand4} alt="Brand 4" className="footer3-slider-img" />
        <img src={Brand5} alt="Brand 5" className="footer3-slider-img" />
        <img src={Brand6} alt="Brand 6" className="footer3-slider-img" />
        <img src={Brand7} alt="Brand 7" className="footer3-slider-img" />
        <img src={Brand8} alt="Brand 8" className="footer3-slider-img" />
        <img src={Brand9} alt="Brand 9" className="footer3-slider-img" />
        <img src={Brand10} alt="Brand 10" className="footer3-slider-img" />
      </Slider>
    </div>
  );
};

export default Footer3;
