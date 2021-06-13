const { Tweet } = require('../models/tweet.model');


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


module.exports = { postTweet, getAllTweets }