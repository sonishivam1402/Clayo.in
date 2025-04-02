import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { ProductComponent } from "./ui/ProductCardComponent";
import GlobalContext from "../context/GlobalContext";
import { FaChevronRight } from "react-icons/fa";
import { Banner } from "./ui/Banner";
import { Filter } from "./ui/filter";
import { LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const NewArrivals = () => {

    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [tempCart, setTempCart] = useState([]);
    const { cartItem, setCartItem } = useContext(GlobalContext);
    const [filter, setfilter] = useState(false)
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/${category}`
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
    }, [category]);

    // Function to update quantity for a specific product
    const updateQuantity = (productId, change) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: Math.max(0, prevQuantities[productId] + change), // Ensure it doesn't go below 0
        }));
    };

    const addToCart = (quantity, product) => {
        alert(quantity + " " + product.title + " added to cart !!")
        const newItem = { "Product": product, "Qty": quantity }
        setTempCart(prevData => [...prevData, newItem]);

    }

    useEffect(() => {
        console.log("cart item : ", cartItem);
    
        // Retrieve existing cart from localStorage or initialize an empty object
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    
        const updatedCart = tempCart.reduce((acc, item) => {
            const title = item.Product.title;
    
            // Check if the product already exists in localStorage
            if (storedCart[title]) {
                acc[title] = {
                    ...storedCart[title], // Keep existing product data
                    Qty: storedCart[title].Qty + item.Qty // Update quantity
                };
            } else {
                acc[title] = { ...item }; // Add new product
            }
    
            return acc;
        }, { ...storedCart }); // Merge with existing cart
    
        console.log("final cart", updatedCart);
        
        // Store updated cart in localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        
        // Update state
        //setCartItem(updatedCart);
    
    }, [tempCart]);
    
    
    const handleFilter = (data) => {
        setCategory(data)
    }
    


    return (
        <div >
            <Banner src="1.png" />
            <div className="p-6 w-screen h-auto text-left">
                <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center gap-4 relative">
                        <span className="text-3xl font-bold text-amber-700">New Arrivals</span>
                        <LuFilter className="text-amber-800 hover:cursor-pointer" size={24} onClick={() => setfilter(true)} />
                        {filter && (
                            <div className="absolute top-0 left-0 sm:left-80 z-10">
                                <Filter close={() => setfilter(false)} handleFilter={handleFilter}/>
                            </div>
                        )}
                    </div>

                    <FaChevronRight
                        onClick={() => {
                            document.getElementById('product-container').scrollBy({
                                left: 250,
                                behavior: "smooth"
                            });
                        }}
                        className="cursor-pointer"
                    />

                </div>
                <div className="my-5.5 flex gap-2 overflow-x-scroll overflow-y-hidden hide-scrollbar" id="product-container">
                    {products.length > 0 ? (
                        products.map((p, i) => (
                            <div key={i} className="flex-shrink-0">
                                <ProductComponent
                                    imgsrc={p.image}
                                    imgclick={() => navigate('/detailedProduct', { state: p })}
                                    imgalt={i}
                                    title={p.title}
                                    price={p.price}
                                    rating={p.rating.rate}
                                    quan={quantities[p.id]}
                                    cart={() => addToCart(quantities[p.id], p)}
                                    subQuan={() => updateQuantity(p.id, -1)}
                                    addQuan={() => updateQuantity(p.id, 1)}
                                    neqQuan={quantities[p.id]}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Loading products...</p>
                    )}
                </div>
            </div>

        </div>
    );
};
