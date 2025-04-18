import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 import useNavigate

const OrderForm = () => {
  const navigate = useNavigate(); // 👈 initialize navigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    quantity: 1,
    message: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const response = await axios.post('https://olukosi-carpets.onrender.com/api/customers/order', formData);

      const orderId = response.data.order?.id || response.data.orderId; // 👈 get orderId

      if (orderId) {
        navigate(`/payment/${orderId}`); // 👈 redirect to payment page
      } else {
        setSuccess('Order placed, but no order ID returned.');
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        product: '',
        quantity: 1,
        message: ''
      });
    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="order-form">
      <h2>Place an Order</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="product" placeholder="Product name" value={formData.product} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} min="1" required />
        <textarea name="message" placeholder="Additional message" value={formData.message} onChange={handleChange}></textarea>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
