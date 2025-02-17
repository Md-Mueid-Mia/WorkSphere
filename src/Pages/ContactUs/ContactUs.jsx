// import React from "react";
// import { useForm } from "react-hook-form";
// import message from '../../assets/Message.svg'
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import Swal from "sweetalert2";
// import useAuth from "../../Hooks/useAuth";

// const ContactUs = () => {
//   const {user} = useAuth()
//     const axiosPublic = useAxiosPublic()
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitSuccessful },
//   } = useForm();

//   const onSubmit = async(data) => {
//     // console.log("Form Submitted: ", data);
//     // Handle the form data submission to the backend here
//     await axiosPublic.post('/messages', data)
//     .then(res=>{
//         // console.log('data submitted');
//         // swal alert for success to send message
//         Swal.fire({
//             position: "center",
//             icon: "success",
//             title: "Your Message has been sent",
//             showConfirmButton: false,
//             timer: 1500
//         })
//         // reset the form after successful submission
//         reset();
//     })
//   };

//   return (
//     <div className=" px-4 py-20 bg-gray-100">
//       <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
//       <div className=" from-blue-50 via-white to-blue-100 shadow-lg rounded-lg w-full px-3 py-6 md:p-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div>
//             <img src={message} alt="" />
//           </div>
//           <div className="flex flex-col justify-center">
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold">Our Address</h2>
//               <p className="text-gray-600">
//                 Work Sphere Company, 1234 Innovation Street, Tech City, TC 56789
//               </p>
//             </div>
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="space-y-4"
//               noValidate
//             >
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   {...register("name", {
//                     required: "name is required",
//                     pattern: {
//                       message: "Enter a valid name address",
//                     },
//                   })}
//                   placeholder="Enter your name"
//                   defaultValue={user?.displayName}
//                   className={`w-full px-4 py-2 border ${
//                     errors.email
//                       ? "border-red-500 focus:ring-red-500"
//                       : "border-gray-300 focus:ring-blue-500"
//                   } rounded-lg focus:outline-none`}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.name.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value:
//                         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                       message: "Enter a valid email address",
//                     },
//                   })}
//                   defaultValue={user?.email}
//                   placeholder="Enter your email"
//                   className={`w-full px-4 py-2 border ${
//                     errors.email
//                       ? "border-red-500 focus:ring-red-500"
//                       : "border-gray-300 focus:ring-blue-500"
//                   } rounded-lg focus:outline-none`}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Message
//                 </label>
//                 <textarea
//                   {...register("message", {
//                     required: "Message is required",
//                     minLength: {
//                       value: 10,
//                       message: "Message must be at least 10 characters",
//                     },
//                   })}
//                   placeholder="Type your message"
//                   rows="8"
//                   className={`w-full px-4 py-2 border ${
//                     errors.message
//                       ? "border-red-500 focus:ring-red-500"
//                       : "border-gray-300 focus:ring-blue-500"
//                   } rounded-lg focus:outline-none`}
//                 ></textarea>
//                 {errors.message && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.message.message}
//                   </p>
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//               >
//                 Submit
//               </button>
//             </form>
//             {isSubmitSuccessful && (
//               <p className="mt-4 text-green-600">Thank you for your message!</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;


import React from "react";
import { useForm } from "react-hook-form";
import message from '../../assets/Message.svg';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useTheme } from "../../Provider/ThemeProvider";
import { motion } from "framer-motion";

const ContactUs = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { isDarkTheme } = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async(data) => {
        await axiosPublic.post('/messages', data)
        .then(res=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Message has been sent",
                showConfirmButton: false,
                timer: 1500
            })
            reset();
        })
      };
  return (
    <div className={`min-h-screen px-4 mt-10 py-20 transition-colors duration-300 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950' 
        : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'
    }`}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent
          ${isDarkTheme
            ? 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400'
            : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600'
          }`}
      >
        Get in Touch
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-6xl mx-auto rounded-2xl backdrop-blur-lg ${
          isDarkTheme
            ? 'bg-white/5 border border-white/10'
            : 'bg-white/30 border border-white/20'
        } shadow-lg p-6 md:p-12`}
      >
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Image and Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="relative">
              <img src={message} alt="Contact" className="w-full" />
              <div className={`absolute inset-0 rounded-lg ${
                isDarkTheme ? 'bg-gradient-to-tr from-purple-500/20 to-transparent' : ''
              }`} />
            </div>

            <div className={`space-y-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              <div>
                <h2 className={`text-xl font-semibold mb-2 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>Our Address</h2>
                <p>Work Sphere Company, 1234 Innovation Street, Tech City, TC 56789</p>
              </div>
              <div>
                <h2 className={`text-xl font-semibold mb-2 ${
                  isDarkTheme ? 'text-white' : 'text-gray-800'
                }`}>Contact Info</h2>
                <p>Email: contact@worksphere.com</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {/* Form fields */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  defaultValue={user?.displayName}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                    isDarkTheme
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                      : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : isDarkTheme
                        ? 'focus:ring-purple-500'
                        : 'focus:ring-blue-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email field - similar styling as name field */}
              {/* ... */}

              {/* Message field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  placeholder="Type your message"
                  rows="8"
                  className={`w-full px-4 py-3 rounded-lg transition-colors duration-300 ${
                    isDarkTheme
                      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                      : 'bg-white/70 border-gray-200 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : isDarkTheme
                        ? 'focus:ring-purple-500'
                        : 'focus:ring-blue-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600'
                    : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700'
                } text-white shadow-lg hover:shadow-xl`}
              >
                Send Message
              </motion.button>
            </form>

            {isSubmitSuccessful && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-green-500 text-center"
              >
                Thank you for your message!
              </motion.p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;