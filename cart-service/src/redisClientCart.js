const redis = require('redis');
const { promisify } = require('util');

const redisClientCart = redis.createClient({ host: '192.168.11.48', port: 6379 });

redisClientCart.on('error', (err) => console.log('Redis Client Error', err));

const getAsync = promisify(redisClientCart.get).bind(redisClientCart);
const setAsync = promisify(redisClientCart.set).bind(redisClientCart);
const delAsync = promisify(redisClientCart.del).bind(redisClientCart);

module.exports = { redisClientCart, getAsync, setAsync, delAsync };