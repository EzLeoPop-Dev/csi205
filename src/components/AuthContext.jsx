import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // { username, role }
    const navigate = useNavigate();

    const login = (username, password) => {
        if ((username === "user" || username === "admin") && password === "1234") {
            const role = username === "admin" ? "admin" : "user";
            setUser({ username, role });
            navigate("/home"); // ทุกคนเข้า Home หลัง Login
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
