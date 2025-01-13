const express = require('express');
const router = express.Router();
const { generateWallpapers } = require('../controllers/wallpaperController');

router.post('/generate', generateWallpapers);

module.exports = router;
