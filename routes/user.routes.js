const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middleware/authenticationVerifier');
const { signup, login, follow } = require("../controllers/user.controller")

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/follow').post(follow)

module.exports = router
