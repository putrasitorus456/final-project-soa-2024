const User = require('../models/userModel');
const { getAsync, setAsync, delAsync } = require('../redisClientService');

exports.getUsers = async (req, res) => {
    try {
        const cachedUsers = await getAsync('users');
        if (cachedUsers) {
            console.log('Cache hit');
            return res.json(JSON.parse(cachedUsers));
        }
        
        console.log('Cache miss');
        const users = await User.find();
        await setAsync('users', JSON.stringify(users), 'EX', 3600); // cache selama 1 jam
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        
        // menghapus cache agar tidak usang
        await delAsync('users');
        
        res.json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};