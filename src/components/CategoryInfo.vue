<script setup lang="ts">
import type { Event } from '@/types'
defineProps<{
  event: Event
}>()
</script>

<template>
  <div
    class="p-5 w-[250px] cursor-pointer border border-red-500 rounded-[20%] mb-[18px] text-[10px] text-right"
  >
    <h2>Category :{{ event.category }}</h2>
    <h2>Organizer :{{ event.organizer }}</h2>
  </div>
</template>
