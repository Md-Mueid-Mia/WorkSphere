// import { motion } from 'framer-motion';
// import { FaFacebook, FaTwitter, FaLinkedin, FaArrowUp } from 'react-icons/fa';

// const Footer = () => {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { duration: 0.5 }
//     }
//   };

//   return (
//     <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
//       {/* Wave Animation */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden">
//         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
//           <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
//                 className="fill-current text-gray-900 opacity-20"></path>
//         </svg>
//       </div>

//       <motion.div 
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-7xl mx-auto px-4 pt-20 pb-12"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {/* Company Info */}
//           <motion.div variants={itemVariants} className="space-y-4">
//             <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Work Sphere
//             </h3>
//             <p className="text-gray-400 pr-4">
//               Connecting talent with opportunity, building careers together.
//             </p>
//             <div className="flex space-x-4">
//               {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
//                 <motion.a
//                   key={index}
//                   href="#"
//                   whileHover={{ scale: 1.2, y: -2 }}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   <Icon size={24} />
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>

//           {/* Quick Links */}
//           <motion.div variants={itemVariants}>
//             <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               {['About', 'Careers', 'Services', 'Blog'].map((item, index) => (
//                 <li key={index}>
//                   <a href="#" 
//                      className="text-gray-400 hover:text-white transition-all hover:pl-2 duration-300 block">
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* Contact Info */}
//           <motion.div variants={itemVariants}>
//             <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
//             <ul className="space-y-2 text-gray-400">
//               <li>1234 Career Street</li>
//               <li>New York, NY 10011</li>
//               <li>Phone: (555) 123-4567</li>
//               <li>Email: info@worksphere.com</li>
//             </ul>
//           </motion.div>

//           {/* Newsletter */}
//           <motion.div variants={itemVariants}>
//             <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
//             <form className="space-y-4">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />
//               <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105">
//                 Subscribe
//               </button>
//             </form>
//           </motion.div>
//         </div>

//         {/* Copyright */}
//         <motion.div 
//           variants={itemVariants}
//           className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400"
//         >
//           <p>© 2024 Work Sphere. All rights reserved.</p>
//         </motion.div>
//       </motion.div>

//       {/* Back to Top Button */}
//       <motion.button
//         onClick={scrollToTop}
//         whileHover={{ scale: 1.1 }}
//         className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
//       >
//         <FaArrowUp />
//       </motion.button>
//     </footer>
//   );
// };

// export default Footer;

import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaArrowUp, FaInstagram, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../Provider/ThemeProvider';

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
    { Icon: FaFacebook, href: "#", color: "hover:text-blue-500", label: "Facebook" },
    { Icon: FaTwitter, href: "#", color: "hover:text-blue-400", label: "Twitter" },
    { Icon: FaLinkedin, href: "#", color: "hover:text-blue-600", label: "LinkedIn" },
    { Icon: FaInstagram, href: "#", color: "hover:text-pink-500", label: "Instagram" },
    { Icon: FaGithub, href: "#", color: "hover:text-gray-300", label: "GitHub" }
  ];

  return (
    <div className="w-full">
   <footer className={`relative ${
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
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10"
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
                          ${isDarkTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                          transition-all duration-300`}
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 transition-all duration-300"/>
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        className={`group flex items-center gap-2 text-sm
                          ${isDarkTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
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
                    ${isDarkTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
                <button 
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
            <p className={`text-sm ${isDarkTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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