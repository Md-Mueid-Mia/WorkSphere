import React from "react";
import { useForm } from "react-hook-form";
import message from '../../assets/Message.svg'
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const ContactUs = () => {
  const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async(data) => {
    // console.log("Form Submitted: ", data);
    // Handle the form data submission to the backend here
    await axiosPublic.post('/messages', data)
    .then(res=>{
        // console.log('data submitted');
        // swal alert for success to send message
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Message has been sent",
            showConfirmButton: false,
            timer: 1500
        })
        // reset the form after successful submission
        reset();
    })
  };

  return (
    <div className=" px-5 py-20 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <div className="bg-white shadow-lg rounded-lg w-full  p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div>
            <img src={message} alt="" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Our Address</h2>
              <p className="text-gray-600">
                Work Sphere Company, 1234 Innovation Street, Tech City, TC 56789
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "name is required",
                    pattern: {
                      message: "Enter a valid name address",
                    },
                  })}
                  placeholder="Enter your name"
                  defaultValue={user?.displayName}
                  className={`w-full px-4 py-2 border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-lg focus:outline-none`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  defaultValue={user?.email}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-lg focus:outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                  className={`w-full px-4 py-2 border ${
                    errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-lg focus:outline-none`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>
            {isSubmitSuccessful && (
              <p className="mt-4 text-green-600">Thank you for your message!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
