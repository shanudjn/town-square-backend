const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const TweetSchema = new Schema({
    tweet: { type: String, required: true },
    tweetedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    upvoters: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    noOfUpvotes: {
        type: Number,
        default: 0
    },
    downvoters: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    noOfDownVotes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = { Tweet }