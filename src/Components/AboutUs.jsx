

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '../Provider/ThemeProvider';

const AboutUs = () => {
  const { isDarkTheme } = useTheme();
  
  const stats = [
    { number: 1000, suffix: '+', label: 'Clients', icon: '👥' },
    { number: 95, suffix: '%', label: 'Success Rate', icon: '📈' },
    { number: 50, suffix: '+', label: 'Countries', icon: '🌍' },
    { number: 10, suffix: 'K+', label: 'Placements', icon: '🎯' }
  ];

  const values = [
    { 
      title: 'Innovation',
      icon: '💡',
      description: 'Pioneering cutting-edge solutions in recruitment technology.'
    },
    { 
      title: 'Excellence',
      icon: '⭐',
      description: 'Delivering outstanding results through dedication and expertise.'
    },
    { 
      title: 'Integrity',
      icon: '🤝',
      description: 'Maintaining the highest standards of professional ethics.'
    }
  ];

  return (
    <div id='about' className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`relative py-20 px-4 sm:px-6 lg:px-8 `}
      >
        <div className={`absolute inset-0 ${
          isDarkTheme 
            ? 'bg-grid-white/[0.02]'
            : 'bg-grid-black/[0.02]'
        } bg-[size:20px_20px]`} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className={`inline-block text-sm font-semibold tracking-wider mb-2 ${
                  isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  ABOUT US
                </span>
                <h1 className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400'
                    : 'bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700'
                }`}>
                  Transforming Recruitment Solutions
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}
              >
                We leverage cutting-edge technology and human expertise to revolutionize the recruitment landscape. Our AI-powered solutions and dedicated team ensure precise matches between talent and opportunities.
              </motion.p>

              {/* Features Grid */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
              >
                {['AI-Powered Matching', 'Global Reach', 'Industry Expertise', 'Data-Driven Insights'].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center space-x-2 p-3 rounded-lg ${
                      isDarkTheme
                        ? 'bg-white/5 hover:bg-white/10'
                        : 'bg-purple-50 hover:bg-purple-100'
                    } transition-colors duration-300`}
                  >
                    <svg className={`w-5 h-5 ${
                      isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                    }`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Stats */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className={`p-4 md:p-6 rounded-lg backdrop-blur-sm ${
                    isDarkTheme
                      ? 'bg-white/5 border border-white/10'
                      : 'bg-white/70 border border-purple-100 shadow-lg'
                  }`}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className={`text-3xl font-bold ${
                    isDarkTheme ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    <CountUp end={stat.number} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className={`text-sm mt-2 ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 `}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-12 ${
            isDarkTheme ? 'text-white' : 'text-gray-900'
          }`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-lg ${
                  isDarkTheme
                    ? 'bg-gray-900/50 border border-purple-900/50'
                    : 'bg-white shadow-xl'
                }`}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkTheme ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>
                <p className={
                  isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                }>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;