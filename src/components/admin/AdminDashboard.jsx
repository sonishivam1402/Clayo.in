import React, { useEffect, useState } from 'react';
import { IoOpenOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import GetDashboardData from '../../utils/api/admin/Dashboard';
import dayjs from 'dayjs';

const AdminDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [recentOrder, setRecentOrder] = useState("");
  const [topSelling, setTopSelling] = useState("");

  const loadData = async () => {
    const result = await GetDashboardData(user.id, user.roleId);
    setData(result.data);
    setRecentOrder(result.data.recentOrders);
    setTopSelling(result.data.mostOrderedProducts)
  }

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }

    loadData();

  }, [])

  return (
    <div className="p-6 space-y-6 w-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: (`${data.totalUsers}` || '1,245'), to: ("/admin/users") },
          { title: 'Total Orders', value: (`${data.totalOrders}` || '578'), to: ("/admin/orders")  },
          { title: 'Total Revenue', value: (`${data.totalRevenue}` || '₹1,25,000'), to: ("/admin/dashboard")  },
          { title: 'Products in Stock', value: (`${data.totalProducts}` || '342'), to: ("/admin/products")  }
        ].map((card, index) => (
          <div key={index} className="relative bg-white shadow-md rounded-2xl p-5 hover:scale-105 hover:cursor-pointer" onClick={()=>(navigate(card.to))}>
            <IoOpenOutline className='absolute bottom-1 right-1' color='brown' />
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
                {Object.entries(recentOrder).map(([index,value])=>(
                  <tr key={index} className="border-t">
                  <td className="px-4 py-2">#{value.orderNo || 'ORD123'}</td>
                  <td className="px-4 py-2">{value.userName || 'Shivam Soni'}</td>
                  <td className="px-4 py-2">{dayjs(value.placedAt).format('DD MMMM YYYY, hh:MM a') || '20 Apr 2025'}</td>
                  <td className="px-4 py-2">{value.totalAmount || '₹1,499'}</td>
                  <td className="px-4 py-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{value.status || 'Delivered'}</span>
                  </td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white shadow-md rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
        <ul className="space-y-2">
        {Object.entries(topSelling).map(([index,value]) => (
            <li key={index} className="flex justify-between items-center">
              <span>{value.productName}</span>
              <span className="text-sm text-gray-500">{value.quantity} sold</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
