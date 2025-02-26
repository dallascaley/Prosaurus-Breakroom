const express = require('express');
const router = express.Router();

const { getClient } = require('../utilities/db');
const { sendMail } = require('../utilities/sendgrid-email');

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

// Define authentication-related routes
router.post('/signup', async (req, res) => {
  const client = await getClient();

  const existingUser = await client.query('SELECT * FROM "user_auth" WHERE handle = $1 OR email = $2;', [req.body.handle, req.body.email]);

  if (existingUser.rowCount === 0) {
    const verificationToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const result = await client.query(`INSERT INTO 
      "user_auth" (handle, first_name, last_name, email, verification_token, verification_expires_at, hash, salt) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [
        req.body.handle, 
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        verificationToken,
        expiresAt,
        req.body.hash,
        req.body.salt
      ]);

    sendMail(req.body.email, 'admin@prosaurus.com', 
      'Please verify your email for prosaurus.com', 
      `<h3>Thank you for registering a new account with prosuarus.com</h3>
       <p>In order to complete your registration we will need to verify
          your email address.  You can do that by clicking 
          <a href='https://prosaurus.com/verify?token=${verificationToken}'>here</a>.
       </p>`
    );

    res.status(201).json({
      message: 'User has been created'
    });
  } else {
    res.status(409).json({
      message: 'User already exists with the provided handle or email.'
    });
  }
});

router.post('/verify', async (req, res) => {
  const client = await getClient();
  const now = new Date();

  const verifyUser = await client.query('SELECT * FROM "user_auth" WHERE verification_token = $1 AND verification_expires_at > $2', [req.body.token, now]);

  if (verifyUser.rowCount === 1) {
    const userId = verifyUser.rows[0].id;
    await client.query('UPDATE "user_auth" SET email_verified = $1 WHERE id = $2', [true, userId]);

    res.status(200).json({
      message: 'Email address verified'
    });
  } else {
    res.status(400).json({
      message: 'Unsuccessful verification of email address'
    });
  }
});

function hashPasswordWithSalt(password, salt) {
  return new Promise((resolve, reject) => {
    const encoder = new TextEncoder();
    const passwordSalt = encoder.encode(password + salt); // Combine password and salt into one string

    // Hash the combined password and salt using SHA-256
    crypto.subtle.digest('SHA-256', passwordSalt).then(function(hashBuffer) {
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to array
      const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convert to hex string
      resolve(hashHex); // Resolve the promise with the hashed value
    }).catch(function(error) {
      reject(error); // Reject the promise if there's an error
    });
  });
}

router.post('/login', async (req, res) => {
  const client = await getClient();

  const user = await client.query('SELECT * FROM "user_auth" WHERE handle = $1', [req.body.handle]);

  if (user.rowCount === 1) {
    // User has been located
    const hash = await hashPasswordWithSalt(req.body.password, user.rows[0].salt);
    if (hash === user.rows[0].hash) {

      const payload = { username: req.body.handle };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({
        message: 'User authenticated',
        token: token
      });
    } else {
      res.status(400).json({
        message: 'Unable to login'
      });
    }
  } else {
    res.status(400).json({
      message: 'Unable to login'
    });
  }
});

//Suff below here all came default, i'm just leaving it for reference...

// ChatGPT examples below
router.get('/', (req, res) => {
  res.send('Get all users');
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  console.log('get auth id');
  res.send(`Get user with ID ${userId}`);
});

router.post('/', (req, res) => {
  console.log('post auth');
  res.send('Create a new user');
});

router.put('/:id', (req, res) => {
  console.log('update auth');
  const userId = req.params.id;
  res.send(`Update user with ID ${userId}`);
});

router.delete('/:id', (req, res) => {
  console.log('delete auth');
  const userId = req.params.id;
  res.send(`Delete user with ID ${userId}`);
});

module.exports = router;