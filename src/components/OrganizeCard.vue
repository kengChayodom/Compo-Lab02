<script setup lang="ts">
import { type Organization } from '@/types'
defineProps<{
  organize: Organization
}>()
</script>

<template>
  <router-link
    class="no-underline text-[#2c3e50]"
    :to="{ name: 'event-detail-view', params: { id: organize.id } }"
  >
    <div
      class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] hover:scale-101 hover:shadow-sp"
    >
      <h2>{{ organize.organizationName }}</h2>
      <span>{{ organize.address }}</span>
    </div>
  </router-link>
</template>
