<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <router-link to="/" class="text-sm text-blue-600 hover:underline mb-4 inline-block">
      &lt; Nazad
    </router-link>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Lijevi dio: detalji -->
      <div class="col-span-2 bg-white p-6 rounded-xl border shadow-sm">
        <h1 class="text-2xl font-semibold mb-4">{{ tournament.name }}</h1>

        <div class="flex items-center text-gray-600 mb-2">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1a2 2 0 012 2v10a2 2 0 01-2 2v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1a2 2 0 01-2-2V6a2 2 0 012-2V3a1 1 0 011-1zm1 6a1 1 0 000 2h6a1 1 0 100-2H7z"/>
          </svg>
          {{ formatDate(tournament.date) }}
        </div>

        <div class="flex items-center text-gray-600 mb-2">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 100 12A6 6 0 0010 2zM2 18a8 8 0 0116 0H2z"/>
          </svg>
          {{ tournament.location }}
        </div>

        <div class="text-gray-700 mb-4">
          <div>{{ tournament.age_group }}</div>
          <div>{{ tournament.gender }}</div>
        </div>

        <h2 class="font-semibold mb-2">Registriraj svoju ekipu</h2>
        <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p class="text-blue-800 text-sm mb-2">Potrebna je prijava kako bi se pristupilo ovom turniru</p>
          <button
            @click="handleClick"
            class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
          >
            {{ user ? 'Registriraj tim' : 'Log in' }}
          </button>
        </div>
      </div>

      <!-- Desni dio: registrirani timovi -->
      <div class="bg-white p-6 rounded-xl border shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Registrirani timovi</h2>
          <span class="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            {{ registeredTeams.length }}
          </span>
        </div>
        <div v-if="registeredTeams.length === 0" class="text-gray-500 text-sm flex items-center justify-center h-24">
          <svg class="w-6 h-6 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 7a3 3 0 11-6 0 3 3 0 016 0zm-9 8a6 6 0 1112 0H4z" />
          </svg>
          Nema prijavljenih timova
        </div>
        <ul v-else class="text-sm text-gray-700 space-y-2 mt-2">
          <li v-for="team in registeredTeams" :key="team.id">
            {{ team.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabaseClient'
import { useRouter } from 'vue-router'

export default {
  name: 'TournamentDetailsView',
  data() {
    return {
      tournament: {},
      registeredTeams: [],
      user: null,
    }
  },
  methods: {
    async fetchTournament() {
      const { id } = this.$route.params
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) this.tournament = data
    },
    async fetchTeams() {
      const { id } = this.$route.params
      const { data, error } = await supabase
        .from('teams')
        .select('id, name')
        .eq('tournament_id', id)

      if (!error) this.registeredTeams = data
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateStr).toLocaleDateString('hr-HR', options)
    },
    async checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      this.user = session?.user || null
    },
    handleClick() {
      if (this.user) {
        this.$router.push('/teams/create')
      } else {
        this.$router.push('/register')
      }
    }
  },
  async mounted() {
    await this.fetchTournament()
    await this.fetchTeams()
    await this.checkUser()
  }
}
</script>
