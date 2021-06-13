const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TweetSchema = new Schema({
    tweet: { type: String, required: true },
    tweetedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = { Tweet }