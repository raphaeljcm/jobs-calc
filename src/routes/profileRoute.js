const express = require('express');
const router = express.Router();

// Controllers
const profileController = require('../controllers/profileController');

// /profile
router.get('/', profileController.showProfile);

router.post('/', express.urlencoded({ extended: true }), profileController.updateProfile);

module.exports = router;