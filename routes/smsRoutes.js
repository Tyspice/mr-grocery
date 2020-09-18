const express = require('express');
const smsController = require('../controllers/smsController');

router = express.Router();

router
    .route('/')
    .post(smsController.handleSmsRequest);

module.exports = router;