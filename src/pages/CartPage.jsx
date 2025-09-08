// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api/cartApi";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await getCart();
      setCart(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(itemId);
      fetchCart(); // refresh cart after removal
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  if (loading) return <p className="p-6">Loading cart...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <a href="/">home</a>

      {!cart || cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((cartItem) => (
            <div
              key={cartItem.item._id}
              className="flex justify-between items-center border p-4 rounded shadow"
            >
              <div>
                <h2 className="text-lg font-semibold">{cartItem.item.name}</h2>
                <p className="text-gray-600">₹{cartItem.item.price}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {cartItem.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemove(cartItem.item._id)}
                className="bg-red-600 text-white px-3 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold">
              Total: ₹
              {cart.items.reduce(
                (sum, i) => sum + i.item.price * i.quantity,
                0
              )}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
