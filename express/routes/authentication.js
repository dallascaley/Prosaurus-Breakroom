const express = require('express');
const router = express.Router();
const { getClient } = require('../utilities/db');

// Define authentication-related routes
router.post('/signup', async (req, res) => {
  console.log('Request Body');
  console.log(req.body);

  const client = await getClient();

  const result = await client.query('SELECT * FROM "user"');

  res.json(result.rows);
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