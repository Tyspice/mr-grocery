const express = require('express');
const apiV2Controller = require('../controllers/apiV2Controller');

router = express.Router();

router
    .route('/')
    .get(apiV2Controller.getAllData);

module.exports = router;