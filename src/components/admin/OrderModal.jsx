import React, { useState, useEffect } from 'react';
import UpdateOrderStatus from '../../utils/api/admin/UpdateOrderStatus';
import { toast } from 'react-toastify';

const OrderModal = ({ isOpen, onClose, orderData, statusOptions }) => {
  //const [statusOptions, setStatusOptions] = useState([]);
  const [loadingStatusOptions, setLoadingStatusOptions] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  
  if (!isOpen || !orderData) return null;
  
  // Calculate order totals
  const subtotal = orderData.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = orderData.tax || subtotal * 0.085; // Use tax from data or calculate
  const shipping = orderData.shippingCost || 0;

  // Handle status change
  const handleStatusChange = async (itemId, newStatus) => {
    console.log(itemId,newStatus);
    const success = await UpdateOrderStatus(itemId, newStatus);
    if (success) {
      setActiveDropdownId(null);
      toast.success(success.message);
      onClose();
      // if (onStatusUpdate) {
      //   onStatusUpdate(orderData.orderNumber, itemId, shippingId, newStatus);
      // }
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-40 z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl overflow-hidden max-h-[90vh]">
        {/* Header */}
        <div className="bg-amber-800 text-white px-6 py-4 flex justify-between items-center sticky top-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Order #{orderData.orderNumber}</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              orderData.status === 'Delivered' ? 'bg-green-700 text-white' :
              orderData.status === 'Shipped' ? 'bg-blue-700 text-white' :
              orderData.status === 'Processing' ? 'bg-yellow-700 text-white' :
              orderData.status === 'Cancelled' ? 'bg-red-700 text-white' :
              'bg-gray-700 text-white'
            }`}>
              {orderData.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-68px)]">
          {/* Order Info & Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Order Details */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date Placed:</span>
                  <span className="font-medium">{new Date(orderData.placedAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{orderData.paymentMethod || "Credit Card"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className={`font-medium ${orderData.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {orderData.paymentStatus || "Paid"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Customer Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Name:</span> <span className="font-medium">{orderData.customer}</span></p>
                <p><span className="text-gray-600">Email:</span> <span className="font-medium">{orderData.email || "customer@example.com"}</span></p>
                <p><span className="text-gray-600">Phone:</span> <span className="font-medium">{orderData.phone || "+1 (555) 123-4567"}</span></p>
                <p><span className="text-gray-600">Customer ID:</span> <span className="font-medium">{orderData.customerId || "CID12345"}</span></p>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">Shipping Information</h3>
              <div className="space-y-2 text-sm">
                {orderData.shippingAddress ? (
                  <>
                    <p><span className="text-gray-600">Address:</span> <span className="font-medium">{orderData.shippingAddress.street}</span></p>
                    <p><span className="text-gray-600">City:</span> <span className="font-medium">{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}</span></p>
                    <p><span className="text-gray-600">Country:</span> <span className="font-medium">{orderData.shippingAddress.country}</span></p>
                  </>
                ) : (
                  <p className="font-medium">123 Fashion St, New York, NY 10001, USA</p>
                )}
                <p>
                  <span className="text-gray-600">Shipping Method:</span> 
                  <span className="font-medium">{orderData.shippingMethod || "Standard Shipping"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="mb-6">
            <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderData.orderItems.map((item) => (
                    <tr key={item.orderItemId} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={item.image || "/api/placeholder/60/60"} alt={item.title} className="h-full w-full object-cover object-center" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          item.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          item.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          item.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Shipping Details Section */}
          {orderData.orderItems.some(item => item.shippingOrders && item.shippingOrders.length > 0) && (
            <div className="mb-6">
              <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">Shipping Details</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Carrier</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tracking #</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Est. Delivery</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-left">
                    {orderData.orderItems.map(item => 
                      item.shippingOrders && item.shippingOrders.map((shipping, idx) => (
                        <tr key={`${item.orderItemId}-${idx}`}>
                          <td className="px-4 py-3 text-sm">{item.title}</td>
                          <td className="px-4 py-3 text-sm">{shipping.carrier}</td>
                          <td className="px-4 py-3 text-sm font-medium">{shipping.trackingNumber}</td>
                          <td className="px-4 py-3 text-sm">{new Date(shipping.estimatedDeliveryDate).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${shipping.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              shipping.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                              shipping.status === 'Out for Delivery' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'}`}
                            >
                              {shipping.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 relative">
                            <div className="relative inline-block">
                              <button 
                                className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 flex items-center"
                                onClick={() => toggleDropdown(`${item.orderItemId}-${shipping.id || idx}`)}
                                disabled={updatingStatus || loadingStatusOptions}
                              >
                                {updatingStatus && activeDropdownId === `${item.orderItemId}-${shipping.id || idx}` ? (
                                  <span>Updating...</span>
                                ) : (
                                  <>
                                    Update Status
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                  </>
                                )}
                              </button>
                              
                              {activeDropdownId === `${item.orderItemId}-${shipping.id || idx}` && (
                                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                  {loadingStatusOptions ? (
                                    <div className="px-4 py-2 text-sm text-gray-500">Loading options...</div>
                                  ) : (
                                    <ul className="py-1">
                                      {Object.entries(statusOptions).map(([id,status]) => (
                                        <li key={id}>
                                          <button
                                            className={`block w-full text-left px-4 py-2 text-sm ${shipping.status === status.status ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => handleStatusChange(item.orderItemId,status.id)}
                                          >
                                            {status.status}
                                          </button>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Order Totals */}
          <div className="mb-6">
            <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">Order Totals</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span>${orderData.discount ? orderData.discount.toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${orderData.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Payment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span>{orderData.transactionId || "TXN-293847"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span>{orderData.paymentMethod || "Credit Card (****4242)"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Date:</span>
                      <span>{new Date(orderData.paymentDate || orderData.placedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Notes & Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Notes */}
            <div>
              <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">Order Notes</h3>
              <div className="bg-gray-50 p-4 rounded-md h-32 overflow-y-auto">
                {orderData.notes ? (
                  <p className="text-sm text-gray-700">{orderData.notes}</p>
                ) : (
                  <p className="text-sm text-gray-500 italic">No notes available for this order.</p>
                )}
              </div>
            </div>
            
            {/* Admin Actions */}
            <div>
              <h3 className="text-sm uppercase font-semibold text-gray-500 mb-3">Admin Actions</h3>
              <div className="bg-gray-50 p-4 rounded-md flex flex-wrap gap-2">
                <button className="px-3 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded hover:bg-gray-300">
                  Print Invoice
                </button>
                <button className="px-3 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded hover:bg-gray-300">
                  Print Packing Slip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;