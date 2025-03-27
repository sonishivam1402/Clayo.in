import { useState } from "react";
import GlobalContext from "./GlobalContext";

export default function GlobalContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [cartItem, setCartItem] = useState({});

    return (
        <GlobalContext.Provider value={{ user, setUser, cartItem, setCartItem }}>
            {children}
        </GlobalContext.Provider>
    );
}