import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useState, useEffect } from "react";
import productsData from "../data/Product.json"; // import ข้อมูลสินค้า

export default function Navbar() {
    const location = useLocation();
    const { cartItems } = useCart();
    const { user, logout } = useAuth();

    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        if (productsData && Array.isArray(productsData)) {
            setProductCount(productsData.length);
        }
    }, []);

    const allLinks = [
        { name: "Home", path: "/home" },
        { name: "Calculator", path: "/calculator" },
        { name: "Animation", path: "/animation" },
        { name: "Components", path: "/components" },
        { name: "Todolist", path: "/todolist" },
        { name: "Product", path: "/product" },
        { name: "Carts", path: "/carts" },
    ];

    // filter ตาม role
    const links = allLinks.filter(link => {
        if (!user) return false;
        if (user.role === "admin") return link.name !== "Product" && link.name !== "Carts";
        return true;
    });

    return (
        <nav className="py-4">
            <div className="flex justify-center gap-6">
                {links.map(link => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link key={link.name} to={link.path}>
                            <button
                                className={`relative px-5 py-2 font-semibold rounded-full text-white text-lg transition-all duration-300 
                ${isActive ? "bg-white/20 scale-105 shadow-md" : "bg-zinc-800/10 hover:bg-white/10 hover:scale-105"}`}
                            >
                                {link.name}

                                {/* แสดงจำนวนสินค้าเฉพาะ Product */}
                                {link.name === "Product" && (
                                    <span className="ml-2 text-pink-400 text-sm">
                                        ({productCount})
                                    </span>
                                )}

                                {/* แสดงจำนวนสินค้าใน Cart */}
                                {link.name === "Carts" && cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-[2px] rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                        </Link>
                    );
                })}

                {user && (
                    <button
                        onClick={logout}
                        className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-full font-semibold"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}
