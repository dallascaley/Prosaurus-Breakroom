require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const https = require('https');

// Load your SSL certificate and key
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/prosaurus.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/prosaurus.com/fullchain.pem'),
};

app.use(cors());

app.set('view engine', 'ejs');

const authentication = require('./routes/authentication');

// Middleware to parse incoming JSON data
app.use(express.json());

// Use routes
app.use('/api/auth', authentication);



// Default route
app.get('/', async (req, res) => {
  console.log('backend main page called for some damn reason')
  res.send('Hi, this is the backend, call an actual endpoint or something')
})

https.createServer(options, app).listen(3000, () => {
  console.log('Backend server running on https://prosaurus.com:3000');
});