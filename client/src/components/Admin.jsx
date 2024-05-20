import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const Admin = () => {
  const { createUser } = useSelector((state) => state.user);
  return createUser && createUser.isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default Admin;
