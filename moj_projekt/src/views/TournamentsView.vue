<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Nadolazeći turniri</h1>

    <div v-if="loading" class="text-gray-500">Učitavanje...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else-if="tournaments.length === 0" class="text-gray-600">
      Trenutno nema najavljenih turnira.
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="tournament in tournaments.slice(0, 5)"
        :key="tournament.id"
        class="p-4 rounded-2xl shadow-md text-white bg-gradient-to-br from-orange-400 to-orange-500 transition"

      >
        <h2 class="text-xl font-semibold">{{ tournament.name }}</h2>
        <p class="text-gray-600">{{ formatDate(tournament.date) }} – {{ tournament.location }}</p>
        <p class="mt-2 text-gray-800">{{ tournament.description }}</p>
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
