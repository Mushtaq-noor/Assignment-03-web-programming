
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

const App = () => {
    return (
        <Router>
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Cart Management System</h1>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

// components/ProductList.js

