// AdminDashboard.jsx
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <Link to="/admin/orders" className="text-blue-600 hover:underline">
            View Customer Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="text-blue-600 hover:underline">
            View All Products
          </Link>
        </li>
        <li>
          <Link to="/admin/upload" className="text-blue-600 hover:underline">
            Upload New Product
          </Link>
        </li>
      </ul>
    </div>
  );
}
