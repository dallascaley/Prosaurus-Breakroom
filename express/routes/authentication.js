const express = require('express');
const router = express.Router();

const { getClient } = require('../utilities/db');
const { sendMail } = require('../utilities/sendgrid-email');

const { v4: uuidv4 } = require('uuid');

// Define authentication-related routes
router.post('/signup', async (req, res) => {
  console.log('Request Body');
  console.log(req.body);
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

router.post('/login', async (req, res) => {
  console.log('Request Body');
  console.log(req.body);

  console.log('log in or something whatever...');
  //const client = await getClient();

  //const result = await client.query('INSERT INTO "user" (name, password) VALUES ($1, $2);', [req.body.name, req.body.password]);

  //sendMail('dallascaley@gmail.com', 'admin@prosaurus.com', 'Hey!!', 'Word.');

  //res.json(result.rows);
  //res.send('ah yea whatever, signup i guess');
});

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