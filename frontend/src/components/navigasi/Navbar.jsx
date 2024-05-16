import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout, reset } from '../../features/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state => state.auth));

  const logout = ()=>{
    dispatch(Logout());
    dispatch(reset());
    navigate('/')
  }
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-white text-lg font-bold"></span>
      <h1 className='text-white font-bold'>Manajemen Tugas Siswa</h1>
        <ul className="flex">
          <button onClick={logout} className="mr-6"><a href="#" className="text-white hover:text-gray-300">Logout</a></button>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
