import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Forbidden from "../Components/Logo/Forbidden/Forbidden";

const AdminRoute = ({ children }) => {
  const {loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (role.role !== "admin") {
    return <Forbidden />;
  }
  return children;
};

export default AdminRoute;
