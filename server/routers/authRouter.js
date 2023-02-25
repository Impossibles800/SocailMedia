const router = require('express').Router();
const {signupController, loginController, logoutController, RefreshAccessTokenController} = require('../controllers/authController');


router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/refresh', RefreshAccessTokenController);
router.get('/logout', logoutController);

module.exports = router;








