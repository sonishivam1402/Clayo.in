import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Product from "../../utils/api/Product";
import AddOrUpdateProduct from '../../utils/api/admin/AddOrUpdateProduct';
import { toast } from 'react-toastify';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    rating_rate: '',
    rating_count: ''
  });

  const loadProducts = async () => {
    const result = await Product();
    setProducts(result);
    console.log(result);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    return (!filterCategory || p.category === filterCategory);
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setFormData({ ...formData, image: imgURL });
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProductId(null);
    setFormData({
      title: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      image: '',
      rating_rate: '',
      rating_count: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setCurrentProductId(product.productId);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
      stock: product.stock || 0,
      description: product.description,
      image: product.image,
      rating_rate : product.rating_rate,
      rating_count : product.rating_count
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (isEditing) {
      
      const result = await AddOrUpdateProduct({ productId: currentProductId, ...formData });
      if (result) {
        const updatedProducts = products.map(product =>
          product.productId === currentProductId
            ? { ...product, ...formData }
            : product
        );
        setProducts(updatedProducts);
        toast.success(result.message);
      }
      //console.log("Updated product:", { id: currentProductId, ...formData });

    } else {
      const newProduct = {
        productId: null,
        ...formData,
        rating_rate: 0 // Default rating for new products
      };
      const result = await AddOrUpdateProduct(newProduct);
      if (result) {
        setProducts([...products, newProduct]);
        toast.success(result.message);
      }

      //console.log("Added new product:", newProduct);
    }

    // Close modal and reset form
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentProductId(null);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.productId !== productId));
      // Here you would typically make an API call to delete the product
      console.log("Deleted product:", productId);
    }
  };

  return (
    <div className="p-6 w-screen bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Management</h2>
        <button
          onClick={openAddModal}
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
          value={filterCategory}
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>

        {/* <select
          className="px-3 py-2 border rounded-md"
          onChange={(e) => setFilterStatus(e.target.value)}
          value={filterStatus}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select> */}
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
            {filteredProducts.map((product) => (
              <tr key={product.productId} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4">{product.title}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${Number(product.price).toFixed(2)}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.rating_rate}⭐</td>
                <td className="px-6 py-8 flex gap-3 justify-center items-center">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 hover:cursor-pointer hover:scale-120"
                    title="Edit"
                    onClick={() => openEditModal(product)}
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  {/* <button
                    className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                    title="Delete"
                    onClick={() => handleDelete(product.productId)}
                  >
                    <FaTrash className="w-5 h-5" />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white-30 backdrop-blur-md bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-full max-w-4xl shadow-xl relative">
            <div className="border-b pb-4 mb-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={formData.title}
                    onChange={handleFormChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Category</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={formData.price}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={formData.stock}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={formData.description || ''}
                    onChange={handleFormChange}
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <input
                      type="number"
                      name="rating_rate"
                      step="0.1"
                      min="0"
                      max="5"
                      placeholder="0.0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      value={formData.rating_rate || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating Count</label>
                    <input
                      type="number"
                      name="rating_count"
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      value={formData.rating_count || ''}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {formData.image && (
                      <div className="flex-shrink-0">
                        <img
                          src={formData.image}
                          alt="Product preview"
                          className="h-20 w-20 object-cover rounded-md border-2 border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors hover:cursor-pointer"
              >
                {isEditing ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
    

export default ProductManagement;