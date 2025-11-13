import { useCart } from "../components/CartContext";

export default function Carts() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br text-white pt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-10 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/10 rounded-2xl p-5 shadow-lg text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-300 mb-2">
                    ฿{item.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-full text-sm text-white"
                  >
                    Delete from Cart
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center space-y-3">
              <p className="text-xl">
                Products: <span className="text-pink-400">{cartItems.length}</span> items -{" "}
                Total price:{" "}
                <span className="text-green-400">฿{total.toLocaleString()}</span>
              </p>
              <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full text-black font-semibold">
                Checkout 💳
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
