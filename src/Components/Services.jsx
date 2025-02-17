import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Graphic Design",
      icon: "🎨",
      description: "Create stunning visuals that capture your brand's identity. From logos to social media posts, our designs are tailored to your needs.",
      cta: "Explore Designs"
    },
    {
      id: 2,
      title: "Web Design",
      icon: "💻",
      description: "Build responsive and user-friendly websites that engage your audience and drive conversions. Your dream website, designed to perfection.",
      cta: "Get Your Website"
    },
    {
      id: 3,
      title: "Digital Marketing",
      icon: "📈",
      description: "Boost your online presence with targeted marketing strategies, including SEO, PPC, email campaigns, and social media advertising.",
      cta: "Grow Your Business"
    },
    {
      id: 4,
      title: "Video Editing",
      icon: "🎬",
      description: "Transform your raw footage into professional-grade videos with seamless transitions, effects, and sound enhancements.",
      cta: "Edit My Videos"
    },
    {
      id: 5,
      title: "Content Writing",
      icon: "✍️",
      description: "High-quality content that captivates your audience. From blogs to product descriptions, we deliver impactful writing tailored to your goals.",
      cta: "Let’s Write"
    },
    {
      id: 7,
      title: "Branding & Identity",
      icon: "🏷️",
      description: "Build a powerful brand identity that resonates with your target audience. Logo design, color palettes, and brand guidelines are all included.",
      cta: "Create My Brand"
    },
    {
      id: 8,
      title: "UI/UX Design",
      icon: "🖌️",
      description: "Enhance user experiences with intuitive and visually appealing designs. Your product will be both functional and beautiful.",
      cta: "Improve My UX"
    },
    {
      id: 9,
      title: "Photography & Editing",
      icon: "📸",
      description: "Capture your best moments with professional photography and post-production editing for stunning results.",
      cta: "Book a Session"
    },
    {
      id: 10,
      title: "App Development",
      icon: "📲",
      description: "Build custom mobile applications for iOS and Android. We turn your innovative ideas into reality with seamless functionality.",
      cta: "Build My App"
    }
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  return (
    <div id='services' className="min-h-screen py-20 px-4 md:px-12 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Our Services
        </h2>
        <p className="text-center mb-12 text-gray-600 dark:text-gray-300">
          Transform your ideas into reality with our expert services
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="relative backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 
                        shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                        border border-gray-200 dark:border-gray-700"
            >
              <div className="absolute top-0 right-0 m-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Popular
                </span>
              </div>

              <div className="text-6xl mb-6 transform transition-all hover:scale-110 hover:rotate-12">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                {service.title}
              </h3>

              <p className="mb-6 text-gray-600 dark:text-gray-300">
                {service.description}
              </p>

              <button className="w-full group relative inline-flex items-center justify-center px-6 py-3 
                               overflow-hidden font-bold rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 
                               text-white transition-all hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-400">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 
                               rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">{service.cta}</span>
              </button>

              <div className="mt-6 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>⭐ 4.9/5</span>
                <span>Starting from $99</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Services;
