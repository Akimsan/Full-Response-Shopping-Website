const express = require('express');
const { getProducts, newProduct, getSingleProducts, updataProduct, deleteProduct, createReview, getReviews, deleteReview } = require('../controllers/productController');
const router = express.Router();
const {isAthenticatedUser} = require('../middlewares/authenticate');
const {authorizeRoles} = require('../middlewares/authenticate');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProducts);
router.route('/product/:id').put(updataProduct);
router.route('/product/:id').delete(deleteProduct);

router.route('/review').put(isAthenticatedUser,createReview);
router.route('/reviews').get(isAthenticatedUser,getReviews);
router.route('/review').delete(isAthenticatedUser,deleteReview);

//Admin Routes

router.route('admin/product/new').post(isAthenticatedUser,authorizeRoles('admin'), newProduct);


module.exports = router;
