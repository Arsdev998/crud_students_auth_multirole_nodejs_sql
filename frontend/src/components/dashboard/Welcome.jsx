import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-green-700 p-8 rounded-lg shadow-lg max-w-lg mx-[440px] mt-[200px]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Selamat Datang</h1>
        <h2 className="text-xl text-white mt-2">
          <strong>{user?.name}</strong>
        </h2>
      </div>
      <div className="mt-4">
        <p className="text-white text-center">
          Kami senang melihat Anda kembali! Berikut adalah beberapa informasi terbaru yang mungkin menarik bagi Anda:
        </p>
        <ul className="list-disc list-inside mt-4 text-white">
          <li>Perbarui data siswa secara real-time.</li>
          <li>Lihat jadwal acara dan kegiatan sekolah.</li>
          <li>Pelajari tips dan trik untuk manajemen kelas yang lebih baik.</li>
        </ul>
      </div>
      <div className="mt-6 text-center">
        <Link to="/studentslist" className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-700 transition duration-300">
          Lihat Daftar Siswa
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
