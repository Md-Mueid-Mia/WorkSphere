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
import { useTheme } from '../Provider/ThemeProvider';

const Home = () => {
      const {  isDarkTheme, toggleTheme } = useTheme();
    return (
        <div>
           <div className={`${
      isDarkTheme
        ? 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950' // Updated darker background
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50'
    }`}>
            <Carousel></Carousel>
            <Unique></Unique>
            <Services></Services>
            <AboutUs></AboutUs>
            <FeatureSection />

            <BlogSection></BlogSection>
            <TestimonialSlider></TestimonialSlider>
            <CallToAction></CallToAction>
            </div>
            {/* <Partners></Partners> */}
        </div>
    );
};

export default Home;