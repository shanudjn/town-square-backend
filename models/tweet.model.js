const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tweetSchema = new Schema({
    tweet: { type: String, required: true },
    tweetedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})