import React, { useState } from "react";
import axios from "axios";

const FormAddTasks = ({ id, userRole }) => {
  const [detail, setDetail] = useState("");
  const [task, setTask] = useState("");
  const [nilai, setNilai] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        detail,
        task,
        nilai,
        status,
        userId: id,
      });
      setDetail("");
      setTask("");
      setNilai("");
      setStatus("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Tentukan apakah pengguna yang login memiliki peran "siswa"
  const isSiswa = userRole === "siswa";

  // Jika pengguna bukan siswa, tampilkan form tambah tugas
  if (!isSiswa) {
    return (
      <div className="max-w-lg mx-auto mt-8 ">
        <h2 className="text-xl font-semibold mb-4 text-white font-mono">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="detail"
              className="block text-sm font-medium text-white"
            >
              Detail:
            </label>
            <input
              required
              type="text"
              id="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="task"
              className="block text-sm font-medium text-white"
            >
              Task:
            </label>
            <input
              type="text"
              required
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="nilai"
              className="block text-sm font-medium text-white"
            >
              Point Task:
            </label>
            <input
              type="number"
              required
              id="nilai"
              value={nilai}
              onChange={(e) => setNilai(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-white"
            >
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Task
          </button>
        </form>
      </div>
    );
  }

  // Jika pengguna adalah siswa, kembalikan null (tidak menampilkan form)
  return null;
};

export default FormAddTasks;
