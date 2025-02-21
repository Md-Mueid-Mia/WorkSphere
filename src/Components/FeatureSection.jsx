import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaCog, FaChartLine, FaBriefcase, FaHandshake } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useTheme } from '../Provider/ThemeProvider';

const FeatureSection = () => {
  const { isDarkTheme } = useTheme();
  
  const features = [
    {
      icon: <FaRocket />,
      title: 'Fast Recruitment',
      description: 'Streamlined hiring process with quick turnaround times.',
      stat: '70%',
      statText: 'Faster Hiring'
    },
    {
      icon: <FaUsers />,
      title: 'Quality Candidates',
      description: 'Access to pre-screened, qualified talent pool.',
      stat: '95%',
      statText: 'Success Rate'
    },
    {
      icon: <FaCog />,
      title: 'Smart Automation',
      description: 'AI-powered matching and screening processes.',
      stat: '85%',
      statText: 'Automation'
    },
    {
      icon: <FaChartLine />,
      title: 'Data Analytics',
      description: 'Advanced insights and hiring metrics.',
      stat: '50K+',
      statText: 'Placements'
    },
    {
      icon: <FaBriefcase />,
      title: 'Enhanced Employer Branding',
      description: 'Showcase your company culture to attract the best talent.',
      stat: '200+',
      statText: 'Partners'
    },
    {
      icon: <FaHandshake />,
      title: 'Dedicated Support',
      description: '24/7 expert recruitment assistance.',
      stat: '24/7',
      statText: 'Support'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id='Choose' 
      className={`relative pb-20 px-4 transition-all duration-300 `}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${
        isDarkTheme 
          ? 'bg-grid-white/[0.02]'
          : 'bg-grid-black/[0.05]'
      } bg-[size:20px_20px]`}></div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <motion.h2 
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent ${
              isDarkTheme
                ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            }`}
          >
            Why Choose Our Recruitment Solutions?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Discover a seamless way to connect with the right talent through our innovative solutions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group h-full"
            >
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 rounded-xl blur transition duration-300 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-30'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20'
              }`}></div>

              {/* Card Content */}
              <div className={`relative rounded-xl p-8 h-full flex flex-col transition-all duration-300 ${
                isDarkTheme
                  ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-900'
                  : 'bg-white shadow-xl hover:shadow-2xl'
              }`}>
                {/* Icon */}
                <div className={`text-3xl mb-4 ${
                  isDarkTheme ? 'text-purple-400' : 'text-indigo-600'
                }`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className={`mb-6 flex-grow ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>

                {/* Stats Section */}
                <div className={`flex items-center justify-between pt-4 ${
                  isDarkTheme ? 'border-t border-gray-800' : 'border-t'
                } mt-auto`}>
                  <div className={`text-2xl font-bold ${
                    isDarkTheme ? 'text-purple-400' : 'text-indigo-600'
                  }`}>
                    <CountUp 
                      end={parseInt(feature.stat)} 
                      suffix="+" 
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <span className={`text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {feature.statText}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeatureSection;