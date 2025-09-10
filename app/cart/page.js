"use client";
export const dynamic = "force-dynamic";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Save cart data to Firestore
  const handleSaveCart = async () => {
    if (cartItems.length === 0) {
      alert("❌ Cart is empty, nothing to save.");
      return;
    }
    try {
      await addDoc(collection(db, "carts"), {
        items: cartItems,
        totalPrice,
        createdAt: serverTimestamp(),
      });
      alert("✅ Cart saved to Firebase!");
    } catch (error) {
      console.error("❌ Error saving cart:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 w-full">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex md:w-[700px] w-[300px] justify-between items-center bg-white shadow p-4 mb-2 rounded-lg"
              >
                <div className="flex w-full flex-col">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-contain"
                  />
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>${item.price}</p>
                  <div className="flex items-center space-x-2">
                    <p>Color: </p>
                    <span
                      className="h-5 w-5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col mb-10 md:flex-row justify-between items-center">
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
            >
              Clear Cart
            </button>

            <button
              onClick={handleSaveCart}
              className="mt-4 md:ml-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Save Cart to Firebase
            </button>

            <button className="mt-4 md:ml-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
              Total price: ${totalPrice}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
