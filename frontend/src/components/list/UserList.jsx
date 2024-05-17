import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import FormAddSiswa from "../formadd/FormAddSiswa";
import FormEditSiswa from "../formadd/FormEditSiswa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${selectedUserId}`);
      getUser();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Filter users berdasarkan role 'murid'
  const filteredUsers = users.filter((user) => user.role === "murid");

  const openAddModal = () => {
    setIsModalOpen(true);
  };
  const openDeletedModal = (uuid) => {
    setSelectedUserId(uuid);
    setisDeleteModalOpen(true);
  };

  const openEditModal = (uuid) => {
    setSelectedUserId(uuid);
    setIsEditModalOpen(true);
  };

  const closeAddModal = () => {
    setIsModalOpen(false);
  };
  const closeDeleteModal = () => {
    setisDeleteModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div className="py-6 px-4 mx-[300px] mt-16 rounded-sm min-w-[800px] bg-green-600">
      <h2 className="text-2xl font-bold text-center mb-6 text-white font-mono">
        Daftar Siswa
      </h2>
      <button
        className="p-2 bg-blue-600 mb-1 rounded-md text-white font-mono text-[14px] hover:bg-blue-500"
        onClick={openAddModal}
      >
        Tambahkan Siswa
      </button>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-xl border-collapse border border-black">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase border border-black">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase border border-black">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase border border-black">
                Email
              </th>
              <th
                colSpan={3}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase border border-black"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((users, index) => (
              <tr
                key={users.uuid}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap border border-black">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-black">
                  {users.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-black">
                  {users.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-black">
                  <Link
                    to={`/studentslist/detail/${users.uuid}`}
                    className="text-blue-600 hover:underline"
                  >
                    Detail
                  </Link>
                </td>
                {user && users.role === "guru" && (
                  <td className="px-6 py-4 whitespace-nowrap border border-black">
                    <button
                      onClick={() => openEditModal(users.uuid)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                )}
                {user && user.role === "guru" && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap border border-black">
                      <button
                        onClick={() => openDeletedModal(user.uuid)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeAddModal}
          className={"bg-green-600"}
        >
          <button className="absolute top-1 right-2" onClick={closeAddModal}>
            <IoMdCloseCircleOutline className="text-white bg-red-700 p-1 hover:bg-red-500 text-[25px] rounded-full" />
          </button>
          <FormAddSiswa />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          closeModal={closeEditModal}
          className={"bg-green-600"}
        >
          <button className="absolute top-1 right-2" onClick={closeEditModal}>
            <IoMdCloseCircleOutline className="text-white bg-red-700 p-1 hover:bg-red-500 text-[25px] rounded-full" />
          </button>
          <FormEditSiswa userId={selectedUserId} />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal}>
          <p className="text-red-500 font-mono font-bold">
            Apakah Anda yakin ingin menghapus Task ini?
          </p>
          <div className="mt-4 flex gap-x-4">
            <button
              onClick={deleteUser}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
            >
              Hapus
            </button>
            <button
              onClick={closeDeleteModal}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Batal
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
