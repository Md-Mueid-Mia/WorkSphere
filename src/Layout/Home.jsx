import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { Carousel } from '../Components/Carousel';
import TestimonialSlider from '../Components/TestimonialSlider';
import Services from '../Components/Services';
import AboutUs from '../Components/AboutUs';
import FeatureSection from '../Components/FeatureSection';

const Home = () => {
    return (
        <div>
           
            <Carousel></Carousel>
            <FeatureSection />
            <Services></Services>
            <AboutUs></AboutUs>

            <TestimonialSlider></TestimonialSlider>
            
        </div>
    );
};

export default Home;