const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/sprovider/register', authController.registerProvider);
router.post('/sprovider/login',authController.loginProvider);

module.exports = router;