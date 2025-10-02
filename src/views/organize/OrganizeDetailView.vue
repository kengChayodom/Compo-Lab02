<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrganizeService from '@/services/OrganizerService'
import type { Organizer } from '@/types'

const route = useRoute()
const organizer = ref<Organizer | null>(null)
const loading = ref(true)
const error = ref('')

defineProps<{
  id: string
}>()

onMounted(async () => {
  try {
    const id = parseInt(route.params.id as string)
    const response = await OrganizeService.getOrganizer(id)
    organizer.value = response.data
  } catch (err) {
    error.value = 'Failed to load organizer details'
    console.error('Error loading organizer:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="organizer" class="max-w-2xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Organizer ID</h3>
            <p class="text-gray-600">#{{ organizer.id }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Address</h3>
            <p class="text-gray-600">{{ organizer.name }} {{ organizer.address }}</p>
          </div>
          <div class="flex flex-row flew-wrap justify-center">
            <img
              v-for="image in organizer.images"
              :key="image"
              :src="image"
              alt="events image"
              class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
            />
          </div>
        </div>

        <div class="mt-6">
          <router-link
            to="/organizers"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Organizers
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p>Organization not found</p>
    </div>
  </div>
</template>
