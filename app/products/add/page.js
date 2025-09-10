"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useRouter } from "next/navigation";
import { addProduct } from "@/app/store/addSlice";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // base64 string
        setPreview(reader.result); // preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image!");
      return;
    }
    dispatch(addProduct({ id: Date.now(), name, price, image }));
    alert("Product added successfully!");
    router.push("/products");
  };

  return (
    <div className="flex flex-col items-center p-2   mt-10">
      <h2 className="md:text-4xl text-3xl font-bold mb-4">Add Product</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <label className="text-xl  font-semibold">Product Name:</label> <br />
        <input
          className="border placeholder:text-red-500 md:w-100 w-full mt-3 p-2 rounded"
          type="text"
          placeholder=" Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />{" "}
        <br />
        <label className="text-xl font-semibold">Price:</label> <br />
        <input
          className="border placeholder:text-red-500 mt-3 md:w-100 w-full p-2  rounded"
          type="number"
          placeholder=" Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />{" "}
        <br />
        <label className="text-xl font-semibold mb-2">Product Image:</label>
        <div className="border mt-3  md:w-100 p-2  rounded flex flex-col items-center justify-center cursor-pointer">
          {preview && (
            <img src={preview} alt="Preview" className="w-  rounded-lg " />
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
            className="cursor-pointer text-red-500 hover:text-blue-600"
          >
            {preview ? "Change Image" : "Click to Upload Image"}
          </label>
        </div>
        <br />
        <div className="flex justify-end">
          <button className="mb-10 font-bold border-2 p-2 " type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
