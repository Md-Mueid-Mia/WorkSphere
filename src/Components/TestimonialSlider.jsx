import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Maria Kate",
    title: "Photographer",
    image: "https://ibb.co.com/F7YMQ66",
    text: "Maria was able to capture our moments beautifully. Her work exceeded our expectations, and we’ll cherish the memories forever.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    title: "Web Developer",
    image: "https://ibb.co.com/ZxKB3tY",
    text: "John created a user-friendly, visually appealing website for our business. The communication and quality were top-notch.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Smith",
    title: "Graphic Designer",
    image: "https://ibb.co.com/sRk7B7d",
    text: "Emily has a unique artistic sense. She delivered exceptional designs that fit perfectly with our branding vision.",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Johnson",
    title: "Content Writer",
    image: "https://ibb.co.com/0fpc1cx",
    text: "Michael provided engaging and error-free content for our blog. His attention to detail and creativity stood out.",
    rating: 4,
  },
  {
    id: 5,
    name: "Sarah Lee",
    title: "Digital Marketer",
    image: "https://ibb.co.com/qFfyGYh",
    text: "Sarah helped us increase our online presence significantly. Her marketing strategies brought measurable results in no time.",
    rating: 5,
  },
  {
    id: 6,
    name: "James Bond",
    title: "Fitness Coach",
    image: "https://ibb.co.com/DQqC7hV",
    text: "James motivated me to achieve my fitness goals. His personalized training sessions were fun and effective.",
    rating: 4,
  },
  {
    id: 8,
    name: "Daniel Green",
    title: "Software Engineer",
    image: "https://ibb.co.com/zs2CLr9",
    text: "Daniel delivered a robust and scalable solution for our application. His coding standards are impressive.",
    rating: 5,
  },
 
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div>
      <h2 className="py-5 text-3xl font-bold text-center">Testimonials</h2>
      <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative bg-white shadow-lg border rounded-lg p-8 text-center">
        <img
          src={testimonials[current]?.image}
          referrerPolicy="no-referrer"
          alt={testimonials[current].name}
          className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-200"
        />
        <h3 className="text-lg font-bold">{testimonials[current].name}</h3>
        <p className="text-sm text-gray-500">{testimonials[current].title}</p>
        <p className="mt-4 text-gray-700 italic">{`"${testimonials[current].text}"`}</p>
        <div className="mt-4">
          {"★".repeat(testimonials[current].rating)}
          {"☆".repeat(5 - testimonials[current].rating)}
        </div>
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <button
            onClick={handlePrev}
            className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full"
          >
            &#9664;
          </button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full"
          >
            &#9654;
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TestimonialSlider;
