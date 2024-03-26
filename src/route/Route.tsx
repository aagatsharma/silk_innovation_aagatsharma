import Header from "@/components/shared/Header";
import UseUser from "@/hooks/use-user";

import { Navigate, Outlet } from "react-router-dom";

export const UserRoute = () => {
  const { token } = UseUser();
  if (!token) return <Navigate to="/" />;
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export const GuestRoute = () => {
  const { token } = UseUser();
  if (token) return <Navigate to="/login" />;
  return <Outlet />;
};
