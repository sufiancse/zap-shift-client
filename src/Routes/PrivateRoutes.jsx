import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";


const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) return <span className="loading loading-ring loading-xl"></span>;

  if(!user){
    return <Navigate to={'/login'} state={location?.pathname}/>
  }

  return children;
};

export default PrivateRoutes;
