import React from 'react';
import { IoOpenOutline } from "react-icons/io5";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      {/* <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1> */}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: '1,245' },
          { title: 'Total Orders', value: '578' },
          { title: 'Total Revenue', value: '₹1,25,000' },
          { title: 'Products in Stock', value: '342' }
        ].map((card, index) => (
          <div key={index} className="relative bg-white shadow-md rounded-2xl p-5 hover:scale-105 hover:cursor-progress">
            <IoOpenOutline className='absolute bottom-1 right-1' color='brown'/>
            <h2 className="text-amber-800 text-sm">{card.title}</h2>
            <p className="text-2xl font-semibold text-amber-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-md rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder rows */}
              <tr className="border-t">
                <td className="px-4 py-2">#ORD123</td>
                <td className="px-4 py-2">Shivam Soni</td>
                <td className="px-4 py-2">20 Apr 2025</td>
                <td className="px-4 py-2">₹1,499</td>
                <td className="px-4 py-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Delivered</span>
                </td>
              </tr>
              {/* Add more rows from data */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white shadow-md rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
        <ul className="space-y-2">
          {['Black Hoodie', 'Oversized T-Shirt', 'Ripped Jeans'].map((product, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{product}</span>
              <span className="text-sm text-gray-500">150 sold</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
