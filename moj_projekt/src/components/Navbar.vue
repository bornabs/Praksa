<template>
  <nav class="bg-gray-900 text-white px-6 py-4 shadow flex items-center justify-between">
    <div class="text-xl font-semibold">🏀 Aplikacija za turnire 🏀</div>
    <ul class="flex space-x-4">
      <li><router-link to="/" class="hover:text-blue-400">Početna</router-link></li>
      <li><router-link to="/teams" class="hover:text-blue-400">Timovi</router-link></li>
      <li><router-link to="/tournaments" class="hover:text-blue-400">Turniri</router-link></li>
      <li><router-link to="/test" class="hover:text-blue-400">Test</router-link></li>
      <li><router-link to="/about" class="hover:text-blue-400">O nama</router-link></li>
    </ul>
  </nav>
</template>