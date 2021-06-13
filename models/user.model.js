const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})


const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstname is required'],

    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],

    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    bio: {
        type: String,
    },

    followers: [followSchema],
    following: [followSchema]
})

const User = mongoose.model('User', UserSchema);

module.exports = { User }