"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      // Remove deleted product from state
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading products...</p>;

  if (products.length === 0)
    return <p className="text-center text-gray-500 mt-10">No products found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl border shadow-md p-6 hover:shadow-lg transition"
          >
            <img
              src={
                product.picture?.startsWith("http")
                  ? product.picture
                  : `http://localhost:5000/${product.picture}`
              }
              alt={product.name}
              className="h-48 w-full  rounded"
            />
            <h2 className="text-xl font-semibold mt-3">{product.name}</h2>
            <p className="text-gray-600 mt-1">${product.price}</p>

            <div className="mt-4 flex justify-between items-center">
              <Link
                href={`/product?id=${encodeURIComponent(product._id)}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
