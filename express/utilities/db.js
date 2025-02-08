const { Pool } = require('pg');

// Set up your database connection details (you can also use environment variables)
const pool = new Pool({
  user: 'splort',
  host: 'localhost',
  database: 'breakroom',
  password: 'glorp',
  port: 5432, // Default PostgreSQL port
});

// Function to get a client from the pool
const getClient = async () => {
  try {
    const client = await pool.connect();
    return client; // Return the connected client to be used in the route
  } catch (error) {
    console.error('Error getting DB client:', error);
    throw error; // Throw the error so it can be caught in the route
  }
};

// Export the getClient function for use in routes
module.exports = {
  getClient
};