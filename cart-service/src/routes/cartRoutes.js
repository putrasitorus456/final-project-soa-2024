const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/:userId', cartController.getCart);
router.post('/', cartController.addToCart);

module.exports = router;