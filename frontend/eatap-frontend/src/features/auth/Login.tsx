const Login = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Login
      </button>
    </div>
  );
};

export default Login;
