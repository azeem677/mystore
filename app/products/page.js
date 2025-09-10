// // app/products/page.js
// "use client";
// import Link from "next/link";
// import {  useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// // import { products } from "../untils/data";


// export default function ProductsPage() {
//   const [addedProducts, setAddedProducts] = useState([]);
//    const [product, setProduct] = useState([]);
//    const products = useSelector((state) => state.products);

//    useEffect(() => {
//       setAddedProducts(products);
//     }, [products]);
    
//     useEffect(() => {
//         fetch('https://fakestoreapi.com/products')
//         .then(res => res.json())
//         .then(data => setProduct(data))
//     }, [])
//   return (
//     <div>
//       <h1 className="text-3xl font-bold m-6">Our Products</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-6">
//      {addedProducts.length  === 0 ?(
//       <p>Loading.....</p>
//      ): (addedProducts.map((c) => (
//           <div key={c.id} className="bg-white rounded-xl border shadow-md p-10">
//             <img src={c.image} alt={c.name} className="h-50 w-full  rounded" />
//             <h2 className="text-xl font-semibold mt-2">{c.name}</h2>
//             <p className="text-gray-600">${c.price}</p>
//             <Link href={`/products/${c.id}`} className="inline-block bg-green-400 mt-2 bg-re text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//               View Details
//             </Link>
//           </div>
//         )))}
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-6">
//      {product.length===0 ?(
//       <p>Loading.....</p>
//      ): (product.map((p) => (
//           <div key={p.id} className="bg-white rounded-xl border shadow-md p-10">
//             <img src={p.image} alt={p.name} className="h-50 w-full  rounded" />
//             <h2 className="text-xl font-semibold mt-2">{p.name}</h2>
//             <p className="text-gray-600">${p.price}</p>
//             <Link href={`/products/${p.id}`} className="inline-block bg-green-400 mt-2 bg-re text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//               View Details
//             </Link>
//           </div>
//         )))}
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useSelector } from "react-redux";

// export default function ProductsPage() {
//   const products = useSelector((state) => state.products);
// console.log(products);
//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Products</h2>
//       {products.length === 0 ? (
//         <p>No products added yet.</p>
//       ) : (
//         <ul>
//           {products.map((p, index) => (
//             <li key={index}>
//               <strong>{p.name}</strong> - ${p.price}
//               <img src={p.image} alt={p.name} style={{ height: 50, marginLeft: 10 }} /> 
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ProductsPage() {
  const productsFromStore = useSelector((state) => state.product) || []; // ensure this matches your slice key
  const [productsApi, setProductsApi] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProductsApi(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold m-6">Our Products</h1>

      {/* Products from Redux */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-6">
        {productsFromStore.length === 0 ? (
          <p>No custom products yet.</p>
        ) : (
          productsFromStore.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border shadow-md p-10">
              <img src={c.image} alt={c.name} className="h-50 w-full rounded" />
              <h2 className="text-xl font-semibold mt-2">{c.name}</h2>
              <p className="text-gray-600">${c.price}</p>
              <Link
                href={`/product?id=${encodeURIComponent(c.id)}`}
                className="inline-block bg-green-400 mt-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Products from API */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-6">
        {productsApi.length === 0 ? (
          <p>Loading API products...</p>
        ) : (
          productsApi.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border shadow-md p-10">
              <img src={p.image} alt={p.title} className="h-50 w-full rounded" />
              <h2 className="text-xl font-semibold mt-2">{p.title}</h2>
              <p className="text-gray-600">${p.price}</p>
              <Link
                href={`/product?id=${encodeURIComponent(p.id)}`}
                className="inline-block bg-green-400 mt-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
