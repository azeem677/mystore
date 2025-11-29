
// "use client";

// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
//  // Adjust path
// import { useRouter } from "next/navigation";
// import { clearCart, removeFromCart } from "../store/cartSlice";

// export default function CartPage() {
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

//   const [address, setAddress] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     city: "",
//     province: "",
//     street: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   // Save cart + address to backend
//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) {
//       alert("❌ Cart is empty, nothing to save.");
//       return;
//     }

//     // Validate address
//     for (let key in address) {
//       if (!address[key]) {
//         alert(`❌ Please fill in your ${key}`);
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/carts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ items: cartItems, totalPrice, address }),
//       });
//       if (!res.ok) throw new Error("Failed to place order");

//       const data = await res.json();
//       console.log("Order saved:", data);
//       alert("✅ Order placed successfully!");
//       dispatch(clearCart());
//       setAddress({ fullName: "", email: "", phone: "", city: "", province: "", street: "" });
//     } catch (error) {
//       console.error("❌ Error placing order:", error);
//       alert("Error: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-10 w-full p-4">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-600">Your cart is empty.</p>
//       ) : (
//         <div className="w-full max-w-4xl flex flex-col gap-6">
//           {/* Cart Items */}
//           <ul>
//             {cartItems.map((item) => (
//               <li
//                 key={item._id}
//                 className="flex justify-between items-center bg-white shadow p-4 mb-2 rounded-lg"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={`http://localhost:5000/${item.picture}`} // Full URL
//                     alt={item.name}
//                     className="h-20 w-20 object-contain rounded"
//                   />
//                   <div>
//                     <h2 className="text-lg font-semibold">{item.name}</h2>
//                     <p>${item.price}</p>
//                     {item.quantity && <p>Quantity: {item.quantity}</p>}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => dispatch(removeFromCart(item._id))}
//                   className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>

//           {/* Address Form */}
//           <form className="bg-white border rounded-lg p-6 shadow-md flex flex-col gap-4">
//             <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={address.fullName}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={address.email}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={address.phone}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={address.city}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="text"
//               name="province"
//               placeholder="Province / State"
//               value={address.province}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <input
//               type="text"
//               name="street"
//               placeholder="Street Address"
//               value={address.street}
//               onChange={handleChange}
//               className="border p-2 w-full rounded"
//               required
//             />
//           </form>

//           {/* Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
//             <button
//               onClick={() => dispatch(clearCart())}
//               className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
//             >
//               Clear Cart
//             </button>
//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
//                 loading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? "Placing Order..." : `Place Order - Total: $${totalPrice}`}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// // }
// "use client";

// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   removeFromCart,
//   clearCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from "../store/cartSlice";
// import Image from "next/image";

// export default function CartPage() {
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();

//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const [address, setAddress] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     city: "",
//     province: "",
//     street: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) {
//       alert("❌ Cart is empty.");
//       return;
//     }

//     for (let key in address) {
//       if (!address[key]) {
//         alert(`❌ Please fill in your ${key}`);
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/carts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ items: cartItems, totalPrice, address }),
//       });
//       if (!res.ok) throw new Error("Failed to place order");

//       alert("✅ Order placed successfully!");
//       dispatch(clearCart());
//       setAddress({
//         fullName: "",
//         email: "",
//         phone: "",
//         city: "",
//         province: "",
//         street: "",
//       });
//     } catch (error) {
//       console.error(error);
//       alert("Error: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-10 w-full p-4">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-600">Your cart is empty.</p>
//       ) : (
//         <div className="w-full max-w-4xl flex flex-col gap-6">
//           {/* Cart Items */}
//           <ul>
//             {cartItems.map((item) => (
//               <li
//                 key={item._id || item.id}
//                 className="flex justify-between items-center bg-white shadow p-4 mb-2 rounded-lg"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="relative h-20 w-20">
//                     <Image
//                       src={item.image} // Full URL from FakeStore API
//                       alt={item.title || item.name}
//                       fill
//                       style={{ objectFit: "contain" }}
//                       className="rounded"
//                     />
//                   </div>

//                   <div>
//                     <h2 className="text-lg font-semibold">
//                       {item.title || item.name}
//                     </h2>
//                     <p>${item.price}</p>
//                     <div className="flex items-center mt-2 space-x-2">
//                       <button
//                         onClick={() =>
//                           dispatch(
//                             decreaseQuantity(item._id || item.id)
//                           )
//                         }
//                         className="bg-gray-300 px-2 rounded hover:bg-gray-400"
//                       >
//                         -
//                       </button>
//                       <span className="px-2">{item.quantity}</span>
//                       <button
//                         onClick={() =>
//                           dispatch(
//                             increaseQuantity(item._id || item.id)
//                           )
//                         }
//                         className="bg-gray-300 px-2 rounded hover:bg-gray-400"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => dispatch(removeFromCart(item._id || item.id))}
//                   className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>

//           {/* Address Form */}
//           <form className="bg-white border rounded-lg p-6 shadow-md flex flex-col gap-4">
//             <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
//             {["fullName", "email", "phone", "city", "province", "street"].map(
//               (field) => (
//                 <input
//                   key={field}
//                   type={field === "email" ? "email" : "text"}
//                   name={field}
//                   placeholder={
//                     field.charAt(0).toUpperCase() + field.slice(1)
//                   }
//                   value={address[field]}
//                   onChange={handleChange}
//                   className="border p-2 w-full rounded"
//                   required
//                 />
//               )
//             )}
//           </form>

//           {/* Actions */}
//           <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
//             <button
//               onClick={() => dispatch(clearCart())}
//               className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
//             >
//               Clear Cart
//             </button>
//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
//                 loading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               {loading ? "Placing Order..." : `Place Order - Total: $${totalPrice}`}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import Image from "next/image";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [address, setAddress] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    street: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("❌ Cart is empty.");
      return;
    }

    for (let key in address) {
      if (!address[key]) {
        alert(`❌ Please fill in your ${key}`);
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, totalPrice, address }),
      });
      if (!res.ok) throw new Error("Failed to place order");

      alert("✅ Order placed successfully!");
      dispatch(clearCart());
      setAddress({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        province: "",
        street: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {/* Cart Items */}
          <ul>
            {cartItems.map((item) => (
              <li
                key={item._id || item.id}
                className="flex justify-between items-center bg-white shadow p-4 mb-2 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20">
                    <Image
                      src={item.image} // Full URL from FakeStore API
                      alt={item.title || item.name}
                      fill
                      style={{ objectFit: "contain" }}
                      className="rounded"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.title || item.name}
                    </h2>
                    <p>${item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() =>
                          dispatch(
                            decreaseQuantity(item._id || item.id)
                          )
                        }
                        className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            increaseQuantity(item._id || item.id)
                          )
                        }
                        className="bg-gray-300 px-2 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item._id || item.id))}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Address Form */}
          <form className="bg-white border rounded-lg p-6 shadow-md flex flex-col gap-4">
            <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
            {["fullName", "email", "phone", "city", "province", "street"].map(
              (field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={address[field]}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                />
              )
            )}
          </form>

          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
            >
              Clear Cart
            </button>
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Placing Order..." : `Place Order - Total: $${totalPrice}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
