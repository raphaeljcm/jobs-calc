// HOMEPAGE
const express = require('express');
const router = express.Router();

// Controllers
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.reloadHomepage);

router.get('/index.html', (req, res) => res.redirect('/'));

module.exports = router;