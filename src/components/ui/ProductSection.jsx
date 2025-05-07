import React, { useEffect, useState, useContext } from "react";
import { FaChevronRight } from "react-icons/fa";
import { LuFilter } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { ProductComponent } from "./ProductCardComponent";
import { Banner } from "./Banner";
import { Filter } from "./filter";
import Product from "../../utils/api/Product";
import AddOrUpdateCart from "../../utils/api/cart/AddOrUpdateCart";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

export const ProductSection = ({ title, category }) => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [tempCart, setTempCart] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const navigate = useNavigate();
    const { setCartItem } = useContext(GlobalContext);
    const [searchText, SetSearchText] = useState("")

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const loadProducts = async () => {
            try {
                // fetching data from sql
                const data = await Product();

                if (data) {
                    const filterData = `${category}` ? data.filter((d) => { return d.category == `${category}` }) : data
                    setProducts(filterData);
                    setOriginalProducts(filterData);
                    // initializing default quantities to zero for add to cart option , and it is mapped with product id
                    const initialQuantities = data.reduce((acc, product) => {
                        acc[product.productId] = 0;
                        return acc;
                    }, {});
                    setQuantities(initialQuantities);
                }

            }
            catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts();
    }, [category]);

    // function to update quantity for add to cart 
    const updateQuantity = (productId, change) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Math.max(0, prev[productId] + change),
        }));
    };

    const addToCart = async (quantity, product) => {
        if (user) {
            const response = await AddOrUpdateCart(user.userId, user.cartId, product.productId, quantity)
            if (response) {
                toast.success(response);
            }
        } else {
            toast.error("Login To Proceed !!");
            navigate('/login');
        }

    };

    const handleSearch = (value) => {
        SetSearchText(value);
        const filterData = value
            ? originalProducts.filter((d) => d.title.toLowerCase().includes(value.toLowerCase()))
            : originalProducts;
        setProducts(filterData);
    }

    return (
        <div>
            <Banner src="1.png" />
            <div className="p-6 w-screen h-auto text-left">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 relative">
                        <span className="text-3xl font-bold text-amber-700">{title}</span>
                        {/* {!category && (
                            <>
                                <LuFilter className="text-amber-800 cursor-pointer" size={24} onClick={() => setFilterVisible(true)} />
                                {filterVisible && (
                                    <div className="absolute top-0 left-0 sm:left-80 z-10">
                                        <Filter close={() => setFilterVisible(false)} />
                                    </div>
                                )}
                            </>
                        )} */}
                        <div className="p-2 w-80 border-2 border-amber-800 rounded-2xl flex items-center gap-3">
                            <FaSearch className="text-amber-800" />
                            <input type="text" value={searchText}
                                placeholder="Search Name..."
                                className="w-full text-amber-800 border-none outline-none focus:ring-0 focus:border-transparent"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
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


