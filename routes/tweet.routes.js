const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middleware/authenticationVerifier');
const { postTweet, getAllTweets, getUserTweets, likeTweet, dislikeTweet } = require('../controllers/tweet.controller');

router.route('/tweets').get(getAllTweets)
router.route('/tweet').post(authenticationVerifier, postTweet)
router.route('/profile/:username').get(authenticationVerifier, getUserTweets)
router.route('/tweet/like/:tweetId').post(authenticationVerifier, likeTweet).delete(authenticationVerifier, dislikeTweet)


module.exports = router