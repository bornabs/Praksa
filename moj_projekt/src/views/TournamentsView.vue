<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-8">Nadolazeći turniri</h1>

    <div v-if="loading" class="text-gray-500">Učitavanje...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else-if="tournaments.length === 0" class="text-gray-600">
      Trenutno nema najavljenih turnira.
    </div>

    <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="tournament in tournaments.slice(0, 5)"
        :key="tournament.id"
        class="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
      >
        <h2 class="text-lg font-semibold mb-2">{{ tournament.name }}</h2>
        <div class="flex items-center text-sm text-gray-600 mb-1">
          <svg class="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1a2 2 0 012 2v10a2 2 0 01-2 2v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1a2 2 0 01-2-2V6a2 2 0 012-2V3a1 1 0 011-1zm1 6a1 1 0 000 2h6a1 1 0 100-2H7z"/></svg>
          {{ formatDate(tournament.date) }}
        </div>
        <div class="flex items-center text-sm text-gray-600 mb-3">
          <svg class="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 100 12A6 6 0 0010 2zM2 18a8 8 0 0116 0H2z"/></svg>
          {{ tournament.location }}
        </div>
        <div class="text-sm text-gray-700 mb-4">{{ tournament.description }}</div>
        <router-link
  :to="`/tournaments/${tournament.id}`"
  class="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
>
  Detaljnije
</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { supabase } from '@/supabaseClient'

export default {
  name: 'HomeView',
  data() {
    return {
      tournaments: [],
      loading: true,
      error: null
    }
  },
  methods: {
    async fetchTournaments() {
      const today = new Date().toISOString().split('T')[0]
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .gte('date', today)
        .order('date', { ascending: true })

      if (error) {
        this.error = 'Greška pri dohvaćanju turnira.'
        console.error(error)
      } else {
        this.tournaments = data
      }
      this.loading = false
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateStr).toLocaleDateString('hr-HR', options)
    }
  },
  mounted() {
    this.fetchTournaments()
  }
}
</script>
