import React from "react";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-full w-64 fixed top-0 left-0 overflow-y-auto p-2">
      <Link to={'/dashboard'}>
        <img src={logo} alt="" className="w-[50px] h-[50px] rounded-full ml-5 mt-1" />
      </Link>
      <ul className="mt-10">
        <li className="mb-4">
          <Link to={'/dashboard'} className="block px-4 py-2 hover:bg-gray-800">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to={'/studentslist'} className="block px-4 py-2 hover:bg-gray-800">
            Siswa
          </Link>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-gray-800">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
