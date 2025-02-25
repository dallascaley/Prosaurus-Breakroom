CREATE TABLE "user_auth" (
  id SERIAL PRIMARY KEY,
  handle VARCHAR(32) UNIQUE NOT NULL,
  first_name VARCHAR(32),
  last_name VARCHAR(32),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(64),
  verification_expires_at TIMESTAMPTZ,
  hash VARCHAR(64),
  salt VARCHAR(32),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);