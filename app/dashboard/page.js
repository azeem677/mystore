// app/dashboard/page.jsx
export default function DashboardHome() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Dashboard</h1>
      <p className="text-gray-600">
        Use the sidebar to manage products and view orders.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Add Product</h2>
          <p className="text-gray-500">Add new items to your store easily.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">View Products</h2>
          <p className="text-gray-500">See all products currently available.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-500">Track customer orders in real-time.</p>
        </div>
      </div>
    </div>
  );
}
