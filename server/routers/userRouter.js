const router = require('express').Router();
const requireUser = require('../middleware/requireUser');
const UserController = require('../controllers/userController');

router.post('/follow', requireUser, UserController.followUnfollowUserController);
router.get('/posts', requireUser, UserController.getPostsOfFollowingsController);
module.exports = router;