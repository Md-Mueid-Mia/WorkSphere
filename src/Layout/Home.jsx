import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import { Carousel } from '../Components/Carousel';
import TestimonialSlider from '../Components/TestimonialSlider';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Carousel></Carousel>

            <TestimonialSlider></TestimonialSlider>
            <Outlet />
        </div>
    );
};

export default Home;