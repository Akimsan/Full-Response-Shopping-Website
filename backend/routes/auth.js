const express = require ('express');
const { regiterUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserProfile, changePassword, updateProfile, getAllUsers, getUser, updateUser, dleteUser} = require('../controllers/authController');
const {isAthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');
const router = express.Router();

router.route('/register').post(regiterUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAthenticatedUser, getUserProfile);
router.route('/password/change').put(isAthenticatedUser, changePassword);
router.route('/update').put(isAthenticatedUser, updateProfile);


//Admin Routes
router.route('/admin/users').get(isAthenticatedUser,authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAthenticatedUser,authorizeRoles('admin'), getUser);
router.route('/admin/user/:id').put(isAthenticatedUser,authorizeRoles('admin'), updateUser);
router.route('/admin/user/:id').delete(isAthenticatedUser,authorizeRoles('admin'), dleteUser);

module.exports=router;