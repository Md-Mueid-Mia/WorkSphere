import { useCallback, useEffect, useState } from "react";
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpg';
import banner5 from '../assets/lifestyle-designer-using-3d-printer.jpg';

export const Carousel = () => {
  

  return (
    <div className="h-60 w-full md:h-[470px] lg:h-[540px] relative overflow-hidden">
      <img src={banner1} className="min-w-full h-60 bg-black/20 sm:h-96 md:h-[540px] object-cover" alt="Slider" />
      
      {/* Centered text with background color and blur effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4 backdrop-blur-md bg-black/30 rounded-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">Empowering Your Career Journey</h2>
        <p className="text-sm sm:text-base lg:text-lg">Connecting Ambitions to Opportunities.</p>
      </div>

     
    </div>
  );
};
