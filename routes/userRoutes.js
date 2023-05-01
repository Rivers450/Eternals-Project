const express = require('express');
const controller = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimiter');
const { validateSignup, validateLogin, validateResult } = require('../middleware/validator');

const router = express.Router();
router.get('/new', isGuest, controller.new);
router.post('/', isGuest, loginLimiter, validateSignup, validateResult, controller.create);
router.get('/login', isGuest, controller.getUserLogin);
router.post('/login', isGuest, loginLimiter, validateLogin, validateResult, controller.login);
router.get('/profile', isLoggedIn, controller.profile);
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;