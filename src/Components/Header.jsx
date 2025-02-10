import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu,IoMdClose } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import Cookie from "js-cookie";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const userName = Cookie.get("userName");
  const jwtToken = Cookie.get("jwtToken");
  
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove("jwtToken");
    Cookie.remove("userId");
    Cookie.remove("userName");
    navigate("/", { replace: true });
  };

  return (
    <div className="shadow fixed z-10 w-full bg-white py-4 px-6 md:px-20 lg:px-32 flex flex-row items-center justify-between">
      <Link to="/">
        <h1 className="text-2xl font-bold">Noter</h1>
      </Link>
      {jwtToken === undefined ? (
        <ul className="hidden md:flex flex-row items-center gap-6">
          <Link to="/login">
            <li className="py-1.5 px-6 border-2 border-black rounded hover:bg-black hover:text-white transition-colors duration-200">
              Login
            </li>
          </Link>
          <Link to="/register">
            <li className="py-1.5 px-6 border-2 border-black bg-black hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200 text-white rounded">
              Register
            </li>
          </Link>
        </ul>
      ) : (
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold">Welcome! 👋 {userName}</h1>
          </div>
          <button
            onClick={handleLogout}
            className="cursor-pointer py-1.5 px-6 border-2 border-black bg-black hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200 text-white rounded flex items-center gap-2"
          >
            Logout
            <IoLogOutOutline />
          </button>
        </div>
      )}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="block md:hidden text-2xl"
      >
        {showMenu ? <IoMdClose /> : <IoMdMenu />}
      </button>
      {showMenu && (
        <div className="absolute top-16 right-0 w-36 bg-white h-lvh p-4 shadow-md md:hidden">
          {jwtToken === undefined ? (
            <ul>
              <Link to="/login">
                <li className="py-1.5 px-6 border-2 border-black rounded text-center">
                  Login
                </li>
              </Link>
              <Link to="/register">
                <li className="mt-2 py-1.5 px-6 border-2 border-black bg-black text-white rounded">
                  Register
                </li>
              </Link>
            </ul>
          ) : (
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold">Welcome! 👋 {userName}</h1>
              </div>
              <button
                onClick={handleLogout}
                className="py-1.5 px-6 border-2 border-black bg-black hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200 text-white rounded flex items-center gap-2"
              >
                Logout
                <IoLogOutOutline />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
