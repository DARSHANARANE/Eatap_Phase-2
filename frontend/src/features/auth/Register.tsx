import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { InlineError, Toast } from "../../components/common/Errors";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState<any>({});

  // ✅ Toast state only for API messages
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ open: true, type, message });
  };

  /* HANDLE CHANGE */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // ✅ remove inline errors while typing
    setErrors((prev: any) => ({ ...prev, [e.target.name]: "" }));
  };

  /* VALIDATION */
  const validate = () => {
    let temp: any = {};

    if (!formData.name) temp.name = "Name is required";
    if (!formData.email) temp.email = "Email is required";
    if (!formData.password) temp.password = "Password is required";
    else if (formData.password.length < 6)
      temp.password = "Password must be at least 6 characters";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  /* SUBMIT */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ validation -> only inline errors (NO toast)
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // ✅ only backend error toast
        showToast("error", data?.message || "Registration failed ❌");
        return;
      }

      // ✅ success toast
      showToast("success", "Registration successful! You can login now.🎉");

      // ✅ optional clear form
      setFormData({ name: "", email: "", password: "", role: "student" });
      setErrors({});
    } catch (error) {
      console.error(error);
      showToast("error", "Server error. Try again later");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create Account
      </h2>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="flex items-center gap-2 border-b border-gray-300 px-3 py-2 mb-2">
          <FaUser className="text-gray-500" />
          <input
            name="name"
            value={formData.name}
            placeholder="Full Name"
            className="w-full outline-none"
            onChange={handleChange}
          />
        </div>
        <InlineError message={errors.name} />

        {/* EMAIL */}
        <div className="flex items-center gap-2 border-b border-gray-300 px-3 py-2 mb-2 mt-4">
          <MdEmail className="text-gray-500" />
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Email"
            className="w-full outline-none"
            onChange={handleChange}
          />
        </div>
        <InlineError message={errors.email} />

        {/* PASSWORD */}
        <div className="flex items-center gap-2 border-b border-gray-300 px-3 py-2 mb-2 mt-4">
          <PiPasswordFill className="text-gray-500" />
          <input
            name="password"
            type="password"
            value={formData.password}
            placeholder="Password"
            className="w-full outline-none"
            onChange={handleChange}
          />
        </div>
        <InlineError message={errors.password} />

        {/* ROLE */}
        <select
          name="role"
          value={formData.role}
          className="w-full border-b border-gray-300 py-2 mb-5 mt-4 focus:outline-none focus:border-purple-600"
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="owner">Mess Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition"
        >
          Register
        </button>
      </form>

      {/* ✅ TOAST (ONLY API) */}
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </div>
  );
};

export default Register;
