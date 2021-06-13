const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middleware/authenticationVerifier');
const { postTweet, getAllTweets, } = require('../controllers/tweet.controller');

router.route('/tweets').get(getAllTweets)
router.route('/tweet').post(authenticationVerifier, postTweet)


module.exports = router