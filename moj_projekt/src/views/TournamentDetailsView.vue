<template>
  <div class="p-6">
    <router-link to="/" class="text-sm text-blue-600 hover:underline">← Nazad</router-link>

    <div class="flex flex-col md:flex-row gap-6 mt-6">
      <!-- Lijeva kartica -->
      <div class="flex-1 p-6 rounded-lg border bg-white shadow-sm">
        <h2 class="text-xl font-semibold mb-2">{{ tournament.name }}</h2>
        <p class="text-sm text-gray-600 mb-1">📅 {{ tournament.date }}</p>
        <p class="text-sm text-gray-600 mb-1">📍 {{ tournament.location }}</p>
        <p class="text-sm text-gray-600 mb-1">{{ tournament.category }}</p>
        <p class="text-sm text-gray-600 mb-4">{{ tournament.gender }}</p>

        <h3 class="font-semibold mb-2">Registriraj svoju ekipu</h3>
        <div class="bg-blue-50 text-sm text-gray-700 rounded p-4 border">
          <p class="mb-2">🔐 Prijavi se</p>
          <p class="mb-2">Potrebna je prijava kako bi se pristupilo ovom turniru</p>
          <router-link to="/login" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Log in
          </router-link>
        </div>
      </div>

      <!-- Desna kartica -->
      <div class="w-full md:w-1/3 p-6 rounded-lg border bg-white shadow-sm">
        <h3 class="font-semibold mb-2">📋 Registrirani timovi</h3>
        <p class="text-sm text-gray-500">Nema prijavljenih timova</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tournamentId = route.params.id

const tournament = ref({
  id: tournamentId,
  name: '3v3',
  date: 'June 19, 2025',
  location: 'Rijeka',
  category: 'U18',
  gender: 'Muškarci',
})
</script>
