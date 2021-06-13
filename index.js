require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { initializeDBConnection } = require('./db/db.connect');


const app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const userRoutes = require('./routes/user.routes');
const tweetRoutes = require('./routes/tweet.routes')

initializeDBConnection();

app.get('/', (req, res) => {
    res.status(200).json({ "success": true, "message": "Hello Express App" })
})

app.use('/api', userRoutes);
app.use('/api', tweetRoutes)

app.listen(process.env.PORT || 8080, () => {
    console.log('Server Started ✅')
})