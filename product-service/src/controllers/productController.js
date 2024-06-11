const Product = require('../models/productModel');
const { getAsync, setAsync, delAsync } = require('../redisClient');

exports.getProducts = async (req, res) => {
    try {
        const cachedProducts = await getAsync('products');
        if (cachedProducts) {
            console.log('Cache hit');
            res.set('X-Cache-Status', 'HIT');
            return res.json(JSON.parse(cachedProducts));
        }
        
        console.log('Cache miss');
        const products = await Product.find();
        await setAsync('products', JSON.stringify(products), 'EX', 3600); // cache selama 1 jam
        res.set('X-Cache-Status', 'MISS');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        
        // menghapus cache agar tidak usang
        await delAsync('products');
        
        res.json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};