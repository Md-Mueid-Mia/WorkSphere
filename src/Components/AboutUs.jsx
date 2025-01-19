import React from 'react';

const AboutUs = () => {
    return (
        <div>
            <div className="bg-teal-900 text-white py-12 px-6 sm:px-16 md:flex items-center gap-10">
 
  <div className="md:w-1/2 space-y-6">
    <p className="text-sm uppercase tracking-wide font-semibold">// About Us</p>
    <h2 className="text-3xl sm:text-4xl font-bold">Recruitment Solutions</h2>
    <p className="text-sm sm:text-base">
    Recruitment solutions streamline the process of attracting, screening, and hiring top talent for businesses across industries. By leveraging advanced technologies such as AI-powered applicant tracking systems, data-driven insights, and tailored outreach strategies, these solutions enhance efficiency and precision in candidate selection.</p>

    
    <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="w-5 h-5 text-green-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Social Marketing
      </p>
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="w-5 h-5 text-green-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Marketing Growth
      </p>
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="w-5 h-5 text-green-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Document Management
      </p>
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="w-5 h-5 text-green-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Corrective Action Plan
      </p>
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="w-5 h-5 text-green-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        HR Compliance Audit
      </p>
      <p className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          className="w-5 h-5 text-green-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Unlimited Project
      </p>
    </div>

    
    <button
      className="flex items-center gap-2 bg-neutral hover:bg-slate-500 px-4 py-2 rounded-lg font-semibold  transition"
    >
      View More
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  
  <div className="md:w-1/2 mt-8 md:mt-0">
    <img
      src="https://i.ibb.co.com/gjQ6jsx/1597252978-Getty-Images-1157948456.jpg" 
      alt="Recruitment Solutions"
      className="rounded-lg shadow-lg"
    />
  </div>
</div>

        </div>
    );
};

export default AboutUs;