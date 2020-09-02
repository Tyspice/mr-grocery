express = require('express');
router = express.Router();

const oneTimeItemsController = require('../controllers/oneTimeItemsController');
const stapleItemsController = require('../controllers/stapleItemsController');

router
    .route('/staple-items')
    .get(stapleItemsController.getAllStaples);

router
    .route('/one-time-items')
    .get(oneTimeItemsController.getAllOneTimeItems)
    .post(oneTimeItemsController.createOneTimeItem);


module.exports = router;