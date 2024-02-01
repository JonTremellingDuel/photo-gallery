// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login, logout, requireAuth, checkAuth } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/check-auth', requireAuth, checkAuth);

module.exports = router;
