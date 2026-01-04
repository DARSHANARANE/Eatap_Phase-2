import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ email, password }) as any);
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
