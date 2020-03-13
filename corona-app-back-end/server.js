// Dependencies

const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 3000


// Database Connection

// ** on error/disconnect
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// ** on connection
mongoose.connect('mongodb://localhost:27017/corona', { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => (
    console.log('Mongoose connection established.')
))

// Middleware

// app.use(express.json()); //use .json(), not .urlencoded()
// const whitelist = ['http://localhost:3000', 'https://fathomless-sierra-68956.herokuapp.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions)) // all routes are now exposed, sometimes you just want to limit access (ie OMDB - it's ok for anyone to see the movies, but you don't want just anyone updating the movies)

// controllers


// Routes

app.get('/', (req, res) => {
    res.send('hello world')
})

// Listen

app.listen(PORT, () => {
    console.log('API is running on port ' + PORT);
})
