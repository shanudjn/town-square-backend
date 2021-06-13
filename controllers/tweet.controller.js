const { Tweet } = require('../models/tweet.model');
const { User } = require('../models/user.model')


const getAllTweets = async (req, res) => {
    try {
        const allTweets = await Tweet.find({}).sort({ createdAt: -1 }).populate({ path: 'tweetedBy', select: 'username' })
        res.status(200).json({ tweets: allTweets })
    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Get All Tweets", error: error.message })

    }
}

const postTweet = async (req, res) => {
    try {
        const { tweet } = req.body;
        const { userId } = req.user;
        const newTweet = new Tweet({
            tweet: tweet,
            tweetedBy: userId,
            likedBy: []
        })
        await newTweet.save();
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
const likeTweet = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId)
        const { tweetId } = req.params;
        const tweetToLike = await Tweet.findById(tweetId).populate({ path: "likedBy" })
        tweetToLike.likedBy.push(userId)
        await tweetToLike.save()

        res.json({ tweetToLike })



    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not Like The Tweet", error: error.stack })

    }
}
const dislikeTweet = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId)
        const { tweetId } = req.params;
        const tweetToLike = await Tweet.findById(tweetId).populate({ path: "likedBy" })
        tweetToLike.likedBy.pull(userId)
        await tweetToLike.save()

        res.json({ tweetToLike })

    } catch (error) {
        res.status(500).json({ success: false, message: "Could Not DisLike The Tweet", error: error.stack })

    }
}


module.exports = { postTweet, getAllTweets, getUserTweets, likeTweet, dislikeTweet }