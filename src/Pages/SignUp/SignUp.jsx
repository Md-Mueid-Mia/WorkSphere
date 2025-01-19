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
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const SignUp = () => {
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
        <title>Work Sphere || SignUp</title>
      </Helmet>
      <div className="hero bg-base-200 pt-32 pb-16 md:py-32  min-h-screen overflow-hidden">
        <div className="hero-content flex-col md:flex-row p-0 px-2">
          <div className="text-center w-full md:w-1/2 lg:text-left">
            <img src={img} alt="" className="w-72 md:w-full mx-auto  md:pt-0"/>
          </div>
          <div className="card w-full md:w-1/2 mx-auto  shadow-2xl p-4">
            {/* Use handleSubmit from react-hook-form */}
            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0">
              <h1 className="text-5xl font-bold text-center">Sign-Up now!</h1>

              {/* name */}
              <div className="form-control ">
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

              <div className="flex flex-col md:flex-row gap-1">
                {/* bank acc */}
                <div className="form-control md:w-[95%]">
                  <label className="block text-gray-700">
                    Bank account number
                  </label>
                  <input
                    type="text"
                    {...register("bank_account_no", {
                      required: "Bank account number is required",
                    })}
                    placeholder="Bank Account No"
                    className="input input-bordered"
                  />
                  {errors.bank_account_no && (
                    <span>{errors.bank_account_no.message}</span>
                  )}
                </div>
               

                {/* salary */}
                <div className="form-control md:w-[95%]">
                  <label className="block text-gray-700">Salary</label>
                  <input
                    type="text"
                    {...register("salary", { required: "Salary is required" })}
                    placeholder="Salary"
                    className="input input-bordered"
                  />
                  {errors.salary && <span>{errors.salary.message}</span>}
                </div>
              </div>
              {/* role */}
              <div className="">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  {...register("role", { required: "Role is required" })}
                  className="input input-bordered w-full"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Employee">Employee</option>
                  <option value="HR">HR</option>
                </select>
              </div>
              {/* designation */}
              <div className="form-control ">
                <label className="block text-gray-700">Designation</label>
                <input
                  type="text"
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  placeholder="Designation"
                  className="input input-bordered"
                />
                {errors.designation && (
                  <span>{errors.designation.message}</span>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-1">
                {/* email */}
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
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* password */}
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
              </div>

              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input
                  required
                  type="file"
                  id="image"
                  name="image"
                  {...register("image", { required: "Image is required" })}
                  accept="image/*"
                />
              </div>

              <div className="form-control ">
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
