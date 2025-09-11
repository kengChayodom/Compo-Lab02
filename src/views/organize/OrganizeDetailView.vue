<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import OrganizeService from '@/services/OrganizeService'
import type { Organization } from '@/types'

const route = useRoute()
const organize = ref<Organization | null>(null)
const loading = ref(true)
const error = ref('')

defineProps<{
  id: string
}>()

onMounted(async () => {
  try {
    const id = parseInt(route.params.id as string)
    const response = await OrganizeService.getOrganize(id)
    organize.value = response.data
  } catch (err) {
    error.value = 'Failed to load organization details'
    console.error('Error loading organize:', err)
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

    <div v-else-if="organize" class="max-w-2xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Organization ID</h3>
            <p class="text-gray-600">#{{ organize.id }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Address</h3>
            <p class="text-gray-600">{{ organize.organization_Name }} {{ organize.address }}</p>
          </div>
        </div>

        <div class="mt-6">
          <router-link
            to="/organizes"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Organizations
          </router-link>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p>Organization not found</p>
    </div>
  </div>
</template>
