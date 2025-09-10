// app/product/ProductPageClient.js
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/store/cartSlice";

export default function ProductPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const dispatch = useDispatch();
  const productsFromStore = useSelector((state) => state.product);
  const productsFromStoreMemo = useMemo(() => productsFromStore || [], [productsFromStore]);

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const colorOptions = ["red-300", "blue-300", "green-300"];
  const colorMap = {
    "red-300": "bg-red-300",
    "blue-300": "bg-blue-300",
    "green-300": "bg-green-300",
  };

  useEffect(() => {
    if (!id) return;

    const localProduct = productsFromStoreMemo.find((p) => String(p.id) === String(id));
    if (localProduct) {
      setProduct(localProduct);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      }
    })();
  }, [id, productsFromStoreMemo]);

  if (!id) return <h1>No product selected</h1>;
  if (!product) return <h1>Loading...</h1>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, color: selectedColor }));
  };

  return (
    <div className="md:w-[50%] w-full mt-10 shadow-2xl rounded-xl p-6 mx-auto">
      {/* If you want to keep <img> (simple) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={product.title || product.name}
        className={`h-60 p-4 object-contain rounded-lg mx-auto ${selectedColor ? colorMap[selectedColor] : "bg-white"}`}
      />

      <h1 className="text-3xl font-bold mt-4">{product.title || product.name}</h1>
      <p className="text-xl text-gray-700">${product.price}</p>

      <div className="flex space-x-4 mt-4">
        {colorOptions.map((c) => (
          <div
            key={c}
            onClick={() => setSelectedColor(c)}
            className={`h-8 w-8 rounded-full cursor-pointer border-2 ${selectedColor === c ? "border-black" : "border-transparent"} ${colorMap[c]}`}
          ></div>
        ))}
      </div>

      <button onClick={handleAddToCart} className="bg-green-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
}
