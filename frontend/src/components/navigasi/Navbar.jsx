import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Logout, reset } from "../../features/authSlice";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = async () => {
    console.log("Logging out...");
    try {
      await dispatch(Logout()).unwrap(); // Await for the thunk to resolve
      dispatch(reset());
      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-white text-lg font-bold"></span>
        <h1 className="text-white font-bold">Manajemen Tugas Siswa</h1>

        <div className="flex gap-x-5">
          <div className="flex items-center gap-x-1">
            <CgProfile className="text-white text-[20px]"/>
            <p className="text-white font-mono">{user && user.name}</p>
          </div>
          <button onClick={logout} className="bg-white p-1 rounded-md text-red-500 hover:text-red-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
