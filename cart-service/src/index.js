require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');
const { redisClientCart, getAsync, setAsync, delAsync } = require('./redisClientCart');

const app = express();
app.use(express.json());
app.use(cors());

port = process.env.PORTCART || 3002;

app.use('/cart', cartRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    try {
      await delAsync('cart'); // menghapus cache cart saat restart server
      console.log('Cache keranjang dihapus pada server restart');
    } catch (err) {
      console.error('Gagal menghapus cache keranjang', err);
    }

    app.listen(port, () => {
      console.log(`Carts service running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected due to app termination');
    process.exit(0);
  });
});