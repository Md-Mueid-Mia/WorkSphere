import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/signup.svg";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "./../../Components/SocileLogin";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form data
    createUser(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        if (res?.user?.email) {
          updateUserProfile(data.Name, data.photoURL)
            .then((res) => {
              const userInfo = {
                name: data.Name,
                email: data.email,
                photoURL: data.photoURL,
                role: data?.role
              };
              // axiosPublic.post('/users', userInfo )
              // .then(res => {
              //   console.log("User profile updated",);
              // reset()
              // navigate('/')
              // })
            })
            .catch((err) => console.log(err));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User SignUp Successful.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/');
        }

        // console.log(user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Bistro Boss || SignUp</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col md:flex-row">
          <div className="text-center md:w-1/2 lg:text-left">
            <img src={img} alt="" />
          </div>
          <div className="card md:w-1/2 max-w-sm shrink-0 shadow-2xl">
            {/* Use handleSubmit from react-hook-form */}
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h1 className="text-5xl font-bold">Sign-Up now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("Name", { required: "Name is required" })}
                  className="input input-bordered"
                />
                {errors.Name && (
                  <p className="text-red-500 text-sm">{errors.Name.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="url"
                  placeholder="Photo URL"
                  name="photoURL"
                  {...register("photoURL", {
                    required: "photoURL is required",
                  })}
                  className="input input-bordered"
                />
                {errors.Name && (
                  <p className="text-red-500 text-sm">{errors.Name.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="input input-bordered"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              {...register("role", { required: "role is required" })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Employee">Employee</option>
              <option value="HR">HR</option>
            </select>
          </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Sign Up"
                />
              </div>
              <p className="text-xl text-center text-[#D1A054]">
                <small>
                  Already registered?{" "}
                  <Link to={"/login"} className="font-bold">
                    Go to log in
                  </Link>
                </small>
              </p>
              <p className="text-center pb-2">Or sign up with</p>
              <div>
                <SocialLogin></SocialLogin>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
