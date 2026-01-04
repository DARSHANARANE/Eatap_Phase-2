import { useSelector } from "react-redux";
import Login from "../features/auth/Login";
import Admin from "../pages/Admin";
import Owner from "../pages/Owner";
import Student from "../pages/Student";

const AppRoutes = () => {
  const { user } = useSelector((state: any) => state.auth);

  if (!user) return <Login />;

  if (user.role === "admin") return <Admin />;
  if (user.role === "owner") return <Owner />;
  return <Student />;
};

export default AppRoutes;
