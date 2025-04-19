import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Gallery = () => {
    const navigate = useNavigate(); // ✅ Initialize navigation

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://olukosi-carpets.onrender.com/api/products')
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data);
                const productArray = Array.isArray(data) ? data : data.products || [];
                setProducts(productArray);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setError("Failed to load products.");
                setLoading(false);
            });
    }, []);

    const handleOrderClick = (product) => {
        navigate(`/customers/order/${product.id}`); // ✅ Navigate to order form with product id
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Pagination logic
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <div className="gallery">
            <h1>Gallery</h1>
            <p>Kindly go through the pictures of our carpets and canopy brands.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-6xl mx-auto">
  {currentProducts.length === 0 ? (
    <p className="col-span-full text-center">No products found.</p>
  ) : (
    currentProducts.slice(0, 6).map(product => (
      <div
        key={product.id}
        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      >
        <img
          src={`https://olukosi-carpets.onrender.com${product.image_url}`}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
          <p className="text-sm text-gray-600 flex-grow">{product.description}</p>
          <p className="text-lg font-bold text-blue-600 mt-2 mb-4">₦{product.price}</p>
          <button
            onClick={() => handleOrderClick(product)}
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Order Now
          </button>
        </div>
      </div>
    ))
  )}
</div>



            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Gallery;
