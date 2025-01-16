
// components/Cart.js

import  { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5000/cart?userId=123').then((res) => {
            setCart(res.data.cart);
            setTotal(res.data.total);
        });
    }, []);

    const updateQuantity = (productId, quantity) => {
        axios.put('http://localhost:5000/cart', { userId: '123', productId, quantity }).then(() => {
            setCart((prev) =>
                prev.map((item) =>
                    item.productId._id === productId ? { ...item, quantity } : item
                )
            );
        });
    };

    const removeFromCart = (productId) => {
        axios.delete('http://localhost:5000/cart', { data: { userId: '123', productId } }).then(() => {
            setCart((prev) => prev.filter((item) => item.productId._id !== productId));
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Cart</h2>
            {cart.map((item) => (
                <div
                    key={item.productId._id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '15px',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <h3 style={{ margin: '0' }}>{item.productId.name}</h3>
                        <p style={{ margin: '5px 0' }}>Price: ${item.productId.price}</p>
                        <p style={{ margin: '5px 0' }}>Quantity: {item.quantity}</p>
                    </div>
                    <div>
                        <button
                            onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                            style={{
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                marginRight: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            +
                        </button>
                        <button
                            onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                            style={{
                                backgroundColor: '#ffc107',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                marginRight: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            -
                        </button>
                        <button
                            onClick={() => removeFromCart(item.productId._id)}
                            style={{
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Total: ${total}</h3>
        </div>
    );
};


export default Cart;
