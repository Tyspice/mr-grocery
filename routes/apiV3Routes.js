express = require('express');
router = express.Router();

const oneTimeItemsController = require('../controllers/oneTimeItemsController');
const stapleItemsController = require('../controllers/stapleItemsController');

router
    .route('/staple-items')
    .get(stapleItemsController.getAllStapleItems)
    .post(stapleItemsController.createStapleItem)
    .patch(stapleItemsController.updateStapleItem)
    .delete(stapleItemsController.deleteStapleItem);

router
    .route('/one-time-items')
    .get(oneTimeItemsController.getAllOneTimeItems)
    .post(oneTimeItemsController.createOneTimeItem)
    .patch(oneTimeItemsController.updateOneTimeItem)
    .delete(oneTimeItemsController.deleteOneTimeItem);

router
    .route('/bulk-status-update')
    .patch(stapleItemsController.bulkStatusUpdate)

module.exports = router;