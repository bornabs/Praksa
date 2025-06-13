<template>
  <nav class="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
    <!-- Lijevo: Logo -->
    <div class="text-lg font-bold">Hoop4life</div>

    <!-- Desno: Navigacija -->
    <div class="flex items-center space-x-2">
      <RouterLink
        to="/"
        class="px-3 py-1 rounded text-sm"
        :class="navLinkClass('/')"
      >
        Početna
      </RouterLink>
      
      <RouterLink
        to="/tournaments"
        class="px-3 py-1 rounded text-sm"
        :class="navLinkClass('/tournaments')"
      >
        Turniri
      </RouterLink>
      <RouterLink
        to="/about"
        class="px-3 py-1 rounded text-sm"
        :class="navLinkClass('/about')"
      >
        O nama
      </RouterLink>

      <template v-if="user">
        <RouterLink
          to="/profile"
          class="px-3 py-1 rounded text-sm"
          :class="navLinkClass('/profile')"
        >
          Profil
        </RouterLink>
        <button
          @click="logout"
          class="px-3 py-1 rounded text-sm text-white bg-orange-500 hover:bg-orange-600"
        >
          Log out
        </button>
      </template>
      <template v-else>
        <RouterLink
          to="/login"
          class="px-3 py-1 rounded text-sm text-white bg-orange-500 hover:bg-orange-600"
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
import { useRoute, useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()
const route = useRoute()

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

// Dinamično dodavanje klasa za aktivni link
const navLinkClass = (path) => {
  return route.path === path
    ? 'bg-blue-600 text-white'
    : 'border border-gray-200 text-black hover:bg-gray-100'
}
</script>
