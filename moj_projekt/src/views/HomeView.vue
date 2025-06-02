<template>
  <div>
    <!-- Hero sekcija -->
    <div class="w-full bg-gradient-to-b from-blue-600 to-blue-500 text-white py-20 px-4">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 class="text-4xl font-bold leading-tight mb-4">
            Elevate Your <span class="text-orange-300">Basketball</span> Game
          </h1>
          <p class="mb-6 text-lg">
            Prva hrvatska platforma za košarkaše u Hrvatskoj. Voliš se natjecati?
            Kreiraj svoj tim, prijavi se na turnire diljem Hrvatske te igraj igru koju voliš!
          </p>
          <div class="flex gap-4 flex-wrap">
            <RouterLink to="/teams/create" class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg">
              Kreiraj svoj tim
            </RouterLink>
            <RouterLink to="/tournaments" class="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg">
              Turniri
            </RouterLink>
          </div>
        </div>
        <div class="text-8xl text-orange-400 text-center md:text-right">
          🏀
        </div>
      </div>
    </div>

    <!-- Turniri -->
    <section class="bg-white py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-2">Nadolazeći turniri</h2>
        <p class="text-center text-gray-600 mb-10">
          Otkrijte i registrirajte se za nadolazeće uzbudljive košarkaške turnire
        </p>

        <div v-if="loading" class="text-center text-gray-500">Učitavanje...</div>
        <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
        <div v-else-if="tournaments.length === 0" class="text-center text-gray-600">
          Trenutno nema najavljenih turnira.
        </div>

        <div v-else class="grid gap-6 md:grid-cols-3">
          <div
            v-for="tournament in tournaments.slice(0, 3)"
            :key="tournament.id"
            class="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl shadow hover:shadow-md p-6"
          >
            <h3 class="text-xl font-semibold mb-2">{{ tournament.name }}</h3>
            <p class="text-gray-500 mb-1">📅 {{ formatDate(tournament.date) }}</p>
            <p class="text-gray-600 mb-2">📍 {{ tournament.location }}</p>
            <p class="text-gray-700">{{ tournament.description }}</p>
            <RouterLink
              :to="`/tournaments/${tournament.id}`"
              class="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
            >
              Detalji →
            </RouterLink>
          </div>
        </div>

        <div class="text-center mt-10">
          <RouterLink
            to="/tournaments"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Pogledaj sve turnire →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Feature sekcija -->
    <section class="bg-gray-50 py-20 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-2xl font-bold mb-8">Sve što Vam treba na jednom mjestu</h2>
        <div class="grid md:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-xl shadow text-center">
            <div class="text-3xl mb-3">🛒</div>
            <h3 class="font-semibold mb-2">Kreiraj svoj tim</h3>
            <p class="text-gray-600 text-sm">Create and manage basketball teams</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow text-center">
            <div class="text-3xl mb-3">📅</div>
            <h3 class="font-semibold mb-2">Pronađi turnir</h3>
            <p class="text-gray-600 text-sm">Discover tournaments in your area</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow text-center">
            <div class="text-3xl mb-3">✅</div>
            <h3 class="font-semibold mb-2">Jednostavna registracija</h3>
            <p class="text-gray-600 text-sm">Register your teams easily</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow text-center">
            <div class="text-3xl mb-3">📊</div>
            <h3 class="font-semibold mb-2">Track Performance</h3>
            <p class="text-gray-600 text-sm">View stats and results</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA sekcija -->
    <section class="bg-blue-600 text-white py-20 px-4">
      <div class="max-w-4xl mx-auto text-center bg-blue-500 rounded-2xl p-10 shadow-lg">
        <h2 class="text-3xl font-bold mb-4">Spreman?</h2>
        <p class="text-blue-100 mb-6">
          Pozovi svoje prijatelje, registrirajte se i zaigrajte!
        </p>
        <div class="flex justify-center gap-4">
          <RouterLink
            to="/register"
            class="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Registracija
          </RouterLink>
          <RouterLink
            to="/login"
            class="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold"
          >
            Prijava
          </RouterLink>
        </div>
      </div>
    </section>
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
