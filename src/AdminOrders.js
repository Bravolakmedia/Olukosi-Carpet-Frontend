import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("https://olukosi-carpets.onrender.com/api/customers/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError("Error fetching orders");
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`https://olukosi-carpets.onrender.com/api/customers/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updated = await res.json();
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: updated.status } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status", err);
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📦 Customer Orders</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-md">
      <thead className="bg-gray-100">
  <tr>
    <th className="border text-left px-6 py-3">Order ID</th>
    <th className="border text-left px-6 py-3">Customer</th>
    <th className="border text-left px-10 py-5">Product</th>
    <th className="border text-left px-10 py-3">Quantity</th>
    <th className="border text-left px-6 py-3">Total Price</th>
    <th className="border text-left px-6 py-3">Status</th>
    <th className="border text-left px-6 py-3">Update</th>
  </tr>
</thead>

<tbody>
  {currentOrders.map((order) => (
    <tr key={order.id} className="hover:bg-gray-50">
      <td className="border px-6 py-3 text-left">{order.id}</td>
      <td className="border px-6 py-3 text-left">{order.customer_name}</td>
      <td className="border px-10 py-5 text-left">{order.product}</td>
      <td className="border px-10 py-3 text-left">{order.quantity}</td>
      <td className="border px-6 py-3 text-left">{order.total_price}</td>
      <td className="border px-6 py-3 text-left">{order.status}</td>
      <td className="border px-6 py-3 text-left">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={order.status}
          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Delivered">Delivered</option>
        </select>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrders;
