const express = require('express');
const router = express.Router();

// Controllers
const jobController = require('../controllers/jobController');

// HOMEPAGE
router.get('/', jobController.reloadHomepage);

router.get('/index.html', (req, res) => res.redirect('/'));

// JOB
router.get('/job', (req, res) => res.render('job'));

router.post('/job', express.urlencoded({ extended: true }), jobController.createAJob);

router.get('/job/edit/:id', jobController.showAJob);

router.post('/job/edit/:id', express.urlencoded({ extended: true }), jobController.updateAJob);

router.post('/job/delete/:id', express.urlencoded({ extended: true }), jobController.deleteAJob);

module.exports = router;