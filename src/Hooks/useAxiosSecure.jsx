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
            (response) => response,
            async (error) => {
              if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // Handle unauthorized access (e.g., redirect to login)
                signOutUser();
                navigate('/login');
              }
              return Promise.reject(error);
            }
        )
      }, [signOutUser, navigate])
      return axiosSecure
};

export default useAxiosSecure;