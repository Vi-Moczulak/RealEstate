const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.user_signup);

router.post('/login', UsersController.user_login);

router.get('/:userEmail', checkAuth, UsersController.user_get_id)

router.delete('/:userId', checkAuth, UsersController.user_delete);

module.exports = router;
