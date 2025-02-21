import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../Provider/ThemeProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Services = () => {
  const { isDarkTheme } = useTheme();
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
  const handleBook = (cta) => {
//  console.log(cta);
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Book ${cta} Successful! Our team will contact you shortly.`,
      showConfirmButton: false,
      timer: 2500
    });
  }
   return (
    <div 
    id='services' 
    className={`min-h-screen pb-5 px-4 md:px-12 transition-colors duration-300 `}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto"
        >
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent 
            ${isDarkTheme
              ? 'bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300'
              : 'bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700'
            }`}
          >
            Our Services
          </h2>
          <p className={`text-lg md:text-xl text-center mb-12 max-w-2xl mx-auto ${
            isDarkTheme ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Transform your ideas into reality with our expert services
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className={`relative backdrop-blur-lg rounded-xl p-6 
                  ${isDarkTheme
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'bg-white border border-gray-100 hover:border-purple-200'
                  }
                  transition-all duration-300
                  shadow-lg hover:shadow-xl`}
              >
                <div className="absolute top-0 right-0 m-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full
                    ${isDarkTheme
                      ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30'
                      : 'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}
                  >
                    Popular
                  </span>
                </div>
  
                <div className="text-6xl mb-6 transform transition-all hover:scale-110 hover:rotate-12">
                  {service.icon}
                </div>
  
                <h3 className={`text-xl md:text-2xl font-bold mb-3 ${
                  isDarkTheme 
                    ? 'text-white/90 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text'
                    : 'text-gray-800 bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text'
                }`}>
                  {service.title}
                </h3>
  
                <p className={`mb-6 leading-relaxed ${
                  isDarkTheme ? 'text-gray-300/90' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>
  
                <button onClick={()=>handleBook(service.cta)} className={`w-full group relative inline-flex items-center justify-center px-6 py-3 
                  overflow-hidden font-bold rounded-lg transition-all
                  ${isDarkTheme
                    ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-400 hover:via-blue-400 hover:to-purple-400'
                    : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-500 hover:via-blue-500 hover:to-purple-500'
                  }
                  text-white shadow-lg hover:shadow-xl`}>
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 
                                 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative">{service.cta}</span>
                </button>
  
                <div className={`mt-6 flex justify-between text-sm font-medium ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>4.9/5</span>
                  </span>
                  <span className={`${
                    isDarkTheme 
                      ? 'text-purple-300/80' 
                      : 'text-purple-600'
                  }`}>
                    Starting from $99
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
};

export default Services;
