require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.set('view engine', 'ejs');

const authentication = require('./routes/authentication');

// Middleware to parse incoming JSON data
app.use(express.json());

// Use routes
app.use('/auth', authentication);



// Default route
app.get('/', async (req, res) => {
  console.log('backend main page called for some damn reason')
  res.send('Hi, this is the backend, call an actual endpoint or something')
})

app.listen(3000)