const router = require('express').Router();
const requireUser = require('../middleware/requireUser');
const UserController = require('../controllers/userController');

router.post('/follow', requireUser, UserController.followUnfollowUserController);

module.exports = router;