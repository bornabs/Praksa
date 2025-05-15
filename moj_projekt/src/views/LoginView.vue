<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Dobrodošao u Turnir Aplikaciju</h2>

      <div v-if="user">
        <p>Prijavljeni ste kao:</p>
        <p class="email">{{ user.email }}</p>
        <button class="btn logout" @click="logout">Odjava</button>
      </div>

      <div v-else>
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Lozinka" />

        <button class="btn" @click="loginWithEmail">Prijava</button>
        <button class="btn secondary" @click="goToRegister">Registracija</button>
        


        <hr />

        <button class="btn google-login" @click="loginWithGoogle">
          Prijavi se putem Googlea
        </button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabaseClient';

export default {
  name: 'LoginView',
  data() {
    return {
      user: null,
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async loginWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) this.errorMessage = error.message;
    },
    async loginWithEmail() {
      const { error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      });
      if (error) this.errorMessage = 'Greška pri prijavi: ' + error.message;
    },
    goToRegister() {
    this.$router.push('/register');
    },
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (!error) this.user = null;
    }
  },
  async mounted() {
    const { data: { user } } = await supabase.auth.getUser();
    this.user = user;

    supabase.auth.onAuthStateChange((_event, session) => {
      this.user = session?.user || null;
    });
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
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
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.btn:hover {
  background-color: #2563eb;
}

.secondary {
  background-color: #10b981;
}

.secondary:hover {
  background-color: #059669;
}

.google-login {
  background-color: #ea4335;
}

.google-login:hover {
  background-color: #d93025;
}

.logout {
  background-color: #ef4444;
}

.logout:hover {
  background-color: #dc2626;
}

.email {
  font-weight: bold;
  color: #374151;
  margin: 0.5rem 0;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
