import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Wave Animation */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-current text-gray-900 opacity-20"></path>
        </svg>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 pt-20 pb-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Work Sphere
            </h3>
            <p className="text-gray-400 pr-4">
              Connecting talent with opportunity, building careers together.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Services', 'Blog'].map((item, index) => (
                <li key={index}>
                  <a href="#" 
                     className="text-gray-400 hover:text-white transition-all hover:pl-2 duration-300 block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>1234 Career Street</li>
              <li>New York, NY 10011</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@worksphere.com</li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>© 2024 Work Sphere. All rights reserved.</p>
        </motion.div>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
      >
        <FaArrowUp />
      </motion.button>
    </footer>
  );
};

export default Footer;