import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import { Spin } from "antd";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Spin tip="Loading. Please wait..." size="large">
        <div className="content" />
      </Spin>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
