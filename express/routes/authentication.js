const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();
const { getClient } = require('../utilities/db');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define authentication-related routes
router.post('/signup', async (req, res) => {
  console.log('Request Body');
  console.log(req.body);

  console.log('API KEY');
  console.log(process.env.SENDGRID_API_KEY);

  //const client = await getClient();

  //const result = await client.query('INSERT INTO "user" (name, password) VALUES ($1, $2);', [req.body.name, req.body.password]);

  const msg = {
    to: 'dallascaley@gmail.com',
    from: 'admin@prosaurus.com',
    subject: 'This is the subject',
    text: 'Here is your email',
  };

  sgMail.send(msg)
    .then(() => {
      res.status(200).send('Email sent successfully!');
    }).catch((error) => {
      res.status(500).send('Error sending email: ' + error.message);
    });

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