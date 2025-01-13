import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from './../Components/LoadingSpiner';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
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
