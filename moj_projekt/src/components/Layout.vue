<script setup>
import Navbar from './Navbar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 p-4 md:p-6 bg-gray-100 text-gray-800">
  <div class="max-w-4xl mx-auto ">
    <slot />
  </div>
</main>
    <footer class="text-center text-sm text-gray-500 py-4">
      © 2025 Aplikacija za turnire Borna Baćac Simper
    </footer>
  </div>
</template>