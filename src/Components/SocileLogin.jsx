import React from 'react';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { IoLogoGoogle } from 'react-icons/io5';
// import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const {googleSignIn, githubSignIn} = useAuth()
    // const axiosPublic = useAxiosPublic()
    const navigate =useNavigate()

    const handleGoogleSignin = () => {
        googleSignIn()
        .then(res=>{
            console.log(res.user)
            if(res.user.email){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Successfully Signed",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/')
            }
            const userInfo = {
                name: res.user?.displayName,
                email: res.user?.email,
                photoURL: res.user?.photoURL
            }
            // axiosPublic.post('/users', userInfo)
            //  .then(res=>{
            //     console.log(res.data)
            //     navigate('/')
            //  })
        })
    }
    
    const handleGithubSignin = () => {
        githubSignIn()
       .then(res=>{
        if(res.user.email){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Successfully Signed",
                showConfirmButton: false,
                timer: 1500
              });
              navigate('/')
        }
       })
    }
    
  
    return (
        <div>
             <div className="flex items-center justify-center space-x-6">
                         
                          <button onClick={handleGoogleSignin}>
                            <IoLogoGoogle className="text-2xl" />
                          </button>
                          <button onClick={handleGithubSignin}>
                            <FaGithub className="text-2xl" />
                          </button>
                        </div>
        </div>
    );
};

export default SocialLogin;