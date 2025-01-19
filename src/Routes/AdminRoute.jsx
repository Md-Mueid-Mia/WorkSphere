import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpiner';


const AdminRoute = ({children}) => {
    const {user, loading} =useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    // console.log(isAdmin , user);

  if (loading || isAdminLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} replace />;
};

export default AdminRoute;