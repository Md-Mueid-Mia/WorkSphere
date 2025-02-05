import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const Unique = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    { id: 1, title: "AI-Powered Matching", icon: "🤖", description: "Smart algorithm matching candidates to perfect roles" },
    { id: 2, title: "Real-time Analytics", icon: "📊", description: "Live tracking of recruitment metrics" },
    { id: 3, title: "Video Interviews", icon: "🎥", description: "Seamless remote interviewing platform" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y }} className="text-center text-white z-10">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Future of Recruitment
          </motion.h1>
        </motion.div>

        {/* Animated Background Elements */}
        {[...Array(20)].map((_, i) => (
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
      </motion.div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              onHoverStart={() => setHoveredCard(feature.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative p-4 md:p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              
              {hoveredCard === feature.id && (
                <motion.div
                  layoutId="outline"
                  className="absolute inset-0 rounded-xl border-2 border-purple-500"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Stats Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20 text-white"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "98%", label: "Success Rate" },
            { value: "24/7", label: "Support" },
            { value: "15K+", label: "Placements" },
            { value: "50+", label: "Countries" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="p-2 md:p-6 rounded-lg bg-white/5 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                className="text-4xl font-bold text-purple-400 mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Unique;