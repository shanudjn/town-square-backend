const express = require('express');
const router = express.Router();

const { authenticationVerifier } = require('../middleware/authenticationVerifier');
const { postTweet, getAllTweets, getUserTweets, upvoteTweet, removeUpvote, downvoteTweet, removeDownvote } = require('../controllers/tweet.controller');

router.route('/tweets').get(authenticationVerifier, getAllTweets)
router.route('/tweet').post(authenticationVerifier, postTweet)
router.route('/profile/tweets').get(authenticationVerifier, getUserTweets)
router.route('/tweet/upvote/:tweetId').post(authenticationVerifier, upvoteTweet).delete(authenticationVerifier, removeUpvote)
router.route('/tweet/downvote/:tweetId').post(authenticationVerifier, downvoteTweet).delete(authenticationVerifier, removeDownvote)


module.exports = router