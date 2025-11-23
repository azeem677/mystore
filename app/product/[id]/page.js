
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
import ProductDetails from "./ProductDetails";

// 1️⃣ generateStaticParams must match folder name [id]
export async function generateStaticParams() {
  // fallback IDs for static export
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

// 2️⃣ Fetch product
async function getProduct(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// 3️⃣ Server Component page
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product)
    return (
      <p className="text-center mt-10 text-red-500">Product not found</p>
    );

  return <ProductDetails product={product} />;
}
