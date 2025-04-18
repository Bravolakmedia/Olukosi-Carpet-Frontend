// src/AdminUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminUpload() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const navigate = useNavigate();

  const handleChange = e => {
    if (e.target.name === 'image') {
      setProduct({ ...product, image: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.image);

    try {
      await axios.post('https://olukosi-carpets.onrender.com/api/products/upload', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Product uploaded!');
      navigate('/gallery');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Error uploading product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <h2>Upload New Product</h2>
      <input type="text" name="name" placeholder="Product name" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <button type="submit">Upload</button>
    </form>
  );
}

export default AdminUpload;
