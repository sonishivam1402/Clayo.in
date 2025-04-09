import React, { useEffect, useState, useContext } from "react";
import { FaChevronRight } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { ProductComponent } from "./ProductCardComponent";
import { Banner } from "./Banner";
import { Filter } from "./filter";
import Product from "../../utils/api/Product";

export const ProductSection = ({ title, category }) => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [tempCart, setTempCart] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const navigate = useNavigate();
    const { setCartItem } = useContext(GlobalContext);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                //const response = await fetch(`https://fakestoreapi.com/products${category ? `/category/${category}` : ""}`);
                //const data = await response.json();
                
                const data = await Product();
                const filterData = `${category}` ? data.filter((d)=>{return d.category == `${category}`}) : data
                //console.log("filter",filterData)
            
                setProducts(filterData);

                const initialQuantities = data.reduce((acc, product) => {
                    acc[product.productId] = 0;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts();
    }, [category]);

    const updateQuantity = (productId, change) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Math.max(0, prev[productId] + change),
        }));
    };

    const addToCart = (quantity, product) => {
        alert(`${quantity} ${product.title} added to cart!`);
        const newItem = { "Product": product, "Qty": quantity };
        setTempCart((prevData) => [...prevData, newItem]);
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || {};

        const updatedCart = tempCart.reduce((acc, item) => {
            const title = item.Product.title;

            if (storedCart[title]) {
                acc[title] = {
                    ...storedCart[title],
                    Qty: storedCart[title].Qty + item.Qty,
                };
            } else {
                acc[title] = { ...item };
            }

            return acc;
        }, { ...storedCart });

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItem(updatedCart);
    }, [tempCart, setCartItem]);

    return (
        <div>
            <Banner src="1.png" />
            <div className="p-6 w-screen h-auto text-left">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 relative">
                        <span className="text-3xl font-bold text-amber-700">{title}</span>
                        {!category && (
                            <>
                                <LuFilter className="text-amber-800 cursor-pointer" size={24} onClick={() => setFilterVisible(true)} />
                                {filterVisible && (
                                    <div className="absolute top-0 left-0 sm:left-80 z-10">
                                        <Filter close={() => setFilterVisible(false)} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <FaChevronRight
                        onClick={() => document.getElementById('product-container').scrollBy({ left: 250, behavior: "smooth" })}
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
                                    imgalt={p.title}
                                    title={p.title}
                                    price={p.price}
                                    rating={p.rating_rate}
                                    quan={quantities[p.productId]}
                                    cart={() => addToCart(quantities[p.productId], p)}
                                    subQuan={() => updateQuantity(p.productId, -1)}
                                    addQuan={() => updateQuantity(p.productId, 1)}
                                    neqQuan={quantities[p.productId]}
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


