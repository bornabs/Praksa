<template>
  <nav class="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
    <!-- Lijevo: Naslov -->
    <div class="text-xl font-bold">🏀 Aplikacija za turnire 🏀</div>

    <!-- Desno: Navigacija -->
    <div class="flex gap-3 items-center">
      <RouterLink
        to="/"
        class="px-3 py-1 rounded border text-white border-[#2563EB] bg-[#2563EB]"
      >
        Početna
      </RouterLink>
      <RouterLink to="/teams" class="px-3 py-1 rounded border border-white text-black hover:bg-gray-100">
        Teams
      </RouterLink>
      <RouterLink to="/tournaments" class="px-3 py-1 rounded border border-white text-black hover:bg-gray-100">
        Turniri
      </RouterLink>
      <RouterLink to="/about" class="px-3 py-1 rounded border border-white text-black hover:bg-gray-100">
        O nama
      </RouterLink>

      <!-- Auth opcije -->
      <template v-if="user">
        <RouterLink to="/profile" class="px-3 py-1 rounded border border-white text-black hover:bg-gray-100">
          Moj Profil
        </RouterLink>
        <button
          @click="logout"
          class="px-3 py-1 rounded border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Odjava
        </button>
      </template>
      <template v-else>
        <RouterLink
          to="/login"
          class="px-3 py-1 rounded border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Log in
        </RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { supabase } from '@/supabaseClient'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  user.value = session?.user || null

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null
  })
})

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}
</script>
