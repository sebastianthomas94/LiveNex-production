import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-1/4 h-full">
      <ul className="py-6">
        <li className="flex items-center py-2 px-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/admin/dashboard" className="flex items-center">
            <i className="fa fa-users mr-2" />
            Users
          </Link>
        </li>
        <li className="flex items-center py-2 px-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/admin/tickets" className="flex items-center">
            <i className="fa fa-ticket mr-2" />
            Tickets
          </Link>
        </li>
        <li className="flex items-center py-2 px-4 hover:bg-gray-700 cursor-pointer">
          <Link to="/admin/destinations" className="flex items-center">
            <i className="fa fa-globe mr-2" />
            Destinations
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
