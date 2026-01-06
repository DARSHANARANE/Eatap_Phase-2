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
    if (!email || !password) return;
    dispatch(login({ email, password }));
  };

  // Redirect based on role after login
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") navigate("/admin");
    else if (user.role === "owner") navigate("/owner");
    else navigate("/student");
  }, [user, navigate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center text-left">
            Log In
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         className="w-full border-b border-gray-300 py-2 mb-5 focus:outline-none focus:border-purple-600"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         className="w-full border-b border-gray-300 py-2 mb-5 focus:outline-none focus:border-purple-600"
      />

      <div className="flex items-center justify-between text-sm mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" />
          Remember me
        </label>
        <button className="text-indigo-600 hover:underline cursor-pointer">
          Forgot password?
        </button>
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
