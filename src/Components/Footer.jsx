
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaArrowUp, FaInstagram, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../Provider/ThemeProvider';
import Swal from 'sweetalert2';

const Footer = () => {
  const {  isDarkTheme } = useTheme();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
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

  const footerLinks = [
    { 
      title: "Navigation", 
      links: [
        { name: "Home", path: "/" },
        { name: "Services", scroll: "services" },
        { name: "About Us", scroll: "about" },
        { name: "Why Choose Us", scroll: "Choose" },
        { name: "Contact Us", path: "/contact-us" }
      ]
    }
  ];

  const socialLinks = [
    { Icon: FaFacebook, href: "https://www.facebook.com", color: "hover:text-blue-500", label: "Facebook" },
    { Icon: FaTwitter, href: "https://x.com", color: "hover:text-blue-400", label: "Twitter" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com", color: "hover:text-blue-600", label: "LinkedIn" },
    { Icon: FaInstagram, href: "https://www.instagram.com", color: "hover:text-pink-500", label: "Instagram" },
    { Icon: FaGithub, href: "https://www.github.com", color: "hover:text-gray-300", label: "GitHub" }
  ];
  const handleSubscribe = () => {
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Subscribed successfully!",
      showConfirmButton: false,
      timer: 1500
    });
  }

  return (
    <div className="w-full">
   <footer className={`relative max-w-7xl mx-auto ${
        isDarkTheme  
          ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
      }`}>
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              className={`fill-current ${isDarkTheme  ? 'text-slate-800' : 'text-gray-100'} opacity-50`}
            />
          </svg>
        </div>

        <div className="w-full flex justify-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full  px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10"
          >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
              <Link to="/" className="inline-block">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-3"
                >
                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg">
                    <span className="text-white font-bold text-xl">WS</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                      WorkSphere
                    </h3>
                    <p className={`text-xs ${isDarkTheme  ? 'text-gray-400' : 'text-gray-600'}`}>
                      Connecting Talents
                    </p>
                  </div>
                </motion.div>
              </Link>
              <p className={`${isDarkTheme  ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed max-w-md mx-auto md:mx-0`}>
                Connecting talent with opportunity, building careers together. We're committed to helping professionals achieve their career goals through innovative solutions and personalized support.
              </p>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                {socialLinks.map(({ Icon, href, color, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} ${color} 
                      transition-all duration-300 hover:shadow-lg p-2 rounded-full
                      ${isDarkTheme  ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <h4 className={`text-lg font-semibold mb-6 ${
               isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Links
              </h4>
              <ul className="space-y-3 inline-block text-left">
                {footerLinks[0].links.map((link) => (
                  <li key={link.name}>
                    {link.scroll ? (
                      <button
                        onClick={() => scrollToSection(link.scroll)}
                        className={`group flex items-center gap-2 text-sm
                          ${isDarkTheme === 'dark' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-purple-600'}
                          transition-all duration-300`}
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all duration-300"/>
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        className={`group flex items-center gap-2 text-sm
                          ${isDarkTheme === 'dark' ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-purple-600'}
                          transition-all duration-300`}
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all duration-300"/>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <h4 className={`text-lg font-semibold mb-6 ${
               isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}>
                Contact Us
              </h4>
              <ul className="space-y-4 inline-block text-left">
                {[
                  { text: "1234 Career Street", icon: "🏢" },
                  { text: "New York, NY 10011", icon: "📍" },
                  { text: "(555) 123-4567", icon: "📞" },
                  { text: "info@worksphere.com", icon: "📧" }
                ].map((item, index) => (
                  <li key={index} className={`flex items-center gap-3 text-sm
                    ${isDarkTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <span className="text-base">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <h4 className={`text-lg font-semibold mb-6 ${
               isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}>
                Newsletter
              </h4>
              <form className="space-y-4 max-w-sm mx-auto md:mx-0">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-xl text-sm
                      ${isDarkTheme === 'dark' 
                        ? 'bg-gray-800/50 text-white focus:bg-gray-800' 
                        : 'bg-gray-100 text-gray-900 focus:bg-white'}
                      border border-transparent
                      focus:outline-none focus:ring-2 focus:ring-purple-500 
                      transition-all duration-300`}
                  />
                </div>
                <button onClick={handleSubscribe}
                  className="w-full px-6 py-3 text-sm font-medium text-white 
                    bg-gradient-to-r from-purple-600 to-blue-500 
                    rounded-xl hover:opacity-90 
                    transform transition-all duration-300 
                    hover:scale-[1.02] hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                    active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div 
            variants={itemVariants}
            className={`pt-8 mt-8 border-t 
              ${isDarkTheme === 'dark' ? 'border-gray-800' : 'border-gray-200'}
              text-center`}
          >
            <p className={`text-sm ${isDarkTheme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
              © {new Date().getFullYear()} Work Sphere. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-4 sm:right-8 p-3 
          bg-gradient-to-r from-purple-600 to-blue-500 
          text-white rounded-full shadow-lg 
          hover:shadow-purple-500/25 hover:shadow-xl 
          transition-all duration-300 z-50"
      >
        <FaArrowUp size={18} />
      </motion.button>
    </footer>
    </div>
  );
};

export default Footer;