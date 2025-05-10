<template>
  <div class="login-page">
    <h2>Prijava</h2>

    <div v-if="user">
      <p>Prijavljeni ste kao: {{ user.email }}</p>
      <button @click="logout">Odjava</button>
    </div>
    <div v-else>
      <button @click="loginWithGoogle">Prijava preko Googlea</button>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabaseClient';

export default {
  name: 'LoginView',
  data() {
    return {
      user: null
    };
  },
  methods: {
    async loginWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      if (error) console.error('Greška pri prijavi:', error.message);
    },
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Greška pri odjavi:', error.message);
      this.user = null;
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
.login-page {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
</style>
