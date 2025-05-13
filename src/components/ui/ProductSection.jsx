import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { ProductComponent } from "./ProductCardComponent";
import { Banner } from "./Banner";
import { Filter } from "./filter";
import Product from "../../utils/api/Product";
import AddOrUpdateCart from "../../utils/api/cart/AddOrUpdateCart";
import { toast } from "react-toastify";
import { FaChevronRight, FaSearch  } from "react-icons/fa";
import { IoFilter, IoClose} from "react-icons/io5";

export const ProductSection = ({ title, category }) => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [tempCart, setTempCart] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setCartItem } = useContext(GlobalContext);
    const [searchText, setSearchText] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // fetching data from sql
                const data = await Product();

                if (data) {
                    const filterData = category ? data.filter((d) => d.category === category) : data;
                    setProducts(filterData);
                    setOriginalProducts(filterData);
                    // initializing default quantities to zero for add to cart option, mapped with product id
                    const initialQuantities = data.reduce((acc, product) => {
                        acc[product.productId] = 0;
                        return acc;
                    }, {});
                    setQuantities(initialQuantities);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Unable to load products. Please try again later.");
            } finally {
                setIsLoading(false);
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
        if (quantity <= 0) {
            toast.info("Please select at least one item");
            return;
        }
        
        if (user) {
            try {
                const response = await AddOrUpdateCart(user.userId, user.cartId, product.productId, quantity);
                if (response) {
                    toast.success(response);
                    // Reset quantity after adding to cart
                    updateQuantity(product.productId, -quantity);
                }
            } catch (err) {
                toast.error("Failed to add item to cart. Please try again.");
            }
        } else {
            toast.error("Please sign in to add items to your cart");
            navigate('/login');
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
        const filterData = value
            ? originalProducts.filter((d) => d.title.toLowerCase().includes(value.toLowerCase()))
            : originalProducts;
        setProducts(filterData);
    };
    
    const handleFilterToggle = () => {
        setFilterVisible(!filterVisible);
    };
    
    const scrollProducts = (direction) => {
        const container = document.getElementById('product-container');
        const scrollAmount = direction === 'right' ? 300 : -300;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Render loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Banner src="1.png" />
                <div className="mt-12 flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-amber-700 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-xl font-serif text-gray-700">Loading collection...</p>
                </div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center">
                <Banner src="1.png" />
                <div className="mt-12 p-8 max-w-2xl mx-auto text-center">
                    <p className="text-2xl font-serif text-red-700 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-amber-700 text-white font-medium rounded hover:bg-amber-800 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <Banner src="1.png" />
            
            <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col space-y-6">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">
                            {title}
                        </h1>
                        
                        {/* Search and Filter Container */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            {/* Search Input */}
                            <div className="relative flex-grow max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaSearch size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchText}
                                    placeholder="Search collection..."
                                    className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all font-light"
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            
                            {/* Filter Button */}
                            {/* <button 
                                onClick={handleFilterToggle}
                                className="flex items-center justify-center px-5 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                <IoFilter size={18} className="mr-2" />
                                <span className="font-medium">Filter</span>
                            </button> */}
                        </div>
                    </div>
                    
                    {/* Filter Panel - conditionally rendered */}
                    {/* {filterVisible && (
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-serif font-medium">Refine Selection</h3>
                                <button onClick={handleFilterToggle} className="text-gray-500 hover:text-gray-700">
                                    <IoClose size={20} />
                                </button>
                            </div>
                            <Filter />
                        </div>
                    )} */}

                    {/* Product Display Section */}
                    <div className="relative">
                        {/* Navigation Controls */}
                        <div className="absolute top-1/2 -left-4 -translate-y-1/2 hidden lg:block">
                            <button 
                                onClick={() => scrollProducts('left')}
                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                            >
                                <FaChevronRight size={20} className="transform rotate-180 z-500!" />
                            </button>
                        </div>
                        
                        <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden lg:block">
                            <button 
                                onClick={() => scrollProducts('right')}
                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                            >
                                <FaChevronRight size={20} className="z-500!"/>
                            </button>
                        </div>
                        
                        {/* Products Container */}
                        <div 
                            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar" 
                            id="product-container"
                        >
                            {products.length > 0 ? (
                                products.map((p, i) => (
                                    <div key={i} className="flex-shrink-0 snap-start">
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
                                <div className="w-full py-16 text-center">
                                    <p className="text-lg text-gray-500">No products found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Navigation Controls */}
                    <div className="flex justify-center gap-4 mt-4 lg:hidden">
                        <button 
                            onClick={() => scrollProducts('left')}
                            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                        >
                            <FaChevronRight size={20} className="transform rotate-180" />
                        </button>
                        <button 
                            onClick={() => scrollProducts('right')}
                            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                        >
                            <FaChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};