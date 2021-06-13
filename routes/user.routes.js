const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middleware/authenticationVerifier');
const { signup, login } = require("../controllers/user.controller")

router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router
