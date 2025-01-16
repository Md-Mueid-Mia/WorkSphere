import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth();

    // request interceptor to add authorization header for every secure call to teh api
    useEffect(() => {
        axiosSecure.interceptors.response.use(
          res => {
            return res
          },
          async error => {
            console.log('Error caught from axios interceptor-->', error.response)
            if (error.response.status === 401 || error.response.status === 403) {
              // logout
              signOutUser()
              // navigate to login
              navigate('/login')
              console.log('hello')
            }
            return Promise.reject(error)
          }
        )
      }, [signOutUser, navigate])
      return axiosSecure
};

export default useAxiosSecure;