import { useContext, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));

    const storeTokenInLS = (serverToken) => {
        setToken("serverToken")
        return localStorage.setItem("token", serverToken);
    }

    const handleLogout = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error("useAuth used outside of the provider.");
    }
    return authContextValue;
}