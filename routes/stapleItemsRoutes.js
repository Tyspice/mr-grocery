express = require('express');
const stapleItemsController = require('../controllers/stapleItemsController');
router = express.Router();

router
    .route('/')
    .get(stapleItemsController.getAllStaples);

module.exports = router;