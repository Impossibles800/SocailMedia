const router = require('express').Router();
const requireUser = require('../middleware/requireUser');
const UserController = require('../controllers/userController');

router.post('/follow', requireUser, UserController.followUnfollowUserController);
router.get('/posts', requireUser, UserController.getPostsOfFollowingsController);
router.get('/getMyPost', requireUser, UserController.getMyPostsController);
router.get('/getUserPost', requireUser, UserController.getUserPost);
router.delete('/deleteMyProfile', requireUser, UserController.deleteMyProfile);
module.exports = router;