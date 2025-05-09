<template>
  <nav class="bg-gray-900 text-white px-6 py-4 shadow flex items-center justify-between">
    <div class="text-xl font-semibold">🏀 Aplikacija za turnire 🏀</div>
    <ul class="flex space-x-4 items-center">
      <li><router-link to="/" class="hover:text-blue-400">Početna</router-link></li>
      <li><router-link to="/teams" class="hover:text-blue-400">Teams</router-link></li>
      <li><router-link to="/tournaments" class="hover:text-blue-400">Tournaments</router-link></li>
      <li><router-link to="/test" class="hover:text-blue-400">Test</router-link></li>
      <li><router-link to="/about" class="hover:text-blue-400">O nama</router-link></li>
      <li><router-link to="/login" class="hover:text-blue-400">Login</router-link></li>
      <li>
        <button @click="toggleDark" class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm">
          {{ isDark ? '🌙 Dark' : '☀️ Light' }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    document.documentElement.classList.add('dark')
    isDark.value = true
  }
})

function toggleDark() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>
