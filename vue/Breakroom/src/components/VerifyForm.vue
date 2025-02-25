<template>
  <div>
    <p v-if="isLoading">Verifying your email...</p>
    <p v-if="message">{{ message }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      message: '',
      error: '',
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      this.verifyEmail(token);
    }
  },
  methods: {
    async verifyEmail(token) {
      try {
        const response = await fetch(`/verify-email?token=${token}`);
        if (response.ok) {
          const data = await response.json();
          this.message = data.message;
        } else {
          const data = await response.json();
          this.error = data.error || 'An error occurred';
        }
      } catch (err) {
        this.error = 'An error occurred while verifying your email';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
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