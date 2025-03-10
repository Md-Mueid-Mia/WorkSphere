
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '../Provider/ThemeProvider';

const Unique = () => {
  const containerRef = useRef(null);
  const {  isDarkTheme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    { 
      id: 1, 
      title: "AI-Powered Matching", 
      icon: "🤖", 
      description: "Smart algorithm matching candidates to perfect roles",
      color: isDarkTheme ? "from-blue-400 to-purple-500" : "from-blue-600 to-purple-700"
    },
    { 
      id: 2, 
      title: "Real-time Analytics", 
      icon: "📊", 
      description: "Live tracking of recruitment metrics",
      color: isDarkTheme ? "from-purple-400 to-pink-500" : "from-purple-600 to-pink-700"
    },
    { 
      id: 3, 
      title: "Video Interviews", 
      icon: "🎥", 
      description: "Seamless remote interviewing platform",
      color: isDarkTheme ? "from-pink-400 to-rose-500" : "from-pink-600 to-rose-700"
    }
  ];

  return (
    <div ref={containerRef} 
      className={`min-h-screen transition-all duration-500 `}
    >
      {/* Theme Toggle Button */}
     

      {/* Hero Section */}
      <div className="relative min-h-[30vh] mt-14 flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <motion.h1 
            className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent 
              ${isDarkTheme 
                ? 'bg-gradient-to-r from-purple-400 to-pink-600' 
                : 'bg-gradient-to-r from-purple-600 to-pink-800'
              }`}
          >
            Future of Recruitment
          </motion.h1>
          <motion.p 
            className={`text-lg sm:text-xl max-w-2xl mx-auto pb-5 ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Transform your hiring process with next-generation recruitment solutions
          </motion.p>
        </motion.div>

        {/* Animated Background */}
        {isDarkTheme && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 bg-white rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              onHoverStart={() => setHoveredCard(feature.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`relative p-6 rounded-2xl backdrop-blur-lg 
                ${isDarkTheme 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white shadow-xl border border-purple-50'
                }`}
            >
              <div className={`text-5xl mb-6 bg-gradient-to-r ${feature.color} bg-clip-text`}>
                {feature.icon}
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mb-4 ${
                isDarkTheme ? 'text-white' : 'text-slate-800'
              }`}>
                {feature.title}
              </h3>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
              
              {hoveredCard === feature.id && (
                <motion.div
                  layoutId="outline"
                  className={`absolute inset-0 rounded-2xl border-2 ${
                    isDarkTheme ? 'border-purple-400/50' : 'border-purple-500/50'
                  }`}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {[
            { value: "98%", label: "Success Rate" },
            { value: "24/7", label: "Support" },
            { value: "15K+", label: "Placements" },
            { value: "50+", label: "Countries" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl ${
                isDarkTheme 
                  ? 'bg-white/5 backdrop-blur-sm' 
                  : 'bg-white shadow-lg'
              }`}
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className={`text-3xl sm:text-4xl font-bold mb-2 ${
                  isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                }`}
              >
                {stat.value}
              </motion.div>
              <div className={`text-sm sm:text-base ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Unique;