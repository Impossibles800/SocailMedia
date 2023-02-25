const router = require('express').Router();
const {deletePostController, createPostController,LikeAndUnlikePostController, updatePostController} = require('../controllers/postController');
const requireUser = require('../middleware/requireUser');


router.post('/', requireUser, createPostController)
router.post('/like', requireUser, LikeAndUnlikePostController)
router.put('/', requireUser, updatePostController)
router.delete('/', requireUser, deletePostController)

module.exports = router;