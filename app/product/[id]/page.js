
// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import ProductDetails from "./ProductDetails";

// export default function ProductPage() {
//   const params = useParams();
//   const id = params?.id;
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`http://localhost:5000/api/products/${id}`);
        
//         if (!res.ok) {
//           setError("Product not found");
//           return;
//         }

//         const data = await res.json();
//         setProduct(data);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//         setError("Error loading product");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

//   return <ProductDetails product={product} />;
// }
// /app/product/[id]/page.js
// app/product/[id]/page.js

// Required for static export
export async function generateStaticParams() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return products.map((p) => ({
    id: p.id.toString(),
  }));
}

import ProductDetails from "./ProductDetails";

export default async function ProductPage({ params }) {
  const res = await fetch(`http://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  return <ProductDetails product={product} />;
}
