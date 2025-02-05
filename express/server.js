const express = require('express')
const app = express()

app.set('view engine', 'ejs')

// db.js
const { Pool } = require('pg');

// Create a new pool of connections
const pool = new Pool({
  user: 'splort',         // The PostgreSQL user
  host: 'localhost',         // PostgreSQL server address (use your VM's IP if needed)
  database: 'breakroom',     // Name of your database
  password: 'glorp', // Password for the user
  port: 5432,                // Default PostgreSQL port
});

// Export the pool for use in other files
module.exports = pool;

app.get('/', async (req, res) => {
  console.log('whatever')
  //res.send('Hi') // just sends Hi
  //res.sendStatus(500) // just sends a 500 error
  //res.status(500).send('Hi') // does both things
  //res.status(500).json({message: "you done fucked up!"})  //this
  //res.download('server.js')

  try {
    // Query to get all users (assuming you have a "user" table)
    const result = await pool.query('SELECT * FROM "user"');
    console.log('duh');
    res.json(result.rows); // Send the results back to the client
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Internal Server Error');
  }


  //res.render("index", { text2: 'World duh...'});
})

app.listen(3001)