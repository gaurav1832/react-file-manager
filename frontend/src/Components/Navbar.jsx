import React from "react";
import { FaReact } from "react-icons/fa";
import { useUserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import logo from "../images/file.png";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="w-full flex justify-around items-center bg-white p-6 shadow-md">
      <div className="flex justify-center items-center space-x-2 font-semibold text-xl text-gray-800">
        {" "}
        <img
          src={logo}
          width={40}
          height={40}
          alt="File Manager"
          className="rounded-lg"
        />
        <Link to="/" className="logo text-2xl font-bold">
          FileForge
        </Link>
      </div>
      <ul className="flex space-x-4 font-semibold">
        {!isLoggedIn ? (
          <>
            {/* <li>
              <a
                href="/signup"
                className="text-white font-semibold py-3 px-4 rounded-full transition-colors"
                style={{ backgroundColor: "#2384c0" }}
              >
                Signup
              </a>
            </li> */}
            <li>
              <a
                href="/login"
                className=" text-white font-semibold py-3 px-4 rounded-full transition-colors"
                style={{ backgroundColor: "#2384c0" }}
              >
                Login / SignUp
              </a>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className=" text-white font-semibold py-3 px-4 rounded-full transition-colors"
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
