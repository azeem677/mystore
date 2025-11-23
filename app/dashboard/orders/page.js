"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/carts");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/carts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");

      // Remove deleted order from state
      setOrders(orders.filter((order) => order._id !== id));
      alert("Order deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10">Loading orders...</p>
    );

  if (orders.length === 0)
    return <p className="text-center text-gray-500 mt-10">No orders found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Orders</h1>

      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl border p-6"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-3">
              <h2 className="text-xl font-semibold">
                🧾 Order ID: {order._id}
              </h2>
              <p className="text-gray-600 text-sm">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Customer Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Customer Info</h3>
              <p>
                <strong>Name:</strong> {order.address.fullName}
              </p>
              <p>
                <strong>Email:</strong> {order.address.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.address.phone}
              </p>
              <p>
                <strong>City:</strong> {order.address.city},{" "}
                {order.address.province}
              </p>
              <p>
                <strong>Street:</strong> {order.address.street}
              </p>
            </div>

            {/* Ordered Items */}
            <div className="border-t pt-3">
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 items-center border rounded-lg p-3"
                  >
                    <img
                      src={`http://localhost:5000/${item.picture.replace(
                        /\\\\/g,
                        "/"
                      )}`}
                      alt={item.name}
                      className="w-20 h-20 rounded"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">Price: Rs {item.price}</p>
                      <p className="text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total & Delete */}
            <div className="mt-4 flex justify-between items-center">
              <div className="font-semibold text-lg">Total: Rs {order.totalPrice}</div>
              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
