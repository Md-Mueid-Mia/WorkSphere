import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useHR from '../Hooks/useHR';
import LoadingSpinner from '../Components/LoadingSpiner';

const HrRoutes = ({children}) => {
    const {user, loading} =useAuth();
    const [isHR, isHRLoading] = useHR();
    const location = useLocation();
    // console.log(isHR);

  if (loading || isHRLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  if (user && isHR) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} replace />;
};

export default HrRoutes;