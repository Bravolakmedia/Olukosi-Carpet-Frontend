import React, { useEffect, useState } from "react";
import "./ViewProducts.css";
import { useNavigate } from "react-router-dom";


const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://olukosi-carpets.onrender.com/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch products");

      setProducts(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    try {
      const res = await fetch(`https://olukosi-carpets.onrender.com/api/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      
      const text = await res.text(); // Read response as plain text (not JSON)
      console.log("Delete Response Text:", text);
      
      if (res.ok) {
        const data = JSON.parse(text); // If it's JSON, parse it
        console.log("Delete Response:", data);
      } else {
        console.error("Delete error:", text);
        throw new Error(`Failed to delete product: ${text}`);
      }
      
  
      // Refresh the product list after deletion
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete product");
    }
  };
  
  const navigate = useNavigate();

const handleEdit = (productId) => {
  navigate(`/edit-product/${productId}`);
};


  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>
      {error && <p className="text-red-500">{error}</p>}
      {products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <>
          <ul className="product-grid">
  {currentProducts.map((product) => (
    <li key={product.id} className="product-card">
      <img
        src={`http://localhost:5000${product.image_url}`}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-details">{product.description}</p>
      <p className="product-details">₦{product.price}</p>
      <p className="product-details">Stock: {product.stock}</p>

      <div className="action-buttons">
      <button className="btn-edit" onClick={() => handleEdit(product.id)}>
  Edit
</button>
        <button className="btn-delete" onClick={() => deleteProduct(product.id)}>
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewProducts;
