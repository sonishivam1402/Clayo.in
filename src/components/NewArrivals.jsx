import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export const NewArrivals = () => {

    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    const colors = {
        orange: "#F2C265",
        grey: "a9a9a9"
    }
    const stars = Array(5).fill(0)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch(
                    "https://fakestoreapi.com/products/category/men's clothing"
                );
                const data = await response.json();
                console.log(data);
                setProducts(data);

                // Initialize quantity state with zero for each product
                const initialQuantities = data.reduce((acc, product) => {
                    acc[product.id] = 0;
                    return acc;
                }, {});
                setQuantities(initialQuantities);

            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts();
    }, []);

    // Function to update quantity for a specific product
    const updateQuantity = (productId, change) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max(0, prevQuantities[productId] + change), // Ensure it doesn't go below 0
        }));
    };

    return (
        <div className="p-6 w-screen h-auto text-left">
            <span className="text-3xl font-bold text-amber-700">New Arrivals</span>
            <div className="my-5.5 flex gap-6">
                {products.length > 0 ? (
                    products.slice(1, 5).map((p, i) => (
                        <div key={i} className="w-60 bg-white-200 border-2 border-amber-600 shadow-md  shadow-amber-800 rounded-xl place-items-center p-6">
                            <img src={p.image} className="max-w-40 max-h-40 object-cover mb-6 scale-100 hover:scale-110" />
                            <span className="w-full min-h-12 text-left block font-bold">{p.title}</span>

                            <div className=" m-1 w-full flex">
                                {stars.map((_, index) => {
                                    return (

                                        <FaStar
                                            key={index}
                                            size={16}
                                            color={Math.round(p.rating.rate) > index ? colors.orange : colors.grey}
                                        />

                                    )
                                })}
                            </div>
                            <div className="m-1 w-full flex justify-between items-center">
                                <span className="w-full text-left block text-gray-600">Price : ${p.price}</span>
                                <FaShoppingCart className="scale-100 hover:scale-150" />
                            </div>
                            <div className="flex items-center gap-6 mt-2">
                                <button
                                    className="p-2! hover:bg-gray-200!"
                                    onClick={() => updateQuantity(p.id, -1)}
                                    disabled={quantities[p.id] === 0}
                                >
                                    -
                                </button>
                                <span>{quantities[p.id]}</span>
                                <button
                                    className="p-2! hover:bg-gray-200!"
                                    onClick={() => updateQuantity(p.id, 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
            {/* <img src="banner.png" className="w-full h-160"/> */}
        </div>
    );
};
