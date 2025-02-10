import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  //Handling Register Event
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    axios
      .post("https://noter-server-zyvf.onrender.com/register", {
        username,
        password,
        email,
      })
      .then((response) => {
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
        navigate("/login");
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
        onSubmit={handleRegister}
        className="bg-white min-w-80 py-5 px-6 rounded-md shadow-md flex flex-col items-start"
      >
        <h1 className="text-2xl lg:text-3xl font-semibold mx-auto">Register</h1>
        <label htmlFor="username" className="mt-4 lg:text-lg font-medium">
          Username
        </label>
        <input
          className="outline-0 bg-gray-100 py-1.5 px-3 rounded-sm mt-1 w-full placeholder:text-gray-300"
          type="text"
          id="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="email" className="mt-3 lg:text-lg font-medium">
          Email
        </label>
        <input
          className="outline-0 bg-gray-100 py-1.5 px-3 rounded-sm mt-1 w-full placeholder:text-gray-300"
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
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
            "Register"
          )}
        </button>
        <p className="mt-4 text-sm mx-auto">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 hover:font-medium transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
