// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// export default function ProductsPage() {
//   const productsFromStore = useSelector((state) => state.product) || [];
//   const [productsApi, setProductsApi] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => setProductsApi(data))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   return (
//     <div className="p-6">
     

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {productsApi.length === 0 ? (
//           <p className="text-center col-span-full text-gray-500">
//             Loading API products...
//           </p>
//         ) : (
//           productsApi.map((p) => (
//             <div
//               key={p._id || p.id}
//               className="bg-white rounded-xl border shadow-md p-6 hover:shadow-lg transition"
//             >
//               <img
//                 src={
//                   p.picture?.startsWith("http")
//                     ? p.picture
//                     : `http://localhost:5000/${p.picture}`
//                 }
//                 alt={p.name}
//                 className="h-48 w-full  rounded"
//               />
//               <h2 className="text-xl font-semibold mt-3">{p.name}</h2>
//               <p className="text-gray-600 mt-1">${p.price}</p>

//               <Link
//                 href={`/product?id=${encodeURIComponent(p._id || p.id)}`}
//                 className="inline-block bg-green-500 mt-3 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//               >
//                 View Details
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProductsPage() {
  const productsFromStore = useSelector((state) => state.product) || [];
  const [productsApi, setProductsApi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProductsApi(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productsToRender = productsApi.length > 0 ? productsApi : productsFromStore;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {loading && productsApi.length === 0 && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsToRender.length === 0 && !loading ? (
          <p className="text-center col-span-full text-gray-500">No products found</p>
        ) : (
          productsToRender.map((p) => (
            <div
              key={p._id || p.id}
              className="bg-white rounded-xl border shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  p.image?.startsWith("http")
                    ? p.image
                    : `https://fakestoreapi.com/products/${p.image}`
                }
                alt={p.name || p.title}
                className="h-48 w-full object-contain rounded"
              />
              <h2 className="text-xl font-semibold mt-3">{p.name || p.title}</h2>
              <p className="text-gray-600 mt-1">${p.price}</p>

              {/* <Link
                href={`/product?id=${encodeURIComponent(p._id)}`}
                className="inline-block bg-green-500 mt-3 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                View Details
              </Link> */}
              <Link
  href={`/product/${encodeURIComponent(p._id || p.id)}`}
  className="inline-block bg-green-500 mt-3 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
>
  View Details
</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
