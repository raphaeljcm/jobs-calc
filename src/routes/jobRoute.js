const express = require('express');
const router = express.Router();

// Controllers
const jobController = require('../controllers/jobController');

// JOB
router.get('/', (req, res) => res.render('job'));

router.post('/', express.urlencoded({ extended: true }), jobController.createAJob);

router.get('/edit/:id', jobController.showAJob);

// PUT
router.post('/edit/:id', express.urlencoded({ extended: true }), jobController.updateAJob);

// DELETE
router.post('/delete/:id', express.urlencoded({ extended: true }), jobController.deleteAJob);

module.exports = router;