express = require('express');
const oneTimeItemsController = require('../controllers/oneTimeItemsController');
router = express.Router();

router
    .route('/')
    .get(oneTimeItemsController.getAllOneTimeItems);

module.exports = router;