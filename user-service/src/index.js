require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const { redisClientService, getAsync, setAsync, delAsync } = require('./redisClientService');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORTUSER || 3001;

app.use('/users', userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    try {
      await delAsync('users'); // menghapus cache user saat restart server
      console.log('Cache user dihapus pada server restart');
    } catch (err) {
      console.error('Gagal menghapus cache user', err);
    }

    app.listen(port, () => {
      console.log(`Users service running on port ${port}`);
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