import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Modal from "../components/modal/Modal";
import FormEditTask from "../components/formadd/FormEditTask";
import { useDispatch, useSelector } from "react-redux";
import FormAddTasks from "../components/formadd/FormAddTasks";
import { CgClose } from "react-icons/cg";
import { getMe } from "../features/authSlice";

const DetailSiswa = () => {
  const [userDetail, setUserDetail] = useState(null);
  const { id } = useParams();
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  useEffect(() => {
    getUser();
  }, []);

  const openDeleteModal = (taskId) => {
    setSelectedTaskId(taskId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedTaskId(null);
    setDeleteModalOpen(false);
  };

  const openAddTaskModal = () => {
    setAddTaskModalOpen(true);
  };

  const closeAddTaskModal = () => {
    setAddTaskModalOpen(false);
  };
  const openEditTaskModal = (taskId) => {
    setSelectedTaskId(taskId)
    setEditTaskModalOpen(true);
  };

  const closeEditTaskModal = () => {
    setEditTaskModalOpen(false);
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${selectedTaskId}`);
      getUser();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Layout>
      <div className="py-6 px-4 flex justify-center items-center mt-10 w-[1200px] mx-auto">
        {userDetail ? (
          <div className="bg-green-500 p-5 rounded-lg">
            <div className="text-white font-bold mb-4">
              <p>Nama : {userDetail.name}</p>
              <p>Email : {userDetail.email}</p>
              <p>Role : {userDetail.role}</p>
            </div>
            {user && user.role === "guru" && (
              <p className="bg-blue-500 w-fit text-white p-2 rounded-md mb-2">
                <button onClick={openAddTaskModal}>Tambahkan Tugas</button>
              </p>
            )}

            <table className="min-w-[800px] border-collapse border border-white">
              <thead>
                <tr className="bg-gray-200 text-gray-800 font-bold">
                  <td className="p-2 border border-white">Task</td>
                  <td className="p-2 border border-white">Detail</td>
                  <td className="p-2 border border-white">Status</td>
                  <td className="p-2 border border-white">Story Point</td>
                  {user && user.role === "guru" && (
                    <td className="p-2 border border-white" colSpan={2}>
                      Actions
                    </td>
                  )}
                </tr>
              </thead>
              <tbody className="text-white">
                {userDetail.tasks && userDetail.tasks.length > 0 ? (
                  userDetail.tasks.map((task, index) => (
                    <tr key={index} className="bg-gray-400">
                      <td className="p-2 border border-white">{task.task}</td>
                      <td className="p-2 border border-white">{task.detail}</td>
                      <td className="p-2 border border-white">{task.status}</td>
                      <td className="p-2 border border-white">{task.nilai}</td>
                      {user && user.role === "guru" && (
                        <>
                          <td>
                            <button
                              onClick={() => openDeleteModal(task.uuid)}
                              className="text-white px-4 py-2 rounded-md bg-red-600"
                            >
                              Hapus
                            </button>
                          </td>
                          <td className="p-2 border border-white bg-blue-500">
                            <button onClick={() => openEditTaskModal(task.id)}>
                              Edit
                            </button>
                          </td>
                        </>
                      )}
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
        <Modal isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
          <p className="text-red-500 font-mono font-bold">
            Apakah Anda yakin ingin menghapus Task ini?
          </p>
          <div className="mt-4 flex gap-x-4">
            <button
              onClick={deleteTask}
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

        <Modal
          isOpen={addTaskModalOpen}
          closeModal={closeAddTaskModal}
          className={" !bg-green-700"}
        >
          <div className="flex justify-center items-center">
            <button
              className="absolute top-1 right-1 text-white bg-red-600 p-3"
              onClick={closeAddTaskModal}
            >
              <CgClose />
            </button>
            <FormAddTasks id={id} />
          </div>
        </Modal>
        <Modal isOpen={editTaskModalOpen} closeModal={closeEditTaskModal}>
          <button
            className="absolute top-1 right-1 text-white bg-red-600 p-3"
            onClick={closeEditTaskModal}
          >
            <CgClose />
          </button>
          <FormEditTask taskId={selectedTaskId}/>
        </Modal>
      </div>
    </Layout>
  );
};

export default DetailSiswa;
