import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaCog, FaChartLine, FaBriefcase, FaHandshake } from 'react-icons/fa';
import CountUp from 'react-countup';

const FeatureSection = () => {
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
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Why Choose Our Recruitment Solutions?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Discover a seamless way to connect with the right talent through our innovative solutions
          </motion.p>
        </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <div className="relative bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="text-3xl text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t mt-auto">
                  <div className="text-2xl font-bold text-indigo-600">
                    <CountUp end={parseInt(feature.stat)} suffix="+" duration={2.5} />
                  </div>
                  <span className="text-sm text-gray-500">{feature.statText}</span>
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