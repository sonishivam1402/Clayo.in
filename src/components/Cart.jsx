import React, { useEffect, useState } from 'react';
//import { X, ShoppingBag, Trash2 } from "lucide-react";
//import { RxCross2 } from "react-icons/rx";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import GetCartItem from "../utils/api/cart/GetCartItem";
import DeleteCartItem from "../utils/api/cart/DeleteCartItem";
import placeOrder from '../utils/api/order/placeOrder';
import PageLoader from './ui/PageLoader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const [cartItems, setCartItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const loadCart = async () => {
        const response = await GetCartItem(user.cartId);
        if (response) {
            setCartItems(response);
            // Initialize all items as selected by default
            const initialSelectedState = {};
            Object.entries(response).forEach(([key, item]) => {
                initialSelectedState[item.cartItemId] = true;
            });
            setSelectedItems(initialSelectedState);
        }
    };

    useEffect(() => {
        scrollTo({ top: 0, behavior: 'smooth' });
        loadCart();
    }, []);

    const calculateSubtotal = () => {
        let total = 0;
        Object.entries(cartItems).forEach(([key, item]) => {
            if (selectedItems[item.cartItemId]) {
                total += parseFloat(item.price) * item.quantity;
            }
        });
        return total.toFixed(2);
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const shipping = 15.00; // Luxury brands often have premium shipping
        return (subtotal + shipping).toFixed(2);
    };

    const handleCheckboxChange = (cartItemId) => {
        setSelectedItems(prev => ({
            ...prev,
            [cartItemId]: !prev[cartItemId]
        }));
    };

    const handleBuy = async () => {
        setLoading(true);

        const selectedCartItemIds = Object.entries(selectedItems)
            .filter(([id, isSelected]) => isSelected)
            .map(([id]) => id);

        if (selectedCartItemIds.length > 0) {
            const cartItemIds = selectedCartItemIds.toString();

            try {
                const response = await placeOrder(user.email, user.cartId, cartItemIds);
                if (response) {
                    toast.success("Order placed successfully");

                    // Update cart by removing purchased items
                    const updatedCart = { ...cartItems };
                    selectedCartItemIds.forEach(id => {
                        const keyToDelete = Object.entries(cartItems).find(([key, item]) =>
                            item.cartItemId === id
                        )?.[0];

                        if (keyToDelete) {
                            delete updatedCart[keyToDelete];
                        }
                    });

                    setCartItems(updatedCart);
                }
            } catch (error) {
                toast.error("Failed to place order");
            }
        } else {
            toast.error("Please select at least one item");
        }

        setLoading(false);
    };

    const handleDelete = async (index, cartItemId, productId) => {
        try {
            const response = await DeleteCartItem(user.cartId, cartItemId, productId);
            toast.success(response);

            try {
                const updatedCart = { ...cartItems };
                delete updatedCart[index];
                setCartItems(updatedCart);

                const updatedSelected = { ...selectedItems };
                delete updatedSelected[cartItemId]; 
                setSelectedItems(updatedSelected);
            } catch (stateError) {
                console.error("State update error:", stateError);
                toast.error("State update failed");
            }

        } catch (error) {
            console.error("DeleteCartItem error:", error);
            toast.error("Failed to remove item");
        }

    };

    const handleQuantityChange = (key, newQuantity) => {
        if (newQuantity >= 1) {
            setCartItems(prev => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    quantity: newQuantity
                }
            }));
        }
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <PageLoader title="Processing your order..." />
                </div>
            )}

            <div className="min-h-screen bg-amber-50">
                <div className="w-screen mx-auto px-6 py-12">
                    <h1 className="text-3xl font-light tracking-wide text-amber-800 mb-8 text-center uppercase">Shopping Bag</h1>

                    {Object.keys(cartItems).length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items Column */}
                            <div className="lg:col-span-2 bg-white p-6 shadow-sm">
                                <div className="space-y-6">
                                    {Object.entries(cartItems).map(([key, item]) => (
                                        <div key={key} className="flex items-center border-b border-amber-100 pb-6 last:border-0">
                                            <div className="mr-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems[item.cartItemId] || false}
                                                    onChange={() => handleCheckboxChange(item.cartItemId)}
                                                    id={item.cartItemId}
                                                    name="cart"
                                                    className="h-4 w-4 text-black focus:ring-black border-amber-700 rounded"
                                                />
                                            </div>

                                            <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-amber-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-6 flex-1 flex flex-col">
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm font-medium text-amber-700">{item.title}</h3>
                                                    <p className="text-sm font-medium text-amber-800">${parseFloat(item.price).toFixed(2)}</p>
                                                </div>

                                                <div className="flex justify-between mt-4 items-center">
                                                    <div className="flex items-center border border-amber-700">
                                                        <button
                                                            className="px-3 py-1 text-amber-700"
                                                            onClick={() => handleQuantityChange(key, item.quantity - 1)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 py-1 border-x border-amber-700">{item.quantity}</span>
                                                        <button
                                                            className="px-3 py-1 text-amber-700"
                                                            onClick={() => handleQuantityChange(key, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => handleDelete(key, item.cartItemId, item.productId)}
                                                        className="text-amber-700 hover:text-amber-700 transition-colors"
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary Column */}
                            <div className="bg-white p-6 shadow-sm h-fit">
                                <h2 className="text-lg font-medium text-amber-900 mb-6 uppercase tracking-wide">Order Summary</h2>

                                <div className="space-y-4 border-b border-amber-700 pb-6">
                                    <div className="flex justify-between text-sm">
                                        <p className="text-amber-700">Subtotal</p>
                                        <p className="text-amber-800 font-medium">${calculateSubtotal()}</p>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <p className="text-amber-700">Shipping</p>
                                        <p className="text-amber-800 font-medium">$15.00</p>
                                    </div>
                                </div>

                                <div className="flex justify-between py-6 text-base font-mediu">
                                    <p className='text-amber-700'>Total</p>
                                    <p className='text-amber-800 font-medium'>${calculateTotal()}</p>
                                </div>

                                <button
                                    onClick={handleBuy}
                                    className="w-full bg-amber-700 text-white py-4 px-6 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-900"
                                >
                                    Proceed to Checkout
                                </button>

                                <div className="mt-6">
                                    <div className="flex items-center justify-center">
                                        <FaShoppingBag className="h-5 w-5 text-amber-700 mr-2" />
                                        <span className="text-xs text-amber-700 uppercase tracking-wide">Secure Checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FaShoppingBag className="mx-auto h-12 w-12 text-amber-700" />
                            <h2 className="mt-4 text-lg font-medium text-amber-900">Your shopping bag is empty</h2>
                            <p className="mt-2 text-sm text-amber-700">Browse our collection to find something you'll love.</p>
                            <div className="mt-6">
                                <button onClick={() => navigate("/new-arrivals")} className="inline-flex items-center px-6 py-3 border border-amber-700 text-sm font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700">
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}