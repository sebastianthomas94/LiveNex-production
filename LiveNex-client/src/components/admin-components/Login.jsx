import React, { useState } from "react";
import { useLoginMutation } from "../../slices/userApiSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter both username and password");
      return;
    }
    try {
      const res = await login({ username, password }).unwrap();
      console.log(res);
      if (res.login) {
        localStorage.setItem("admin", "logged in");

        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("username or password is incorrect");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {errorMessage && (
          <div className="text-red-500 mb-4 text-sm text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border rounded-md w-full py-2 px-3 text-gray-700"
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border rounded-md w-full py-2 px-3 text-gray-700"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </div>
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
