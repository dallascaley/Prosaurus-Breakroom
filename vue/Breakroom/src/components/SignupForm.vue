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
      <input type="password" required v-model="hash">
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
    </div>
    <div>
      <label>Password Again: </label>
      <input type="password" required v-model="hash2">
      <div v-if="passwordError2" class="error">{{ passwordError2 }}</div>
    </div>
    <button type="submit">Create User</button>
  </form>
</template>

<script>
import axios from 'axios'

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
      hash: '',
      hash2: '',
      passwordError: '',
      passwordError2: '',
      emailError: ''
    }
  },
  methods: {
    async handleSubmit() {
      let errorsExists = false;

      if (this.hash.length < 5) {
        this.passwordError = 'Use a longer password dipshit!';
        errorsExists = true;
      } else {
        if (this.hash !== this.hash2) {
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
        let result = await axios.post("https://prosaurus.com/api/auth/signup", {
          handle: this.handle,
          first_name: this.first_name,
          last_last: this.last_name,
          email: this.email,
          hash: this.hash
        });
        console.log('This is the result');
        console.log(result);
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