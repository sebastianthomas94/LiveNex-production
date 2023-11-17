import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  // Functionality for logout can be added here
  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <header className="bg-blue-500 text-white shadow-md py-4">
      <div className="flex justify-between items-center mx-auto max-w-7xl px-4 ">
        <div className="flex items-center cursor-pointer"  onClick={()=>navigate("/admin/dashboard")}>
          <p className="text-2xl font-bold">LiveNex</p>
          <p className="text-lg text-gray-300">Administrator</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
