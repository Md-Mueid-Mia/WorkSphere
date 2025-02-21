import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from "react-icons/fa";
import { useTheme } from "../Provider/ThemeProvider";

const Testimonial = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isDarkTheme } = useTheme();

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "HR Director",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "This platform revolutionized our hiring process. We've found amazing talent quickly and efficiently.",
      rating: 5
    },
    {
      name: "Michael Chen",
      title: "Tech Lead",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "The AI-powered matching system is incredible. It saved us countless hours in the recruitment process.",
      rating: 5
    },
    {
      name: "Emma Wilson",
      title: "Startup Founder",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "As a growing startup, finding the right talent was crucial. This platform made it seamless.",
      rating: 4
    },
    {
      name: "David Rodriguez",
      title: "Operations Manager",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      text: "The quality of candidates we've received has been consistently excellent. Highly recommended!",
      rating: 5
    }
  ];
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [current, isAnimating]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  };


  return (
    <div className={`min-h-[770px] py-20 px-4 transition-colors duration-300 `}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent
          ${isDarkTheme
            ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400'
            : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600'
          }`}
      >
        Client Testimonials
      </motion.h2>

      <div className="relative w-full max-w-4xl mx-auto px-4">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <div className={`relative backdrop-blur-lg rounded-2xl p-8 md:p-12 
              ${isDarkTheme 
                ? 'bg-white/5 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
                : 'bg-white/30 border border-white/20 shadow-xl'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              >
                <FaQuoteLeft className="text-white text-xl" />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6"
              >
                <img
                  src={testimonials[current]?.image}
                  alt={testimonials[current].name}
                  className="w-full h-full rounded-full object-cover border-4 border-white/50"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 opacity-20"></div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  {testimonials[current].name}
                </h3>
                <p className={`text-sm md:text-base mb-6 ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {testimonials[current].title}
                </p>
                <p className={`text-base md:text-lg italic mb-6 ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  "{testimonials[current].text}"
                </p>
                
                <motion.div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <FaStar
                        className={`w-6 h-6 ${
                          index < testimonials[current].rating
                            ? "text-yellow-400"
                            : isDarkTheme ? "text-gray-700" : "text-gray-300"
                        }`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {/* <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            disabled={isAnimating}
            className={`pointer-events-auto p-3 rounded-full transition-all duration-300 ${
              isDarkTheme
                ? 'bg-white/10 hover:bg-white/20'
                : 'bg-white/30 hover:bg-white/50'
            } backdrop-blur-sm ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaChevronLeft className={`w-6 h-6 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={isAnimating}
            className={`pointer-events-auto p-3 rounded-full transition-all duration-300 ${
              isDarkTheme
                ? 'bg-white/10 hover:bg-white/20'
                : 'bg-white/30 hover:bg-white/50'
            } backdrop-blur-sm ${
              isAnimating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaChevronRight className={`w-6 h-6 ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`} />
          </motion.button>
        </div> */}

        {/* Progress Dots */}
        {/* <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              disabled={isAnimating}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current 
                  ? `w-8 ${isDarkTheme ? 'bg-purple-500' : 'bg-blue-600'}`
                  : `w-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-400'}`
              } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Testimonial;