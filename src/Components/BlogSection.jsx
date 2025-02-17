import { motion } from 'framer-motion';
import { useTheme } from '../Provider/ThemeProvider';
import { FaCalendar, FaUser, FaArrowRight } from 'react-icons/fa';

const BlogSection = () => {
  const { isDarkTheme } = useTheme();

  const blogs = [
    {
      id: 1,
      title: "The Future of AI in Recruitment",
      excerpt: "Discover how artificial intelligence is revolutionizing the hiring process and what it means for recruiters.",
      author: "Sarah Johnson",
      date: "Feb 15, 2024",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
      category: "Technology"
    },
    {
      id: 2,
      title: "Remote Work Hiring Strategies",
      excerpt: "Learn effective strategies for building and managing remote teams in the post-pandemic era.",
      author: "Michael Chen",
      date: "Feb 12, 2024",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
      category: "Management"
    },
    {
      id: 3,
      title: "Diversity in Tech Recruitment",
      excerpt: "Best practices for creating inclusive hiring processes and building diverse tech teams.",
      author: "Emma Wilson",
      date: "Feb 10, 2024",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
      category: "DEI"
    }
  ];

  return (
    <section className={`py-24 px-4 transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950' 
        : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'
    }`}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            className={`inline-block text-sm font-semibold tracking-wider mb-4 px-4 py-2 rounded-full ${
              isDarkTheme 
                ? 'bg-white/5 text-purple-400' 
                : 'bg-purple-100 text-purple-600'
            }`}
          >
            LATEST INSIGHTS
          </motion.span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent 
            ${isDarkTheme
              ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400'
              : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600'
            }`}
          >
            Recruitment Blog
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Stay updated with the latest trends and insights in recruitment
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group rounded-2xl overflow-hidden ${
                isDarkTheme
                  ? 'bg-white/5 hover:bg-white/10'
                  : 'bg-white hover:shadow-xl'
              } transition-all duration-300`}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 ${
                  isDarkTheme 
                    ? 'bg-gradient-to-t from-gray-900/80 to-transparent' 
                    : 'bg-gradient-to-t from-black/50 to-transparent'
                }`} />
                <span className={`absolute bottom-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${
                  isDarkTheme
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'bg-purple-100 text-purple-600'
                }`}>
                  {blog.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>
                  {blog.title}
                </h3>
                <p className={`mb-4 ${
                  isDarkTheme ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {blog.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center space-x-4 text-sm ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span className="flex items-center">
                      <FaUser className="mr-2" />
                      {blog.author}
                    </span>
                    <span className="flex items-center">
                      <FaCalendar className="mr-2" />
                      {blog.date}
                    </span>
                  </div>
                </div>

                {/* Read More Link */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`mt-6 flex items-center text-sm font-semibold ${
                    isDarkTheme
                      ? 'text-purple-400 hover:text-purple-300'
                      : 'text-purple-600 hover:text-purple-700'
                  }`}
                >
                  Read More
                  <FaArrowRight className="ml-2" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-lg font-semibold ${
              isDarkTheme
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            } text-white shadow-lg`}
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;