const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middleware/authenticationVerifier');
const { signup, login, getUserProfile } = require("../controllers/user.controller")

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/user').get(authenticationVerifier, getUserProfile)

module.exports = router
