import { createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

// import useAxiosPublic from '../Hooks/useAxiosPublic';
import auth from '../Firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    // const axiosPublic = useAxiosPublic()

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn= ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const githubSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }
    
    // const facebookSignIn = ()=>{
    //     setLoading(true)
    //     return signInWithPopup(auth, facebookProvider)
    // }
    const signOutUser = () => {
        setLoading(true)
       return signOut(auth)
    

    }
    const updateUserProfile = (name, photo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
   
    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        // Add more methods as needed
        createUser,
        signIn,
        signOutUser,
        updateUserProfile,
        googleSignIn,
        githubSignIn,
        
    }

    
    // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser-->', currentUser?.email)
      if (currentUser?.email) {
        setUser(currentUser)
        await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        )
      } else {
        setUser(currentUser)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
          withCredentials: true,
        })
      }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;