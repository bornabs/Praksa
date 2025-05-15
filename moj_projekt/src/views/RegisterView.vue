<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Registracija</h2>

      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Lozinka" />

      <button class="btn" @click="registerUser">Registriraj se</button>

      <p v-if="message" class="message">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabaseClient'

export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      message: '',
      error: ''
    }
  },
  methods: {
    async registerUser() {
      this.error = ''
      this.message = ''
      const { error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password
      })
      if (error) {
        this.error = error.message
      } else {
        this.message = 'Uspješna registracija! Provjeri svoj email za potvrdu.'
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-card {
  background: white;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

input {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.btn {
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #10b981;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

.btn:hover {
  background-color: #059669;
}

.error {
  color: red;
  margin-top: 1rem;
}

.message {
  color: green;
  margin-top: 1rem;
}
</style>
