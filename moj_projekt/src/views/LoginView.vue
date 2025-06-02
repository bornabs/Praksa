<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <div class="w-full max-w-md space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">Prijava</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 flex justify-between items-center">
            Lozinka
            <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Prijava
        </button>
      </form>

      <div class="flex items-center justify-center space-x-2">
        <hr class="flex-grow border-gray-300" />
        <span class="text-sm text-gray-500">Or continue with</span>
        <hr class="flex-grow border-gray-300" />
      </div>

      <button
        @click="handleGoogleLogin"
        class="w-full border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center space-x-2 hover:bg-gray-50"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="h-5 w-5" />
        <span class="text-sm font-medium text-gray-700">Continue with Google</span>
      </button>

      <p class="text-center text-sm text-gray-600">
        Nemas račun?
        <RouterLink to="/register" class="text-blue-600 hover:underline">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabaseClient'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      const { error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })

      if (error) {
        alert('Neispravni podaci: ' + error.message)
      } else {
        this.$router.push('/')
      }
    },
    async handleGoogleLogin() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      if (error) {
        alert('Greška prilikom Google prijave: ' + error.message)
      }
    }
  }
}
</script>
