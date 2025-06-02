<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Nadzorna ploča</h1>

    <!-- Gornji dio: Turniri i timovi -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Nadolazeći turniri -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Nadolazeći turniri</h2>
          <RouterLink to="/turniri" class="text-blue-600 text-sm hover:underline">Pogledaj sve ›</RouterLink>
        </div>
        <div class="flex flex-col items-center justify-center text-center text-gray-500 py-10">
          <span class="text-4xl mb-2">📅</span>
          <p class="font-medium">Nema nadolazećih turnira</p>
          <p class="text-sm mb-4">Nisi prijavljen/a na niti jedan turnir</p>
          <RouterLink to="/turniri" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Turniri</RouterLink>
        </div>
      </div>

      <!-- Tvoji timovi -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Tvoji timovi</h2>
          <RouterLink to="/teams" class="text-blue-600 text-sm hover:underline">›</RouterLink>
        </div>
        <div class="flex flex-col items-center justify-center text-center text-gray-500 py-10">
          <span class="text-4xl mb-2">👥</span>
          <p class="font-medium">Nemaš tim</p>
          <p class="text-sm">Kreiraj tim kako bi se mogao prijaviti na turnire (maks 3 tima)</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mt-10">
      
      <div class="bg-white p-6  rounded-lg w-full md:w-1/3">
        <p class="font-medium mb-2">Kreiraj tim</p>
        <p class="text-sm text-gray-600 mb-4">Registriraj novi košarkaški tim</p>
        <RouterLink
          to="/teams/create"
          class="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <span>➕</span> Novi tim
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
