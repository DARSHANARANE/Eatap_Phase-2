import { useState } from "react";

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
        <input
          name="name"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full mb-6 px-4 py-2 border rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="owner">Mess Owner</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-pink-500
                     text-white py-2 rounded-lg font-medium hover:opacity-90"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
