const redis = require('redis');
const { promisify } = require('util');

const redisClientService = redis.createClient({ host: '192.168.11.48', port: 6379 });

redisClientService.on('error', (err) => console.log('Redis Client Error', err));

const getAsync = promisify(redisClientService.get).bind(redisClientService);
const setAsync = promisify(redisClientService.set).bind(redisClientService);
const delAsync = promisify(redisClientService.del).bind(redisClientService);

module.exports = { redisClientService, getAsync, setAsync, delAsync };