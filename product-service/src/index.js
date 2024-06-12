require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const { redisClient, getAsync, setAsync, delAsync } = require('./redisClientProduct');

const app = express();
app.use(express.json());

const port = process.env.PORTSERVICE || 3003;

app.use(cors());
app.use('/products', productRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    try {
      await delAsync('products');
      console.log('Cache produk dihapus pada server restart'); // menghapus cache produk saat restart server
    } catch (err) {
      console.error('Gagal menghapus cache produk', err);
    }

    app.listen(port, () => {
      console.log(`Product service running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1);
  });

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected due to app termination');
    process.exit(0);
  });
});
