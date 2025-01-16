// Backend Code: Task 01

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cartManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error(err));

// Define schemas and models
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
});
const Product = mongoose.model('Product', ProductSchema);

const CartSchema = new mongoose.Schema({
    userId: String,
    products: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
        },
    ],
});
const Cart = mongoose.model('Cart', CartSchema);

// Define routes
const productRoutes = express.Router();
const cartRoutes = express.Router();

// Product Routes
productRoutes.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Cart Routes
cartRoutes.post('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId == productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            await cart.save();
        } else {
            await Cart.create({ userId, products: [{ productId, quantity }] });
        }
        res.json({ message: 'Product added to cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

cartRoutes.put('/', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId == productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
                await cart.save();
                return res.json({ message: 'Cart updated' });
            }
        }
        res.status(404).json({ error: 'Product not found in cart' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

cartRoutes.delete('/', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.products = cart.products.filter(p => p.productId != productId);
            await cart.save();
            return res.json({ message: 'Product removed from cart' });
        }
        res.status(404).json({ error: 'Cart not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

cartRoutes.get('/', async (req, res) => {
    const { userId } = req.query;
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId', 'name price'); // Ensure correct fields are populated
        if (cart) {
            const total = cart.products.reduce((acc, product) => acc + product.productId.price * product.quantity, 0);
            res.json({ cart: cart.products, total });
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Register routes with app
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
