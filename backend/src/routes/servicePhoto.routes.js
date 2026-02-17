const express = require('express');
const router = express.Router();
const { authSproviderMiddleware } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const { uploadServicePhoto } = require('../controllers/upload.controller');

router.post(
  '/upload-service-photo',
  authSproviderMiddleware,
  upload.single('photo'),
  uploadServicePhoto
);

module.exports = router;
