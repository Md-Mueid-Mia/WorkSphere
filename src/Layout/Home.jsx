import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { Carousel } from '../Components/Carousel';
import TestimonialSlider from '../Components/TestimonialSlider';
import Services from '../Components/Services';
import AboutUs from '../Components/AboutUs';
import FeatureSection from '../Components/FeatureSection';
import Unique from '../Components/Unique';
import Partners from '../Components/Partners';
import BlogSection from '../Components/BlogSection';
import CallToAction from '../Components/CallToAction';

const Home = () => {
    return (
        <div>
           
            <Carousel></Carousel>
            <Unique></Unique>
            <Services></Services>
            <AboutUs></AboutUs>
            <FeatureSection />

            <BlogSection></BlogSection>
            <TestimonialSlider></TestimonialSlider>
            {/* <Partners></Partners> */}
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;