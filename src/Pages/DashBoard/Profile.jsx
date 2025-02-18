import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiCalendar, FiBriefcase, FiAward, FiGithub, FiLinkedin } from 'react-icons/fi';
import useAuth from '../../Hooks/useAuth';
import { useTheme } from '../../Provider/ThemeProvider';

const Profile = () => {
  const { user } = useAuth();
  const { isDarkTheme } = useTheme();

  return (
    <div className={`min-h-screen p-4 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className={`relative ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-3 md:p-6 transform hover:scale-105 transition-transform duration-300`}>
            <div className="absolute top-0 right-0 left-0 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-2xl"></div>
            <div className="relative flex flex-col items-center">
              <img 
                src={user?.photoURL || 'https://placeholder.com/150'} 
                alt={user?.displayName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover z-10 mt-10"
              />
              <h2 className="mt-4 text-2xl font-bold">{user?.displayName}</h2>
              <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} font-medium`}>Senior Software Engineer</p>
              
              {/* Social Links */}
              <div className="flex gap-4 mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                  <FiGithub size={24} />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                  <FiLinkedin size={24} />
                </a>
              </div>
              
              <div className="w-full mt-6 space-y-4">
                <div className={`flex items-center gap-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500 transition-colors`}>
                  {/* <FiMail className="w-5 h-5" /> */}
                  <span>{user?.email}</span>
                </div>
                <div className={`flex items-center gap-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500 transition-colors`}>
                  {/* <FiPhone className="w-5 h-5" /> */}
                  <span>+1 234 567 890</span>
                </div>
                <div className={`flex items-center gap-3 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500 transition-colors`}>
                  {/* <FiMapPin className="w-5 h-5" /> */}
                  <span>New York, USA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className={`mt-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6`}>
            <h3 className="text-lg font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-center gap-2 mb-6">
              <FiCalendar className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard label="Full Name" value={user?.displayName} />
              <InfoCard label="Email" value={user?.email} />
              <InfoCard label="Phone" value="+1 234 567 890" />
              <InfoCard label="Address" value="123 Main St, New York, NY" />
            </div>
          </div>

          {/* Work Information */}
          <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-center gap-2 mb-6">
              <FiBriefcase className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold">Work Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard label="Department" value="Engineering" />
              <InfoCard label="Position" value="Senior Software Engineer" />
              <InfoCard label="Employee ID" value="EMP001" />
              <InfoCard label="Join Date" value="01/01/2023" />
            </div>
          </div>

          {/* Achievements */}
          <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 transform hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-center gap-2 mb-6">
              <FiAward className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold">Achievements</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AchievementCard 
                title="Employee of the Month"
                description="Awarded for exceptional performance"
                date="March 2024"
              />
              <AchievementCard 
                title="Best Team Player"
                description="Recognition for collaborative spirit"
                date="December 2023"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="group">
    <label className="text-sm text-gray-500">{label}</label>
    <p className="font-medium group-hover:text-blue-500 transition-colors">{value}</p>
  </div>
);

const AchievementCard = ({ title, description, date }) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
    <h4 className="font-semibold text-lg">{title}</h4>
    <p className="text-gray-500 text-sm">{description}</p>
    <p className="text-blue-500 text-sm mt-2">{date}</p>
  </div>
);

export default Profile;