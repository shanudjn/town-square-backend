const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user.model');

const signup = async (req, res) => {
    try {
        const newUser = new User({ ...req.body.user, followers: [], following: [] })
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        res.status(201).json({ success: true, newUser })
    }
    catch (error) {
        res.status(501).json({ success: false, message: "Sign Up Failed", error: error.stack })
    }

}

const login = async (req, res) => {
    const { username, password } = req.body.user;
    const secret = process.env['SECRET'];

    try {
        const user = await User.findOne({ username });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = jwt.sign({ userId: user._id, username: user.username }, secret, { expiresIn: '24h' })
                const userId = user._id
                return res.status(200).json({ success: true, message: "Login Successfull", username, userId, token })
            }
        }
        res.status(400).json({ success: false, message: "User not registered", });

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.stack })
    }
}

const follow = async (req, res) => {
    // const { userId } = req.user;
    // const { username } = req.body;

    // const userToFollow = await User.find({ username: username });
    // userToFollow.followers.push()



}

module.exports = { signup, login, follow }