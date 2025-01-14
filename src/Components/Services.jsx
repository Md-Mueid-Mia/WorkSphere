import React from 'react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Graphic Design",
      icon: "🎨",
      description: "Create stunning visuals that capture your brand's identity. From logos to social media posts, our designs are tailored to your needs.",
      cta: "Explore Designs"
    },
    {
      id: 2,
      title: "Web Design",
      icon: "💻",
      description: "Build responsive and user-friendly websites that engage your audience and drive conversions. Your dream website, designed to perfection.",
      cta: "Get Your Website"
    },
    {
      id: 3,
      title: "Digital Marketing",
      icon: "📈",
      description: "Boost your online presence with targeted marketing strategies, including SEO, PPC, email campaigns, and social media advertising.",
      cta: "Grow Your Business"
    },
    {
      id: 4,
      title: "Video Editing",
      icon: "🎬",
      description: "Transform your raw footage into professional-grade videos with seamless transitions, effects, and sound enhancements.",
      cta: "Edit My Videos"
    },
    {
      id: 5,
      title: "Content Writing",
      icon: "✍️",
      description: "High-quality content that captivates your audience. From blogs to product descriptions, we deliver impactful writing tailored to your goals.",
      cta: "Let’s Write"
    },
    {
      id: 7,
      title: "Branding & Identity",
      icon: "🏷️",
      description: "Build a powerful brand identity that resonates with your target audience. Logo design, color palettes, and brand guidelines are all included.",
      cta: "Create My Brand"
    },
    {
      id: 8,
      title: "UI/UX Design",
      icon: "🖌️",
      description: "Enhance user experiences with intuitive and visually appealing designs. Your product will be both functional and beautiful.",
      cta: "Improve My UX"
    },
    {
      id: 9,
      title: "Photography & Editing",
      icon: "📸",
      description: "Capture your best moments with professional photography and post-production editing for stunning results.",
      cta: "Book a Session"
    },
    {
      id: 10,
      title: "App Development",
      icon: "📲",
      description: "Build custom mobile applications for iOS and Android. We turn your innovative ideas into reality with seamless functionality.",
      cta: "Build My App"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-gray-400 text-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition-transform"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-white/90 mb-4">{service.description}</p>
            <button className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded hover:bg-indigo-200">
              {service.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
