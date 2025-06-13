<template>
  <div class="p-6 md:p-10 bg-white min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Nadzorna ploča</h1>

    <!-- Nadolazeći turniri -->
    <div class="bg-gray-50 rounded-lg p-6 mb-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Nadolazeći turniri</h2>
        <RouterLink to="/turniri" class="text-blue-600 text-sm hover:underline">Pogledaj sve ›</RouterLink>
      </div>
      <div class="flex flex-col items-center justify-center text-center text-gray-500 py-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"/>
        </svg>
        <p class="font-medium">Nema nadolazećih turnira</p>
        <p class="text-sm mb-4">Nisi prijavljen/a na niti jedan turnir</p>
        <RouterLink
          to="/turniri"
          class="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
        >
          Turniri
        </RouterLink>
      </div>
    </div>

    <!-- Moji timovi -->
    <div>
      <h2 class="text-lg font-semibold mb-4">Moji timovi</h2>
      <div class="bg-white rounded-lg border p-6 w-full md:w-1/3 shadow-sm">
        <p class="font-medium mb-2">Kreiraj tim</p>
        <p class="text-sm text-gray-600 mb-4">Registriraj novi košarkaški tim</p>
        <RouterLink
          to="/teams/create"
          class="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium">
          Novi tim
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// nije potreban JS kod zasad
</script>
