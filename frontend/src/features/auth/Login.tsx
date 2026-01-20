import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authSlice";
import { FaUser } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import { InlineError } from "../../components/common/Errors";

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state: any) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let temp: any = {};

    if (!email) temp.email = "Email is required";
    if (!password) temp.password = "Password is required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    dispatch(login({ email, password }));
  };

  // ✅ Redirect on login success (no toast)
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") navigate("/admin");
    else if (user.role === "owner") navigate("/owner");
    else navigate("/student");
  }, [user, navigate]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
        Log In
      </h2>

      {/* ✅ API Error message (optional) */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error || "Email or password is wrong ❌"}
        </div>
      )}

      {/* EMAIL */}
      <div className="flex items-center gap-2 border-b border-gray-300 px-3 py-2">
        <FaUser className="text-gray-500" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev: any) => ({ ...prev, email: "" }));
          }}
          className="w-full outline-none"
        />
      </div>
      <InlineError message={errors.email} />

      {/* PASSWORD */}
      <div className="flex items-center gap-2 border-b border-gray-300 px-3 py-2">
        <PiPasswordFill className="text-gray-500" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev: any) => ({ ...prev, password: "" }));
          }}
          className="w-full outline-none"
        />
      </div>
      <InlineError message={errors.password} />

      <div className="flex items-center justify-between text-sm mb-4 mt-4">
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
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold shadow-md disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

export default Login;
