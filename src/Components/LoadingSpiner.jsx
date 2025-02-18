const LoadingSpinner = ({ variant = "default" }) => {
  const spinnerVariants = {
    default: (
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-300 border-l-blue-300 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-purple-500 border-r-purple-500 border-b-purple-300 border-l-purple-300 rounded-full animate-spin-reverse"></div>
        <div className="absolute inset-4 border-4 border-t-pink-500 border-r-pink-500 border-b-pink-300 border-l-pink-300 rounded-full animate-spin"></div>
      </div>
    ),
    pulse: (
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse-delay"
            style={{ animationDelay: `${i * 0.15}s` }}
          ></div>
        ))}
      </div>
    ),
    dots: (
      <div className="flex space-x-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-blue-500 rounded-full animate-bounce-delay"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    )
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-305px)]">
      <div
        aria-label="Loading..."
        role="status"
        className="flex flex-col items-center space-y-4"
      >
        {spinnerVariants[variant]}
        <span className="text-2xl font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;