import React from "react";
import { FaReact } from "react-icons/fa";
import { useUserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="fixed w-full flex justify-between items-center bg-white py-4 px-6 shadow-md">
      <div className="flex font-semibold text-xl text-gray-800">
        {" "}
        <span className="text-3xl mr-2">
          <FaReact />
        </span>
        <Link to="/">File Manager</Link>
      </div>
      <ul className="flex space-x-8 font-semibold">
        {!isLoggedIn ? (
          <>
            <li>
              <a
                href="/signup"
                className="text-white font-bold py-2 px-4 rounded transition-colors"
                style={{ backgroundColor: "#2384c0" }}
              >
                Signup
              </a>
            </li>
            <li>
              <a
                href="/login"
                className=" text-white font-bold py-2 px-4 rounded transition-colors"
                style={{ backgroundColor: "#2384c0" }}
              >
                Login
              </a>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className=" text-white font-bold py-2 px-4 rounded transition-colors"
              style={{ backgroundColor: "#2384c0" }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
