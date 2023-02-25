const router = require('express').Router();
const {signupController, loginController, RefreshAccessTokenController} = require('../controllers/authController');


router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/refresh', RefreshAccessTokenController);

module.exports = router;








