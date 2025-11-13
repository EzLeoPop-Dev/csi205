import { useState } from "react";
import { useCart } from "../components/CartContext";
import productsData from "../data/Product.json";

export default function Product() {
    const { addToCart } = useCart();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentProducts = productsData.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(productsData.length / itemsPerPage);

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: parseFloat(product.Price),
            image: product.imgaes, 
        });
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-h-screen text-white ">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-10 text-center">🛍️ Product List</h1>

                {/* แสดงสินค้า */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-lg hover:scale-105 transition-all duration-300 flex flex-col"
                            style={{ minHeight: "400px" }}
                        >
                            <div>
                                <img
                                    src={product.imgaes}
                                    alt={product.name}
                                    className="w-full h-48 object-cover mb-4 rounded-xl"
                                />
                                <h2 className="text-xl font-semibold mb-2 break-words">{product.name}</h2>
                                <p className="text-gray-300 mb-4">
                                    ฿{parseFloat(product.Price).toLocaleString()}
                                </p>
                            </div>

                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-full font-medium hover:opacity-90 transition-all duration-300 mt-auto"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination Control */}
                <div className="flex justify-center items-center mt-10 gap-3">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-semibold ${currentPage === 1
                                ? "bg-pink-200 hover:bg-pink-400 cursor-not-allowed"
                                : "bg-pink-500 hover:bg-pink-600"
                            }`}
                    >
                        Prev
                    </button>

                    <span className="text-lg font-medium">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-semibold ${currentPage === totalPages
                                ? "bg-pink-100 hover:bg-pink-200 cursor-not-allowed"
                                : "bg-pink-500 hover:bg-pink-600"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
