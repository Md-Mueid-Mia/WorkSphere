import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "..//../assets/login.svg";
import SocialLogin from "../../Components/SocileLogin";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
const axiosSecure = useAxiosSecure()
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
              await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                { email },
                { withCredentials: true }
              );
          
              // Check user status with correct endpoint
              const userStatus = await axiosSecure.get(`/users/email/${email}`);
              
              if (userStatus.data?.fired) {
                throw new Error("Your account has been terminated");
              }
          
              Swal.fire({
                icon: "success",
                title: "Login Successful",
                timer: 1500,
                showConfirmButton: false
              });
          
              navigate(from, { replace: true });
          
            } catch (error) {
              console.error('Login error:', error);
              Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message
              });
            }
          };
  return (
    <>
      <div className="hero pt-20 md:pt-0 min-h-screen bg-base-200 ">
        <div className="hero-content flex-col  md:flex-row-reverse overflow-hidden">
          <div className="text-center md:w-1/2 lg:text-left">
            <img src={loginImg} alt="" />
          </div>
          <div className="card w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="text-center">
              <small>
                New Here? <Link to="/signup" className="text-orange-400">Create an account</Link>
              </small>
            </p>
            <p className="text-center pb-2">Or sign In with</p>
            <div className="divider"></div>
            <div className="pb-4">
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
