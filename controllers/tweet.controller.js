const { Tweet } = require('../models/tweet.model');
const { User } = require('../models/user.model')


const getAllTweets = async (req, res) => {
    try {
        const allTweets = await Tweet.find({}).sort({ createdAt: -1 }).populate({ path: 'tweetedBy', select: 'username' }).populate({ path: 'tweetedBy', select: 'username' })

        res.status(200).json({ tweets: allTweets })
    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Get All Tweets", error: error.message })

    }
}

const postTweet = async (req, res) => {
    try {
        const { tweet } = req.body;
        const { userId, username } = req.user;

        const newTweet = new Tweet({
            tweet: tweet,
            tweetedBy: userId,
            upvotedBy: [],
            downvotedBy: []
        })
        await newTweet.save();
        await newTweet.populate('tweetedBy').execPopulate();
        res.status(200).json({ success: true, newTweet })

    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Post Tweet", error: error.stack })

    }

}
const getUserTweets = async (req, res) => {
    try {
        const { userId } = req.user;
        const findTweetsByUser = await Tweet.find({ tweetedBy: userId });
        res.status(200).json({ success: true, findTweetsByUser })
    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Tweet By User", error: error.stack })

    }
}
const upvoteTweet = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId)
        const { tweetId } = req.params;
        const tweetToUpvote = await Tweet.findById(tweetId).populate({ path: "likedBy" })
        tweetToUpvote.upvoters.push(userId)
        tweetToUpvote.noOfUpvotes += 1
        await tweetToUpvote.save()
        res.json({ tweetToUpvote, userId })

    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Like The Tweet", error: error.stack })

    }
}
const removeUpvote = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId)
        const { tweetId } = req.params;
        const tweetToRemoveUpvote = await Tweet.findById(tweetId).populate({ path: "likedBy" })
        tweetToRemoveUpvote.upvoters.pull(userId)
        tweetToRemoveUpvote.noOfUpvotes -= 1
        await tweetToRemoveUpvote.save()

        res.json({ tweet: tweetToRemoveUpvote, userId })

    } catch (error) {
        console.log(error.message, error.stack)
        res.status(500).json({ success: false, message: "Could Not DisLike The Tweet", error: error.stack })

    }
}
const downvoteTweet = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId)
        const { tweetId } = req.params;
        const tweetToDownvote = await Tweet.findById(tweetId).populate({ path: "likedBy" })
        tweetToDownvote.downvoters.push(userId)
        tweetToDownvote.noOfDownVotes += 1
        await tweetToDownvote.save()
        res.json({ tweet: tweetToDownvote, userId })

    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Like The Tweet", error: error.stack })

    }
}
const removeDownvote = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId)
        const { tweetId } = req.params;
        const tweetToRemoveDownvote = await Tweet.findById(tweetId).populate({ path: "likedBy" })
        tweetToRemoveDownvote.downvoters.pull(userId)
        tweetToRemoveDownvote.noOfDownVotes -= 1
        await tweetToRemoveDownvote.save()

        res.json({ tweet: tweetToRemoveDownvote, userId })

    } catch (error) {
        console.log(error.message, error.stack)
        res.status(500).json({ success: false, message: "Could Not DisLike The Tweet", error: error.stack })

    }
}


module.exports = { postTweet, getAllTweets, getUserTweets, upvoteTweet, removeUpvote, downvoteTweet, removeDownvote }