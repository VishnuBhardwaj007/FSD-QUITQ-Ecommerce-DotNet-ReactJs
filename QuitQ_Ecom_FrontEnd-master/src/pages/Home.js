import Banner from '../Components/Banner';
import './Home.css'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "../Components/Carousel";

import { slides } from "../data/carouselData";
import Footer2 from '../Components/Footer2';
import Footer3 from '../Components/Footer3';
import Footer from '../Components/Footer';
import DiscountBoard from '../Components/DiscountBoard'



function Home() {
    

    return (
        <div>
            <Banner />
            <div><DiscountBoard/></div>
            
            
            {/* <Footer2 /> */}
            <Footer />
{/* <Footer3 /> this is not need */}
{/*           
               
                {/* <Carousel data={slides} />
                <Carousel data={slides} /> */}
                
          
            
            
        </div>


    )
}
export default Home;