const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsersController = require('../controllers/users');

router.post('/signup', UsersController.user_signup);

router.post('/login', UsersController.user_login);

module.exports = router;
