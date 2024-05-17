import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FormEditTask = ({  userId, taskId }) => {
  const [detail, setDetail] = useState("");
  const [task, setTask] = useState("");
  const [nilai, setNilai] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch task data by UUID
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${taskId}`);
        const taskData = response.data;
        setDetail(taskData.detail);
        setTask(taskData.task);
        setNilai(taskData.nilai);
        setStatus(taskData.status);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
    fetchTaskData();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`Updating task with ID: ${taskId}`);
      console.log(`Detail: ${detail}, Task: ${task}, Nilai: ${nilai}, Status: ${status}`);
  
      const response = await axios.patch(`http://localhost:5000/tasks/${taskId}`, {
        detail,
        task,
        nilai,
        status,
      });
  
      console.log("Task updated successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating task:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };
  
  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="detail"
            className="block text-sm font-medium text-gray-700"
          >
            Detail:
          </label>
          <input
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
            className="block text-sm font-medium text-gray-700"
          >
            Task:
          </label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="nilai"
            className="block text-sm font-medium text-gray-700"
          >
            Nilai:
          </label>
          <input
            type="text"
            id="nilai"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
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
          Update Task
        </button>
      </form>
    </div>
  );
};

export default FormEditTask;
