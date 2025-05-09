<script setup>
import Navbar from './Navbar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 p-6">
      <slot />
    </main>
    <footer class="text-center text-sm text-gray-500 py-4">
      © 2025 TurnirApp
    </footer>
  </div>
</template>