const express = require('express');
const { uploadProviderProfile } = require('../controllers/upload.controller');
const upload = require('../middlewares/upload.middleware');
const { authSproviderMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();


router.post(
    "/upload-profile",
    authSproviderMiddleware,
    upload.single("profileImage"),
    uploadProviderProfile
);

module.exports = router