import React, { useState, useEffect } from 'react';
import { FaEye , FaEdit, FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Product from "../../utils/api/Product";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'Active',
    image: '',
  });

  const loadProducts = async () => {
    const result = await Product();
    setProducts(result);
    console.log(result);
  }

  useEffect(() => {
    loadProducts();
  }, [])

  const filteredProducts = products.filter(p => {
    return (
      (!filterCategory || p.category === filterCategory) &&
      (!filterStatus || p.status === filterStatus)
    );
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setNewProduct({ ...newProduct, image: imgURL });
    }
  };

  const handleAddProduct = () => {
    const id = products.length + 1;
    setProducts([...products, { ...newProduct, id }]);
    setIsModalOpen(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'Active',
      image: '',
    });
  };

  return (
    <div className="p-6 w-full bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <MdAdd size={18} /> Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="px-3 py-2 border rounded-md"
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men</option>
          <option value="Women">Women</option>
        </select>

        <select
          className="px-3 py-2 border rounded-md"
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4">{product.title}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.rating_rate}⭐</td>
                {/* <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {product.status}
                  </span>
                </td> */}
                <td className="px-6 py-4 flex gap-3 justify-center">
                  <button className="text-blue-600 hover:text-blue-800" title="View">
                    <FaEye className="w-5 h-5" />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700" title="Edit">
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-800" title="Delete">
                    <FaTrash  className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Add Product</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full px-4 py-2 border rounded-md"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full px-4 py-2 border rounded-md"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              />
              <input
                type="text"
                placeholder="Price"
                className="w-full px-4 py-2 border rounded-md"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Stock"
                className="w-full px-4 py-2 border rounded-md"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
              />
              <input
                type="file"
                accept="image/*"
                className="w-full"
                onChange={handleImageUpload}
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
