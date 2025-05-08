<!-- src/pages/TestPage.vue -->
<script setup>
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="bg-blue-500 text-white p-4 rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Ovo je testna stranica</h1>

    <Button>Primarni gumb</Button>
    <Button variant="outline" class="ml-4">Outline gumb</Button>
  </div>
</template>