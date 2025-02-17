import { motion } from 'framer-motion';
import { useTheme } from '../Provider/ThemeProvider';
import { FaGlobe, FaHandshake, FaChartLine, FaCertificate } from 'react-icons/fa';
const Partners = () => {
  const { isDarkTheme } = useTheme();

  const partners = [
    {
      name: 'Google',
      logo: 'https://i.ibb.co/5GLx1Nz/google.png',
      description: 'Tech Giant'
    },
    {
      name: 'Microsoft',
      logo: 'https://i.ibb.co/B2yQVJx/microsoft.png',
      description: 'Software Leader'
    },
    {
      name: 'Amazon',
      logo: 'https://i.ibb.co/hfyv9HY/amazon.png',
      description: 'E-commerce Pioneer'
    },
    {
      name: 'Apple',
      logo: 'https://i.ibb.co/C2B7Q3n/apple.png',
      description: 'Innovation Leader'
    },
    {
      name: 'Meta',
      logo: 'https://i.ibb.co/K7vS1Tn/meta.png',
      description: 'Social Media Giant'
    },
    {
      name: 'Tesla',
      logo: 'https://i.ibb.co/VqGPVx8/tesla.png',
      description: 'EV Pioneer'
    },
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
  return (
    <section className={`relative py-24 px-4 overflow-hidden transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950' 
        : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isDarkTheme ? 'bg-white/5' : 'bg-purple-500/5'
            }`}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span 
            className={`inline-block text-sm font-semibold tracking-wider mb-4 px-4 py-2 rounded-full ${
              isDarkTheme 
                ? 'bg-white/5 text-purple-400' 
                : 'bg-purple-100 text-purple-600'
            }`}
          >
            TRUSTED PARTNERSHIPS
          </motion.span>
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent 
            ${isDarkTheme
              ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400'
              : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600'
            }`}
          >
            Powering Global Innovation
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Collaborating with industry leaders to shape the future of recruitment
          </p>
        </motion.div>

        {/* Partner Logos with Enhanced Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              whileHover={{ 
                scale: 1.05,
                boxShadow: isDarkTheme 
                  ? '0 0 20px rgba(139, 92, 246, 0.1)' 
                  : '0 0 20px rgba(147, 51, 234, 0.1)'
              }}
              className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl backdrop-blur-sm
                ${isDarkTheme
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                  : 'bg-white/70 hover:bg-white border border-purple-100'
                } transition-all duration-500`}
            >
              <div className={`relative w-24 h-24 p-4 rounded-xl mb-4 
                ${isDarkTheme ? 'bg-white/10' : 'bg-white'}
                group-hover:shadow-lg transition-all duration-300`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    isDarkTheme ? 'filter brightness-0 invert' : ''
                  }`}
                />
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                  ${isDarkTheme 
                    ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10' 
                    : 'bg-gradient-to-br from-purple-500/5 to-blue-500/5'
                  } transition-opacity duration-300`}
                />
              </div>
              <h3 className={`text-lg font-semibold mb-1 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
              }`}>
                {partner.name}
              </h3>
              <p className={`text-sm ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {partner.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: <FaGlobe />, value: '500+', label: 'Global Partners' },
            { icon: <FaHandshake />, value: '50+', label: 'Countries Served' },
            { icon: <FaChartLine />, value: '10+ Years', label: 'Industry Experience' },
            { icon: <FaCertificate />, value: '97%', label: 'Success Rate' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`relative overflow-hidden p-8 rounded-2xl ${
                isDarkTheme
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white/70 border border-purple-100 shadow-lg'
              }`}
            >
              <div className={`text-3xl mb-4 ${
                isDarkTheme ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {stat.icon}
              </div>
              <h3 className={`text-4xl font-bold mb-2 bg-clip-text text-transparent 
                ${isDarkTheme
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600'
                }`}>
                {stat.value}
              </h3>
              <p className={`text-sm font-medium ${
                isDarkTheme ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </p>
              <div className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full blur-3xl 
                ${isDarkTheme
                  ? 'bg-purple-500/10'
                  : 'bg-purple-500/5'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;