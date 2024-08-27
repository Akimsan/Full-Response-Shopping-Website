const express = require('express');
const { newOrder, getSingleOrder, myOrders, Orders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/order/new').post(isAthenticatedUser, newOrder);
router.route('/order/:id').get(isAthenticatedUser, getSingleOrder);
router.route('/myorders').get(isAthenticatedUser, myOrders);

//Admin Routes
router.route('/orders').get(isAthenticatedUser,authorizeRoles('admin'), Orders);
router.route('/order/:id').put(isAthenticatedUser,authorizeRoles('admin'), updateOrder);
router.route('/order/:id').delete(isAthenticatedUser,authorizeRoles('admin'), deleteOrder);

module.exports = router;