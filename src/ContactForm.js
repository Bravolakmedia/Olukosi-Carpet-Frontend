import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://olukosi-carpets.onrender.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
          .then(data => {
              alert('Message sent successfully');
              setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  message: ''
              });
          });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Contact Us</h1>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" required></textarea>
            <button type="submit">Send</button>
        </form>
    );
};

export default ContactForm;
