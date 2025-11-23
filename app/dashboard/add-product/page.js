"use client";
import { useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("picture", image);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const data = await res.json();

      alert("✅ Product added successfully!");
      console.log("Response:", data);

      // Reset form
      setName("");
      setPrice("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 mt-10">
      <h2 className="text-3xl font-bold mb-6">Add Product</h2>

      <form
        className="space-y-6 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div>
          <label className="block text-lg font-semibold mb-1">Product Name:</label>
          <input
            className="border w-full p-2 rounded"
            type="text"
            placeholder="Enter Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-lg font-semibold mb-1">Price:</label>
          <input
            className="border w-full p-2 rounded"
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Product Image */}
        <div>
          <label className="block text-lg font-semibold mb-2">Product Image:</label>
          <div className="border p-4 rounded flex flex-col items-center justify-center">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded mb-3"
              />
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-blue-600 font-semibold hover:underline"
            >
              {preview ? "Change Image" : "Click to Upload Image"}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded font-semibold text-white ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
