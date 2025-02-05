import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { Carousel } from '../Components/Carousel';
import TestimonialSlider from '../Components/TestimonialSlider';
import Services from '../Components/Services';
import AboutUs from '../Components/AboutUs';
import FeatureSection from '../Components/FeatureSection';
import Unique from '../Components/Unique';

const Home = () => {
    return (
        <div>
           
            <Carousel></Carousel>
            <Unique></Unique>
            <Services></Services>
            <AboutUs></AboutUs>
            <FeatureSection />

            <TestimonialSlider></TestimonialSlider>
            
        </div>
    );
};

export default Home;