import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Modal from "../components/modal/Modal";
import FormEditTask from "../components/formadd/FormEditTask";

const DetailSiswa = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const openModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTaskId(null);
    setIsOpen(false);
  };

  const openModal2 = (taskId) => {
    setSelectedTaskId(taskId);
    setIsOpenModal2(true);
  };

  const closeModal2 = () => {
    setIsOpenModal2(false);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${selectedTaskId}`);
      getUser();
      closeModal();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Layout>
      <div className="py-6 px-4 flex justify-center items-center mt-10 w-[1200px] mx-auto">
        {users ? (
          <div className="bg-green-500 p-5 rounded-lg">
            <div className="text-white font-bold mb-4">
              <p>Nama : {users.name}</p>
              <p>Email : {users.email}</p>
              <p>Role : {users.role}</p>
            </div>
            <p className="bg-blue-500 w-fit text-white p-2 rounded-md mb-2">
              <Link to={`/studentslist/detail/add/${users.uuid}`}>
                Tambahkan Tugas
              </Link>
            </p>
            <table className="min-w-[800px] border-collapse border border-white">
              <thead>
                <tr className="bg-gray-200 text-gray-800 font-bold">
                  <td className="p-2 border border-white">Task</td>
                  <td className="p-2 border border-white">Detail</td>
                  <td className="p-2 border border-white">Status</td>
                  <td className="p-2 border border-white">Nilai</td>
                  <td className="p-2 border border-white" colSpan={2}>
                    Actions
                  </td>
                </tr>
              </thead>
              <tbody className="text-white">
                {users.tasks && users.tasks.length > 0 ? (
                  users.tasks.map((task, index) => (
                    <tr key={index} className="bg-gray-400">
                      <td className="p-2 border border-white">{task.task}</td>
                      <td className="p-2 border border-white">{task.detail}</td>
                      <td className="p-2 border border-white">{task.status}</td>
                      <td className="p-2 border border-white">{task.nilai}</td>
                      <td>
                        <button
                          onClick={() => openModal(task.uuid)}
                          className="text-white px-4 py-2 rounded-md bg-red-600"
                        >
                          Hapus
                        </button>
                      </td>
                      <td className="p-2 border border-white bg-blue-500">
                        <button onClick={() => openModal2(task.uuid)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-2 border border-white bg-red-500"
                    >
                      No tasks available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <p className="text-red-500 font-mono font-bold">
            Apakah Anda yakin ingin menghapus siswa ini?
          </p>
          <div className="mt-4 flex gap-x-4">
            <button
              onClick={deleteTask}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
            >
              Hapus
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Batal
            </button>
          </div>
        </Modal>
        <Modal isOpen={isOpenModal2} closeModal={closeModal2} userId={id}>
          <FormEditTask uuid={selectedTaskId} />
        </Modal>
      </div>
    </Layout>
  );
};

export default DetailSiswa;
