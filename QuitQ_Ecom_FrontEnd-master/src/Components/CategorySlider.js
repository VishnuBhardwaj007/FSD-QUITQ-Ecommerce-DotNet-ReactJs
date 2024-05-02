import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CategorySlider.css';

const CategorySlider = ({ apiEndpoint }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiEndpoint]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleCategoryClick = (categoryId) => {
    // Scroll to the top of the window with smooth effect
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate(`/prod/${categoryId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (categories.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <div className="category-slider-container">
      <h2 className="category-slider-heading">Product Categories</h2>
      <div className="category-slider-bar" />

      <Slider {...sliderSettings} className="category-slider">
        {categories.map((category) => (
          <div
            key={category.categoryId}
            className="category-slider-item"
            style={{ backgroundColor: getBackgroundColor(category) }}
            onClick={() => handleCategoryClick(category.categoryId)}
          >
            <div className="category-slider-name" style={{height:"100px", display:"flex",alignItems:"center",justifyContent:"center"}}>{category.categoryName}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const getBackgroundColor = (category) => {
  const colors = ['#ffcccb', '#d1c4e9', '#c5e1a5', '#ffe082', '#b3e5fc'];
  const hash = category.categoryId % colors.length;
  return colors[hash];
};

export default CategorySlider;
