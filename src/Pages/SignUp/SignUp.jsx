import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/signup.svg";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "./../../Components/SocileLogin";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useTheme } from "../../Provider/ThemeProvider";



import { FaUser, FaEnvelope, FaLock, FaBuilding, FaMoneyBill, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";
const SignUp = () => {
   const { isDarkTheme } = useTheme();
  const { createUser, updateUserProfile, setLoading, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // console.log(user);

  const onSubmit = async (data) => {
    
    const {
      email,
      Name,
      password,
      role,
      bank_account_no,
      salary,
      designation,
    } = data;
    // console.log(data.image[0]);
    // console.log(data);
    // Add loading state
    setLoading(true);

    try {
      const passwordValidation =
        password.length >= 6 &&
        /[A-Z]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!passwordValidation) {
        return toast.error(
          "Password must be 6 characters, include a capital letter, and a special character."
        );
      }
      // Upload photo to imgbb
      if (data.image[0]) {
        const photoData = new FormData();
        photoData.append("image", data.image[0]);

        // console.log("Uploading photo to ImgBB...");

        const imgbbResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          photoData
        );

        const photo = imgbbResponse.data.data.display_url;
        // console.log("Photo uploaded to ImgBB:", photo);

        if (!imgbbResponse.data.success) {
          throw new Error("Failed to upload image to ImgBB");
        }

        // Rest of the authentication code...
        const userCredential = await createUser(email, password);
        const user = userCredential.user;

        updateUserProfile(Name, photo).then((res) => {
          const userInfo = {
            email: email,
            Name: Name,
            password: password,
            role: role,
            bank_account_no: bank_account_no,
            salary: Number(salary),
            designation: designation,
            photo: photo,
            isVerified: false,
            firebaseUID: user?.uid
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User Successfully SignUp",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate("/");
          });
        });
      } else {
        toast.error("Please select a photo");
        return;
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "Failed to register",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Work Sphere | Sign Up</title>
      </Helmet>
      
      <div className={`min-h-screen py-10 ${
        isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2 max-w-md mt-10 lg:mt-0"
            >
              <img src={img} alt="Sign up illustration" className="w-full h-auto drop-shadow-2xl" />
            </motion.div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2 max-w-2xl"
            >
              <div className={`rounded-2xl shadow-2xl p-5 md:p-8 ${
                isDarkTheme ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Full Name
                    </label>
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${
                      isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <FaUser className="text-gray-500" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        {...register("Name", { required: "Name is required" })}
                        className={`w-full bg-transparent focus:outline-none ${
                          isDarkTheme ? 'placeholder-gray-500' : 'placeholder-gray-400'
                        }`}
                      />
                    </div>
                    {errors.Name && (
                      <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
                    )}
                  </div>

                  {/* Bank Account and Salary Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${
                        isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Bank Account
                      </label>
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${
                        isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <FaCreditCard className="text-gray-500" />
                        <input
                          type="text"
                          placeholder="Account number"
                          {...register("bank_account_no", { required: true })}
                          className={`w-full bg-transparent focus:outline-none ${
                            isDarkTheme ? 'placeholder-gray-500' : 'placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${
                        isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Salary
                      </label>
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${
                        isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <FaMoneyBill className="text-gray-500" />
                        <input
                          type="number"
                          placeholder="Expected salary"
                          {...register("salary", { required: true })}
                          className={`w-full bg-transparent focus:outline-none ${
                            isDarkTheme ? 'placeholder-gray-500' : 'placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role and Designation Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${
                        isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Role
                      </label>
                      <select
                        {...register("role", { required: true })}
                        className={`w-full p-3 rounded-lg ${
                          isDarkTheme 
                            ? 'bg-gray-700 text-gray-100' 
                            : 'bg-gray-100 text-gray-900'
                        } focus:outline-none`}
                      >
                        <option value="">Select Role</option>
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${
                        isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Designation
                      </label>
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${
                        isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <FaBuilding className="text-gray-500" />
                        <input
                          type="text"
                          placeholder="Your designation"
                          {...register("designation", { required: true })}
                          className={`w-full bg-transparent focus:outline-none ${
                            isDarkTheme ? 'placeholder-gray-500' : 'placeholder-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkTheme ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      {...register("image", { required: true })}
                      className={`w-full p-3 rounded-lg ${
                        isDarkTheme 
                          ? 'bg-gray-700 text-gray-100 file:bg-gray-600 file:text-gray-100' 
                          : 'bg-gray-100 text-gray-900 file:bg-gray-200 file:text-gray-700'
                      } file:border-0 file:p-2 file:rounded-md file:mr-4 file:cursor-pointer`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      isDarkTheme 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    Create Account
                  </button>

                  <div className="text-center">
                    <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>
                      Already have an account?{' '}
                      <Link 
                        to="/login"
                        className={`font-medium hover:underline ${
                          isDarkTheme ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className={`w-full border-t ${
                        isDarkTheme ? 'border-gray-700' : 'border-gray-200'
                      }`}></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className={`px-2 ${
                        isDarkTheme ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
                      }`}>
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <SocialLogin />
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
