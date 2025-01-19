import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const FeatureSection = () => {
  const features = [
    {
      title: 'AI-Driven Insights',
      description: 'Utilize machine learning to match candidates with roles that fit their skills and your needs.',
    },
    {
      title: 'Streamlined Processes',
      description: 'Automate repetitive tasks, reducing time-to-hire and ensuring efficiency.',
    },
    {
      title: 'Diverse Talent Pool',
      description: 'Access a broad network of qualified professionals across various industries.',
    },
    {
      title: 'Customizable Solutions',
      description: 'Tailor recruitment strategies to meet the unique demands of your business.',
    },
    {
      title: 'Actionable Analytics',
      description: 'Gain insights into recruitment performance to continuously improve your hiring process.',
    },
    {
      title: 'Enhanced Employer Branding',
      description: 'Showcase your company culture to attract the best talent.',
    },
  ];
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
          Why Choose Our Recruitment Solutions?
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover a seamless way to connect with the right talent through tailored, efficient, and innovative hiring solutions.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow px-3 py-6 text-center md:p-6 border border-transparent hover:border-blue-500"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto group-hover:bg-blue-600 group-hover:text-white">
              <FaCheckCircle className="w-8 h-8" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-blue-600">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-600 text-sm group-hover:text-gray-800">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};



export default FeatureSection;
