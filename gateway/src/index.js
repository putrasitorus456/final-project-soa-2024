const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/products', createProxyMiddleware({ target: 'http://product-service:3000', changeOrigin: true }));
app.use('/users', createProxyMiddleware({ target: 'http://user-service:3001', changeOrigin: true }));
app.use('/cart', createProxyMiddleware({ target: 'http://cart-service:3002', changeOrigin: true }));

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});