import React, { useEffect, useState } from 'react';
//import { Eye, Trash2, Ban, CheckCircle } from 'lucide-react';
import { FaEye, FaTrash, FaCheckCircle, FaBan } from "react-icons/fa";
import GetAllUsers from '../../utils/api/admin/GetAllUsers';
import UpdateUserAccess from '../../utils/api/admin/UpdateUserAccess';



const UserManagement = () => {

  const [users, setUsers] = useState([]);

  const loadUser = async () => {
    const result = await GetAllUsers();
    setUsers(result);
  }

  useEffect(() => {
    loadUser();
  }, [])

  const handleUserAccess = async (id) => {
    //console.log(id);
    const response = await UpdateUserAccess(id);
    if(response){
      alert(response.message);
      loadUser();
    }
  }

  return (
    <div className="p-6 w-screen bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Contact No.</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Has Access</th>
              <th className="px-6 py-4">Verified</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
         {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.mobile_no}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${user.hasAccess
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {user.hasAccess ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${user.isVerified
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {user.isVerified ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3 justify-center">
                    {/* <button className="text-blue-600 hover:text-blue-800" title="View">
                      <FaEye className="w-5 h-5" />
                    </button> */}
                    <button
                      className={`${user.hasAccess ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                        } hover:cursor-pointer`}
                      title={user.hasAccess ? 'Block' : 'Unblock'} onClick={()=>handleUserAccess(user.id)}
                    >
                      {user.hasAccess ? <FaBan className="w-5 h-5" /> : <FaCheckCircle className="w-5 h-5" />}
                    </button>
                    {/* <button className="text-gray-600 hover:text-black" title="Delete">
                      <FaTrash className="w-5 h-5" />
                    </button> */}
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
