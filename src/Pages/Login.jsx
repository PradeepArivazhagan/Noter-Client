import axios from "axios";
import Cookie from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    axios
      .post("https://noter-server-zyvf.onrender.com/login", { username, password })
      .then((response) => {
        const jwtToken = response.data.jwtToken;
        const userId = response.data.userId;
        const userName = response.data.userName;
        Cookie.set("jwtToken", jwtToken, { expires: 30 });
        Cookie.set("userId", userId, { expires: 30 });
        Cookie.set("userName", userName, { expires: 30 });
        toast.success(response.data.message, {
          style: {
            border: "1px solid #000000",
            padding: "14px",
            color: "#000000",
          },
          iconTheme: {
            primary: "#2fe053",
            secondary: "#ffffff",
          },
        });
        navigate(`/notes`);
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="px-20 py-20 min-h-lvh bg-slate-50 flex flex-col items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white min-w-80 py-5 px-6 rounded-md shadow-md flex flex-col items-start"
      >
        <h1 className="text-2xl lg:text-3xl font-semibold mx-auto">Login</h1>
        <label htmlFor="username" className="mt-4 lg:text-lg font-medium">
          Username
        </label>
        <input
          className="outline-0 bg-gray-100 py-1.5 px-3 rounded-sm mt-1 w-full placeholder:text-gray-300"
          type="text"
          id="username"
          placeholder="Enter your username"
          onChange={handleUsernameChange}
          required
        />
        <label htmlFor="password" className="mt-3 lg:text-lg font-medium">
          Password
        </label>
        <input
          className="outline-0 bg-gray-100 py-1.5 px-3 rounded-sm mt-1 w-full placeholder:text-gray-300"
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={handlePasswordChange}
          required
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 transition-colors duration-200 py-1.5 w-full mt-4 text-white rounded cursor-pointer"
        >
          {loading ? (
            <ThreeDot color="#ffffff" size="small" text="" textColor="" />
          ) : (
            "Login"
          )}
        </button>
        <p className="mt-4 text-sm mx-auto">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600 hover:font-medium transition-colors duration-200"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
