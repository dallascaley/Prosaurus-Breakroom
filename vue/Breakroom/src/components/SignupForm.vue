<template>
  <form @submit.prevent="handleSubmit">
    <span>Sign Up</span>
    <div>
      <label>Username: </label>
      <input type="text" required v-model="username">
    </div>
    <div>
      <label>Password: </label>
      <input type="password" required v-model="password">
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
    </div>
    <button type="submit">Create User</button>
  </form>
  <p>Email: {{ username }}</p>
  <p>Password: {{ password }}</p>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordError: ''
    }
  },
  methods: {
    async handleSubmit() {
      console.log('form submitted')
      this.passwordError = this.password.length > 5 ? '' : 'Use a longer password dipshit!'
      if (!this.passwordError) {
        //console.log('Username: ', this.username)
        //console.log('Password: ', this.password)
        let result = await axios.post("https://10.6.0.48:3000/auth/signup", {
          name:this.username,
          password:this.password
        })
        console.log(result)
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