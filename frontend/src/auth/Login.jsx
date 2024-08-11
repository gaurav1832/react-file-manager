import React, { useContext, useState } from "react";
const API_BASE_URL =
  process.env.PROD_API_BASE_URL ||
  "https://react-file-manager-y92g.onrender.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // Retrieve values using state instead of directly from the event target
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // console.log("data-", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);
      window.location.href = "/";
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login flex items-center justify-center h-screen">
      <section className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <hgroup className="mb-8 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <h3 className="text-md text-gray-600">To Access Your Files</h3>
        </hgroup>
        <form action="#" method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:ring-gray-500 focus:border-gray-600"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 leading-tight focus:outline-none focus:ring-gray-500 focus:border-gray-600"
            />
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="w-full font-semibold flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md text-white"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            New here?{" "}
            <a href="/signup" className="text-blue-600 hover:text-blue-700">
              Sign up
            </a>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
