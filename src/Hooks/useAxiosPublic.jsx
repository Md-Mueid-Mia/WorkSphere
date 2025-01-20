import axios from 'axios';

const axiosPublic= axios.create({
    baseURL: "https://assignment-12-server-ten-kohl.vercel.app",
})

const useAxiosPublic = () => {
    return axiosPublic
}

export default useAxiosPublic;