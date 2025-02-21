import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "..//../assets/login.svg";
import SocialLogin from "../../Components/SocileLogin";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useTheme } from "../../Provider/ThemeProvider";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const { isDarkTheme } = useTheme();
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signOutUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const from = location?.state || "/";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      // Firebase auth
      await signIn(email, password);

      // Get JWT and set cookie
      await axiosPublic.post(`/jwt`, { email }, { withCredentials: true });

      // Check user status with correct endpoint
      const userStatus = await axiosSecure.get(`/users/email/${email}`);

      if (userStatus.data?.fired) {
        // throw new Error("Your account has been terminated");
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Your account has been terminated",
        });

        return signOutUser();
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  const DEMO_USERS = {
    admin: {
      email: "admin@gmail.com",
      password: "Admin@2",
    },
    hr: {
      email: "hr530@gmail.com",
      password: "Hr@222",
    },
    employee: {
      email: "employee@gmail.com",
      password: "Employee@2",
    },
  };


  const handleDemoLogin = (role) => {
    setUserEmail(DEMO_USERS[role].email);
    const form = document.querySelector('form');
    form.email.value = DEMO_USERS[role].email;
    form.password.value = DEMO_USERS[role].password;
  };


  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 max-w-md mt-10 lg:mt-0"
          >
            <img
              src={loginImg}
              alt="Login illustration"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 max-w-md"
          >
            <div
              className={`rounded-2xl shadow-2xl p-5 md:p-8 ${
                isDarkTheme ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-3xl font-bold text-center mb-8 ${
                  isDarkTheme ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Welcome Back
              </h2>
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
  <button
    type="button"
    onClick={() => handleDemoLogin('admin')}
    className={`px-4 py-2 rounded-lg text-sm font-medium ${
      isDarkTheme
        ? 'bg-purple-600 hover:bg-purple-700 text-white'
        : 'bg-purple-500 hover:bg-purple-600 text-white'
    }`}
  >
    Admin Login
  </button>
  <button
    type="button"
    onClick={() => handleDemoLogin('hr')}
    className={`px-4 py-2 rounded-lg text-sm font-medium ${
      isDarkTheme
        ? 'bg-green-600 hover:bg-green-700 text-white'
        : 'bg-green-500 hover:bg-green-600 text-white'
    }`}
  >
   HR Login
  </button>
  <button
    type="button"
    onClick={() => handleDemoLogin('employee')}
    className={`px-4 py-2 rounded-lg text-sm font-medium ${
      isDarkTheme
        ? 'bg-orange-600 hover:bg-orange-700 text-white'
        : 'bg-orange-500 hover:bg-orange-600 text-white'
    }`}
  >
    Employee Login
  </button>
</div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${
                      isDarkTheme ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email
                  </label>
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      isDarkTheme ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <FaEnvelope className="text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full bg-transparent focus:outline-none ${
                        isDarkTheme
                          ? "placeholder-gray-500"
                          : "placeholder-gray-400"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className={`text-sm font-medium ${
                      isDarkTheme ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </label>
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      isDarkTheme ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <FaLock className="text-gray-500" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`w-full bg-transparent focus:outline-none ${
                        isDarkTheme
                          ? "placeholder-gray-500"
                          : "placeholder-gray-400"
                      }`}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <Link
                    className={`text-sm hover:underline ${
                      isDarkTheme ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isDarkTheme
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p
                  className={`text-sm ${
                    isDarkTheme ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  New Here?{" "}
                  <Link
                    to="/signup"
                    className={`font-medium hover:underline ${
                      isDarkTheme ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className={`w-full border-t ${
                        isDarkTheme ? "border-gray-700" : "border-gray-200"
                      }`}
                    ></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span
                      className={`px-2 ${
                        isDarkTheme
                          ? "bg-gray-800 text-gray-400"
                          : "bg-white text-gray-500"
                      }`}
                    >
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <SocialLogin />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
