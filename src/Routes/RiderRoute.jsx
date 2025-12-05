import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const RiderRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading || !user) {
    return <span className="loading loading-bars loading-xl"></span>;
  }

  if (role.role !== "rider") {
    return <Forbidden />;
  }
  return children;
};

export default RiderRoute;
