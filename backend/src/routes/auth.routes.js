const express = require('express');
const authController = require('../controllers/auth.controller');
const { authUserMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.post('/sprovider/register', authController.registerProvider);
router.post('/sprovider/login',authController.loginProvider);
router.get('/profile', authUserMiddleware,(req, res) => {
    res.status(200).json({message: 'Profile fetched successfully', user: req.user});
});


module.exports = router;