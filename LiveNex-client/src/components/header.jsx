
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../slices/userApiSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from '../Livenex-logo.png';


const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoutApiCall] = useLogoutMutation();
  const navigate =  useNavigate();


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      navigate("/login");
      localStorage.clear();
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

      toast.success("logout successfully");
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    }
  };

  const upGradeHandle = ()=>{
     navigate("/subscription");
  };

  return (
    <header className="bg-white shadow-md p-1 flex justify-between items-center">
      {/* Logo on the left */}
      <div className="flex items-center">
        <img
          src={Logo} // Replace with your logo image source
          alt="Logo"
          className="h-16 w-65 ml-9"
        />
      </div>

      {/* Buttons on the right */}
      <div className="flex items-center">
        {/* Upgrade Button */}
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full mr-4 hover:bg-blue-600 transition duration-200"
          onClick={upGradeHandle}
        >
          Upgrade
        </button>

        {/* My Account Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-full hover:bg-gray-300 transition duration-200 focus:outline-none"
          >
            My Account
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={logoutHandler}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;