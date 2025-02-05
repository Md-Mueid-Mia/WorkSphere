import { motion } from 'framer-motion';
import CountUp from 'react-countup';

const AboutUs = () => {
  const stats = [
    { number: 1000, suffix: '+', label: 'Clients' },
    { number: 95, suffix: '%', label: 'Success Rate' },
    { number: 50, suffix: '+', label: 'Countries' },
    { number: 10, suffix: 'K+', label: 'Placements' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-teal-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="max-w-7xl mx-auto">
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
                <span className="inline-block text-teal-400 text-sm font-semibold tracking-wider mb-2">
                  ABOUT US
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-200">
                  Transforming Recruitment Solutions
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                We leverage cutting-edge technology and human expertise to revolutionize the recruitment landscape. Our AI-powered solutions and dedicated team ensure precise matches between talent and opportunities.
              </motion.p>

              {/* Features Grid */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-6 mt-8"
              >
                {['AI-Powered Matching', 'Global Reach', 'Industry Expertise', 'Data-Driven Insights'].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
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
                  className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg"
                >
                  <div className="text-3xl font-bold text-teal-400">
                    <CountUp end={stat.number} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className="text-sm text-gray-300 mt-2">{stat.label}</div>
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Innovation', 'Excellence', 'Integrity'].map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-lg shadow-xl"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;