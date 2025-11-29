
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
import ProductDetails from "./ProductDetails";

export async function generateStaticParams() {
  // Fetch all products to generate static paths
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const products = await res.json();

  return products.map(product => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }) {
  const { id } = params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");

  const product = await res.json();

  return <ProductDetails product={product} />;
}
