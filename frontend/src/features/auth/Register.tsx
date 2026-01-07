import { useState } from "react";
import { FaUser  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful 🎉");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center text-gray-500">
        <FaUser className="flex items-center gap-1 mb-4 mr-2" />
        <input
          name="name"
          placeholder="Full Name"
          className="w-full border-b border-gray-300 py-2 mb-5 focus:outline-none focus:border-purple-600"
          onChange={handleChange}
        />
        </div>
        <div className="flex items-center text-gray-500">
          <MdEmail className="flex items-center gap-1 mb-4 mr-2" />
        <input
          name="email"
          type="email" 
          placeholder="Email"
          className="w-full border-b border-gray-300 py-2 mb-5 focus:outline-none focus:border-purple-600"
          onChange={handleChange}
        />
        </div>
        <div className="flex items-center text-gray-500">
        <PiPasswordFill className="flex items-center gap-1 mb-4 mr-2" />
        <input
          name="password" 
          type="password"
          placeholder="Password"
          className="w-full border-b border-gray-300 py-2 mb-5 focus:outline-none focus:border-purple-600"
          onChange={handleChange}
        />
        </div>

        <select
          name="role"
          className="w-full border-b border-gray-300  py-2 mb-5 focus:outline-none focus:border-purple-600"
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
    </div>
  );
};

export default Register;
