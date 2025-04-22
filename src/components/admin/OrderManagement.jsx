import React from 'react';
import { MdCancel, MdRemoveRedEye } from "react-icons/md";
import { FaTruck } from "react-icons/fa";

const orders = [
  {
    id: 'ORD001',
    customer: 'Shivam Soni',
    date: '2025-04-20',
    amount: '₹2,199',
    paymentStatus: 'Paid',
    deliveryStatus: 'Shipped',
  },
  {
    id: 'ORD002',
    customer: 'Priya Mehta',
    date: '2025-04-19',
    amount: '₹999',
    paymentStatus: 'Pending',
    deliveryStatus: 'Processing',
  },
];

const OrderManagement = () => {
  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Order Management</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {order.deliveryStatus}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-3 justify-center">
                  <button title="View" className="text-blue-600 hover:text-blue-800">
                    <MdRemoveRedEye className="w-5 h-5" />
                  </button>
                  <button title="Update Status" className="text-green-600 hover:text-green-800">
                    <FaTruck className="w-5 h-5" />
                  </button>
                  <button title="Cancel Order" className="text-red-600 hover:text-red-800">
                    <MdCancel className="w-5 h-5" />
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

export default OrderManagement;
