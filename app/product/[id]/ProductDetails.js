// "use client";

// import { addToCart } from "@/app/store/cartSlice";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";

// export default function ProductDetails({ product }) {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addToCart({ ...product, quantity: 1 }));
//     alert(`✅ Added "${product.name}" to cart`);
//   };

//   if (!product)
//     return <p className="text-center mt-10 text-red-500">Product not found</p>;

//   return (
//     <div className="max-w-6xl bg-gray-200 mt-10 rounded mx-auto p-6">
//       {/* Back button */}
//       <button
//         onClick={() => router.back()}
//         className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
//       >
//         ← Back to Products
//       </button>

//       <div className="flex flex-col md:flex-row gap-10 items-start rounded-2xl shadow-lg p-8 bg-white">
//         {/* Product Image */}
//         <div className="flex-1 flex justify-center items-center">
//           <img
//             src={`http://localhost:5000/${product.picture}`}
//             alt={product.name}
//             className="w-full max-w-sm h-auto object-contain rounded-2xl shadow-md"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="flex-1 flex flex-col gap-4">
//           <h1 className="text-4xl font-bold">{product.name}</h1>
//           <p className="text-2xl text-green-600 font-semibold">${product.price}</p>
//           <p className="text-gray-700 mt-2">
//             This is a high-quality product. Perfect for everyday use and special occasions.
//           </p>

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-medium"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

export default function ProductDetails({ product }) {
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-6xl bg-gray-200 mt-10 rounded mx-auto p-6">
      {/* Back button */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-10 items-start rounded-2xl shadow-lg p-8 bg-white">
        {/* Product Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={`http://localhost:5000/${product.picture}`}
            alt={product.name}
            className="w-full max-w-sm h-auto object-contain rounded-2xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl text-green-600 font-semibold">${product.price}</p>
          <p className="text-gray-700 mt-2">
            High-quality product for everyday use and special occasions.
          </p>
        </div>
      </div>
    </div>
  );
}
