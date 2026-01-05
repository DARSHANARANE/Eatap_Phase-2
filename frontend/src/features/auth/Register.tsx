import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-80"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

      <input
        name="name"
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded"
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded"
        onChange={handleChange}
      />

      <select
        name="role"
        className="w-full mb-4 p-2 border rounded"
        onChange={handleChange}
      >
        <option value="student">Student</option>
        <option value="owner">Mess Owner</option>
      </select>

      <button className="w-full bg-green-600 text-white py-2 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
