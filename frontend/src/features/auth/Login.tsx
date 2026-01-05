import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authSlice";

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  // 🔥 THIS IS THE MISSING PART
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") navigate("/admin");
    else if (user.role === "owner") navigate("/owner");
    else navigate("/student");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-500 text-white flex-col gap-4 p-6 rounded-lg shadow-lg">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border-2 border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border-2 border-gray-300 rounded-md"
      />
      <button onClick={handleLogin} disabled={loading} className="bg-white text-purple-500 px-4 py-2 rounded-md font-bold">
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;

