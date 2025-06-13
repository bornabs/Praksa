<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="w-full max-w-md space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Kreiraj račun</h1>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Lozinka</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-60"
        >
          {{ loading ? 'Kreiranje...' : 'Kreiraj račun' }}
        </button>
      </form>

      <div class="flex items-center justify-center space-x-2">
        <hr class="flex-grow border-gray-300" />
        <span class="text-sm text-gray-500">ili nastavi s</span>
        <hr class="flex-grow border-gray-300" />
      </div>

      <button
        @click="handleGoogleSignup"
        :disabled="googleLoading"
        class="w-full border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center space-x-2 hover:bg-gray-50 disabled:opacity-60"
      >
        <img
          v-if="!googleLoading"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          class="h-5 w-5"
        />
        <span class="text-sm font-medium text-gray-700">
          {{ googleLoading ? 'Prijava...' : 'Nastavi s Google' }}
        </span>
      </button>

      <p class="text-center text-sm text-gray-600">
        Imaš račun?
        <RouterLink to="/login" class="text-blue-600 hover:underline">Prijavi se</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabaseClient'

export default {
  name: 'SignupView',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      googleLoading: false
    }
  },
  methods: {
    async handleSignup() {
      this.loading = true
      const { error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password
      })

      if (error) {
        alert('Greška: ' + error.message)
      } else {
        this.$router.push('/')
      }
      this.loading = false
    },
    async handleGoogleSignup() {
      this.googleLoading = true
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      if (error) {
        alert('Greška pri Google prijavi: ' + error.message)
      }
      this.googleLoading = false
    }
  }
}
</script>
