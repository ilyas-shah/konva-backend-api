const express = require('express');

const { Router } = express;
const router = new Router();
const user = require('./user');
const auth = require('./auth');
const drawing = require('./drawing');
const { authenticateToken } = require('../middleware/token');

router.use('/api/users', user);
router.use('/oauth', auth);
router.use('/api/drawings', authenticateToken, drawing);

module.exports = router;
