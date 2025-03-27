import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { ProductComponent } from "./ui/ProductCardComponent";

export const NewArrivals = () => {

    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

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
            <div className="my-5.5 flex gap-2">
                {products.length > 0 ? (
                    products.slice(1, 5).map((p, i) => (
                        <ProductComponent  imgsrc={p.image} imgalt={i} title={p.title} rating={p.rating.rate} quan={quantities[p.id]} subQuan={()=>{updateQuantity(p.id, -1)}} addQuan={()=>{updateQuantity(p.id, 1)}} neqQuan={quantities[p.id]}/>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
            {/* <img src="banner.png" className="w-full h-160"/> */}
        </div>
    );
};
