<script setup lang="ts">
import { type Organizer } from '@/types'
defineProps<{
  organizer: Organizer
}>()
</script>

<template>
  <router-link
    class="no-underline text-[#2c3e50]"
    :to="{ name: 'organizers-detail-view', params: { id: organizer.id } }"
  >
    <div
      class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
    >
      <h2>{{ organizer.name }}</h2>
    </div>
  </router-link>
</template>
