import React from 'react';
//import { Eye, Trash2, Ban, CheckCircle } from 'lucide-react';
import { FaEye, FaTrash , FaCheckCircle , FaBan  } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: 'Shivam Soni',
    email: 'shivam@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Customer',
    status: 'Blocked',
  },
  // Add more users here...
];

const UserManagement = () => {
  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3 justify-center">
                  <button className="text-blue-600 hover:text-blue-800" title="View">
                    <FaEye className="w-5 h-5" />
                  </button>
                  <button
                    className={`${
                      user.status === 'Active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                    }`}
                    title={user.status === 'Active' ? 'Block' : 'Unblock'}
                  >
                    {user.status === 'Active' ? <FaBan  className="w-5 h-5" /> : <FaCheckCircle  className="w-5 h-5" />}
                  </button>
                  <button className="text-gray-600 hover:text-black" title="Delete">
                    <FaTrash  className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
