import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from './../Components/LoadingSpiner';
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner/>;
  }
  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location?.pathname} replace />;
};

export default PrivateRoute;
