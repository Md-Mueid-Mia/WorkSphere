import { motion } from "framer-motion";
import { useTheme } from "../Provider/ThemeProvider";

const CallToAction = () => {
  const { isDarkTheme } = useTheme();

  const stats = [
    { title: "100K+", subtitle: "Active Freelancers", icon: "👨‍💻" },
    { title: "50K+", subtitle: "Companies Hiring", icon: "🏢" },
    { title: "$10M+", subtitle: "Paid to Freelancers", icon: "💰" },
  ];

  return (
    <section
      className={`w-full py-20 ${isDarkTheme ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`rounded-3xl ${
            isDarkTheme
              ? "bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-blue-500/10"
              : "bg-gradient-to-br from-white to-gray-50 shadow-gray-200/60"
          } shadow-xl p-8 md:p-12 lg:p-16`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}
              >
                Find Your Next 
                <span className="text-blue-600"> Remote Opportunity</span>
              </motion.h2>
              <p
                className={`text-xl md:text-2xl leading-relaxed ${
                  isDarkTheme ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Connect with top companies worldwide. Work remotely, earn globally. 
                Join WorkSphere's marketplace of skilled professionals and innovative businesses.
              </p>
              <div className="flex flex-wrap gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-blue-500/50"
                >
                  Find Work
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-xl ${
                    isDarkTheme
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  } font-semibold transition-all shadow-lg`}
                >
                  Hire Talent
                </motion.button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="https://i.ibb.co.com/tprFPrcr/remot-work.webp"
                alt="Remote Work Illustration"
                className="w-full h-auto max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -z-10 top-10 right-10 w-full h-full bg-blue-500/10 rounded-2xl"></div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-center p-8 rounded-2xl ${
                  isDarkTheme 
                    ? "bg-gray-800 hover:bg-gray-700" 
                    : "bg-white hover:bg-gray-50"
                } transition-all shadow-lg hover:shadow-xl`}
              >
                <span className="text-4xl mb-4 block">{stat.icon}</span>
                <h3 className={`text-4xl font-bold mb-2 ${
                  isDarkTheme ? "text-white" : "text-gray-900"
                }`}>
                  {stat.title}
                </h3>
                <p className={`text-lg ${
                  isDarkTheme ? "text-gray-300" : "text-gray-600"
                }`}>
                  {stat.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;