import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import AlertMessage from "../components/common/AlertMessage";

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const isRegister = type === "register";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [alert, setAlert] = useState({
    message: "",
    type: "error" as "error" | "success",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation using PROPS
    if (isRegister && !formData.name) {
      setAlert({ message: "Name is required", type: "error" });
      return;
    }

    if (!formData.email || !formData.password) {
      setAlert({ message: "Email & Password required", type: "error" });
      return;
    }

    try {
      const url =
        type === "register"
          ? "http://localhost:5000/api/users/register"
          : "http://localhost:5000/api/users/login";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({ message: data.message, type: "error" });
        return;
      }

      setAlert({
        message: type === "register"
          ? "Registration successful 🎉"
          : "Login successful 🎉",
        type: "success",
      });

    } catch (error) {
      setAlert({ message: "Something went wrong", type: "error" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isRegister ? "Create Account" : "Login"}
      </h2>

      <AlertMessage message={alert.message} type={alert.type} />

      <form onSubmit={handleSubmit}>
        {/* Name (only Register) */}
        {isRegister && (
          <div className="flex items-center text-gray-500">
            <FaUser className="mr-2" />
            <input
              name="name"
              placeholder="Full Name"
              className="w-full border-b py-2 mb-5 focus:outline-none focus:border-purple-600"
              onChange={handleChange}
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center text-gray-500">
          <MdEmail className="mr-2" />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border-b py-2 mb-5 focus:outline-none focus:border-purple-600"
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="flex items-center text-gray-500">
          <PiPasswordFill className="mr-2" />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border-b py-2 mb-5 focus:outline-none focus:border-purple-600"
            onChange={handleChange}
          />
        </div>

        {/* Role only Register */}
        {isRegister && (
          <select
            name="role"
            className="w-full border-b py-2 mb-5 focus:outline-none focus:border-purple-600"
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="owner">Mess Owner</option>
          </select>
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
