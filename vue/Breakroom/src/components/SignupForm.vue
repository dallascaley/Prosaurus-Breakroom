<template>
  <form @submit.prevent="handleSubmit">
    <span>Sign Up</span>
    <div>
      <label>Login/Handle: </label>
      <input type="text" required v-model="handle">
    </div>
    <div>
      <label>First Name: </label>
      <input type="text" required v-model="first_name">
    </div>
    <div>
      <label>Last Name: </label>
      <input type="text" required v-model="last_name">
    </div>
    <div>
      <label>Email: </label>
      <input type="text" required v-model="email">
      <div v-if="emailError" class="error">{{ emailError }}</div>
    </div>
    <div>
      <label>Password: </label>
      <input type="password" required v-model="password">
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
    </div>
    <div>
      <label>Password Again: </label>
      <input type="password" required v-model="password2">
      <div v-if="passwordError2" class="error">{{ passwordError2 }}</div>
    </div>
    <button type="submit">Create User</button>
  </form>
</template>

<script>
import axios from 'axios';

// Function to generate a random salt using the Web Crypto API
function generateSalt(length = 16) {
  const array = new Uint8Array(length); // Create an array of random bytes
  window.crypto.getRandomValues(array); // Fill the array with cryptographically strong random values
  return Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join(''); // Convert to hex string
}

// Function to hash a password with a salt using the Web Crypto API
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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default {
  data() {
    return {
      handle: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password2: '',
      passwordError: '',
      passwordError2: '',
      emailError: ''
    }
  },
  methods: {
    async handleSubmit() {
      let errorsExists = false;

      if (this.password.length < 5) {
        this.passwordError = 'Use a longer password dipshit!';
        errorsExists = true;
      } else {
        if (this.password !== this.password2) {
          this.passwordError = 'Passwords must match!';
          this.passwordError2 = 'For fucks sake...'
          errorsExists = true;
        } else {
          this.passwordError = '';
          this.passwordError2 = '';
        }
      }
  
      if (!validateEmail(this.email)) {
        this.emailError = 'Use a god damn email address';
        errorsExists = true;
      } else {
        this.emailError = '';
      }
    
      if (!errorsExists) {
        const salt = generateSalt();
        
        try {
          // Await the hash generation
          const hash = await hashPasswordWithSalt(this.password, salt);

          // Once the hash is ready, you can make the API call
          let result = await axios.post("https://prosaurus.com/api/auth/signup", {
            handle: this.handle,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            hash: hash,
            salt: salt
          });
          console.log('This is the result');
          console.log(result);
        } catch (error) {
          console.error('Error during hashing or API call:', error);
        }
      
      }
    }
  }
}
</script>

<style>
  form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input, button {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  .error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>