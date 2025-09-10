"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Header() {
  const yourProducts = useSelector((state) => state.product.products);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      setResults([]);
    } else {
      const filtered = products.filter((p) =>
        p.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex flex-wrap space-y-5 items-center justify-between relative">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        🛒 MyStore
      </Link>

      {/* Search Bar */}
      <div className="relative  w-80">
        <input
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-full text-black focus:outerline-none bg-white"
        />

        {/* Search Results Dropdown */}
        {results.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white text-black mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {results.map((item) => (
              <li
                key={item.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                <Link href={`/products/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex items-center space-x-6">
        <span
          onClick={() => router.push("/products/add")}
          className="text-[20px] font-bold cursor-pointer"
        >
          Admin
        </span>
        <span
          onClick={() => router.push("/products")}
          className="text-[20px] font-bold cursor-pointer"
        >
          products
        </span>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 relative"
        >
          Cart
          {cartItems.length > 0 && (
            <span className="ml-2 bg-white text-green-600 font-bold px-2 py-0.5 rounded-full text-sm">
              {cartItems.length}
            </span>
          )}
      
        </Link>
      </div>
    </header>
  );
}
     