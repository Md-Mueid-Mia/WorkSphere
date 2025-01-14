import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { Carousel } from '../Components/Carousel';
import TestimonialSlider from '../Components/TestimonialSlider';
import Services from '../Components/Services';

const Home = () => {
    return (
        <div>
           
            <Carousel></Carousel>
            <Services></Services>

            <TestimonialSlider></TestimonialSlider>
            
        </div>
    );
};

export default Home;