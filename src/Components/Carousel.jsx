import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Carousel = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920",
      title: "Empowering Your Career Journey",
      subtitle: "Connecting Ambitions to Opportunities"
    },
    {
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920",
      title: "Build Your Dream Team",
      subtitle: "Find the Perfect Talent Match"
    },
    {
      image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&w=1920",
      title: "Transform Your Workplace",
      subtitle: "Innovative Recruitment Solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920",
      title: "Global Talent Network",
      subtitle: "Access World-Class Professionals"
    },
    {
      image: "https://images.unsplash.com/photo-1539786774582-0707555f1f72?auto=format&fit=crop&w=1920",
      title: "Future-Ready Hiring",
      subtitle: "AI-Powered Recruitment"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

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

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (
      (prevIndex + newDirection + slides.length) % slides.length
    ));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <div className="h-60 w-full mt-8 md:h-[470px] lg:h-[540px] relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full"
        >
          <img
            src={slides[currentIndex].image}
            className="w-full h-full object-cover"
            alt={`Slide ${currentIndex + 1}`}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white p-4"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 leading-tight">
              {slides[currentIndex].title}
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl text-center max-w-2xl">
              {slides[currentIndex].subtitle}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {/* <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={() => paginate(-1)}
          className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all"
        >
          ←
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all"
        >
          →
        </button>
      </div> */}

      {/* Dots */}
      {/* <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};