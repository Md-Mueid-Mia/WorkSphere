import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpiner';
import { useEmployee } from '../Hooks/useEmployee';


const EmployeeRoute = ({children}) => {
    const {user, loading} =useAuth();
    const [isEmployee, isEmployeeLoading] = useEmployee();
    const location = useLocation();
    console.log(isEmployee , user);

  if (loading || isEmployeeLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user && isEmployee) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} replace />;
};

export default EmployeeRoute;