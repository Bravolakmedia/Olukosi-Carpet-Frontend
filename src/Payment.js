import React, { useState } from 'react';

const Payment = () => {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [reference, setReference] = useState('');
    const [message, setMessage] = useState('');

    const initializePayment = async () => {
        try {
            const response = await fetch('https://olukosi-carpets.onrender.com/api/payments/initialize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, amount })
            });

            const data = await response.json();
            if (data.status) {
                setReference(data.data.reference);
                window.location.href = data.data.authorization_url;  // Redirect to Paystack payment page
            } else {
                setMessage('Error initializing payment');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error initializing payment');
        }
    };

    const verifyPayment = async (reference) => {
        try {
            const response = await fetch(`https://olukosi-carpets.onrender.com/api/payments/verify/${reference}`);
            const data = await response.json();
            if (data.status) {
                setMessage('Payment successful');
            } else {
                setMessage('Payment verification failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error verifying payment');
        }
    };

    return (
        <div className="payment-container">
            <h1>Payment</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={initializePayment}>Pay Now</button>
            {reference && (
                <div>
                    <h2>Payment Reference: {reference}</h2>
                    <button onClick={() => verifyPayment(reference)}>Verify Payment</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Payment;
