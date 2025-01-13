import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';


const AdminRoute = ({children}) => {
    const {user, loading} =useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

  if (loading || isAdminLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} replace />;
};

export default AdminRoute;