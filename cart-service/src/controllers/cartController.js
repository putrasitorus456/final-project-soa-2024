const Cart = require('../models/cartModel');
const { getAsync, setAsync, delAsync } = require('../redisClientCart');

exports.getCart = async (req, res) => {
    try {
        const cacheKey = `cart:${req.params.userId}`;
        const cachedCart = await getAsync(cacheKey);
        if (cachedCart) {
            console.log('Cache hit');
            return res.json(JSON.parse(cachedCart));
        }

        console.log('Cache miss');
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            await setAsync(cacheKey, JSON.stringify(cart), 'EX', 3600); // cache selama 1 jam
        }
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.body.userId });
        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId === req.body.productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += req.body.quantity;
            } else {
                cart.items.push({ productId: req.body.productId, quantity: req.body.quantity });
            }
            await cart.save();
            res.json(cart);
        } else {
            const newCart = new Cart({
                userId: req.body.userId,
                items: [{ productId: req.body.productId, quantity: req.body.quantity }],
            });
            const savedCart = await newCart.save();
            res.json(savedCart);
        }

        // hapus cache agar tidak usang
        const cacheKey = `cart:${req.body.userId}`;
        await delAsync(cacheKey);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};