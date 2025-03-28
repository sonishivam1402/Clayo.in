import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { ProductComponent } from "./ui/ProductCardComponent";
import GlobalContext from "../context/GlobalContext";

export const NewArrivals = () => {

    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [tempCart, setTempCart] = useState([]);
    const {cartItem, setCartItem} = useContext(GlobalContext);

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

    const addToCart = (quantity, product) => {
        alert(quantity + " " + product.title + " added to cart !!")
        const newItem = {"Product" : product, "Qty" : quantity}
        setTempCart(prevData => [...prevData , newItem]);
        
    }

    useEffect(()=>{
        console.log("cart item : ",cartItem);
        
        const final = tempCart.reduce((acc,item)=>{
            if(acc[item.Product.title]){
                acc[item.Product.title]=item
            }else{
                acc[item.Product.title]=item
            }   
            
            return acc;
            
            },{});
            console.log("final cart",final)

            setCartItem(final)
    },[tempCart])

    return (
        <div className="p-6 w-screen h-auto text-left" >
            <span className="text-3xl font-bold text-amber-700">New Arrivals</span>
            <div className="my-5.5 flex gap-2">
                {products.length > 0 ? (
                    products.slice(1, 5).map((p, i) => (
                        <ProductComponent key={i} imgsrc={p.image} imgalt={i} title={p.title} price={p.price} rating={p.rating.rate} quan={quantities[p.id]} cart={()=>{addToCart(quantities[p.id], p)}} subQuan={()=>{updateQuantity(p.id, -1)}} addQuan={()=>{updateQuantity(p.id, 1)}} neqQuan={quantities[p.id]}/>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
};
