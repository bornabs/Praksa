<template>
  <div class="min-h-screen bg-white flex flex-col items-center">
    <!-- Naslov -->
    <h1 class="text-2xl font-semibold mt-10">Kreiraj tim</h1>

    <!-- Forma -->
    <div class="bg-white border rounded-lg shadow p-8 mt-6 w-full max-w-2xl">
      <h2 class="text-lg font-medium mb-4">O timu</h2>

      <!-- Ime tima -->
      <input
        v-model="team.name"
        type="text"
        placeholder="Unesi ime tima"
        class="w-full mb-4 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <!-- Ime kontakt osobe -->
      <input
        v-model="team.contact_name"
        type="text"
        placeholder="Unesi ime kontakt osobe"
        class="w-full mb-4 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <!-- Email kontakt osobe -->
      <input
        v-model="team.contact_email"
        type="email"
        placeholder="Unesi email kontakt osobe"
        class="w-full mb-6 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <!-- Igrači -->
      <div>
        <label class="block mb-2 font-medium">Igrači</label>
        <div class="flex gap-2">
          <input
            v-model="newPlayer"
            type="text"
            placeholder="Unesi ime igrača"
            class="flex-grow border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            @click="addPlayer"
            class="bg-blue-400 text-white px-4 rounded hover:bg-blue-500"
            type="button"
          >
            +
          </button>
        </div>

        <!-- Lista igrača -->
        <div class="mt-4 border rounded p-4 text-center text-gray-500" v-if="players.length === 0">
          <div class="flex justify-center text-4xl mb-2">👤</div>
          Nema upisanih igrača
        </div>

        <ul class="mt-4 space-y-2" v-else>
          <li v-for="(player, index) in players" :key="index" class="flex justify-between items-center border px-4 py-2 rounded">
            {{ player }}
            <button @click="removePlayer(index)" class="text-red-500 hover:underline">
              Ukloni
            </button>
          </li>
        </ul>
      </div>

      <!-- Dugmad -->
      <div class="flex justify-end mt-6 gap-4">
        <button @click="cancel" class="px-4 py-2 border rounded hover:bg-gray-100">
          Odustani
        </button>
        <button @click="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Kreiraj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabaseClient'

const router = useRouter()

const team = ref({ name: '', contact_name: '', contact_email: '' })
const newPlayer = ref('')
const players = ref([])

const addPlayer = () => {
  if (newPlayer.value.trim()) {
    players.value.push(newPlayer.value.trim()) 
    newPlayer.value = ''
  }
}

const removePlayer = (index) => {
  players.value.splice(index, 1)
}

const cancel = () => {
  router.push('/profile')
}

const submit = async () => {
  if (!team.value.name.trim()) {
    return alert('Unesi naziv tima.')
  }
  if (!team.value.contact_name.trim()) {
    return alert('Unesi kontakt osobu.')
  }
  if (!team.value.contact_email.trim()) {
    return alert('Unesi email kontakt osobe.')
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return alert('Nisi prijavljen.')
  }
  
  const { error } = await supabase.from('teams').insert([{
    id: user.id,
    name: team.value.name,
    players: players.value,
    contact_name: team.value.contact_name,
    contact_email: team.value.contact_email
  }])

  if (error) {
    console.error('Greška pri kreiranju tima!', error)
    alert('Dogodila se greška. Pokušaj ponovno.')
    return
  }
  
  router.push('/profile')
}
</script>
