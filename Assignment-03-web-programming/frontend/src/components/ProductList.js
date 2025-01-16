import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/products').then((res) => setProducts(res.data));
    }, []);

    const addToCart = (productId) => {
        axios.post('http://localhost:5000/cart', { userId: '123', productId, quantity: 1 });
    };

    return (
        <div style={{ padding: '10px' }}>
            <h2>Product List</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {products.map((product) => (
                    <div
                        key={product._id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            borderRadius: '5px',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = 'scale(1.05)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = 'scale(1)')
                        }
                    >
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <button
                            onClick={() => addToCart(product._id)}
                            style={{
                                padding: '5px 10px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = '#218838')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = '#28a745')
                            }
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={() => navigate('/cart')}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = '#0056b3')
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = '#007bff')
                }
            >
                Go to Cart
            </button>
        </div>
    );
};

export default ProductList;
