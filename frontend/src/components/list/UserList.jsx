import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);

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

  // Filter users berdasarkan role 'murid'
  const filteredUsers = users.filter((user) => user.role === "murid");

  return (
    <div className="py-6 px-4">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 border border-slate-900 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 border border-slate-900 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-slate-900 border border-slate-900 uppercase tracking-wider">
              Email
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-bold text-slate-900 border border-slate-900 uppercase tracking-wider"
              colSpan={2}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user, index) => (
            <tr key={user.uuid}>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-900">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-900">
                <Link to={`/studentslist/detail/${user.uuid}`}>Detail</Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border border-slate-900">
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
