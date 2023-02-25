const router = require('express').Router();
const {getAllPostController, createPostController,LikeAndUnlikePostController} = require('../controllers/postController');
const requireUser = require('../middleware/requireUser');


router.get('/all', requireUser, getAllPostController);
router.post('/', requireUser, createPostController)
router.post('/like', requireUser, LikeAndUnlikePostController)

module.exports = router;