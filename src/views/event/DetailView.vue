<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: string
}>()
const { event } = toRefs(props)
</script>

<template>
  <p>{{ event.title }} @ {{ event.location }}</p>
  <p>{{ event.description }}</p>
  <div class="flex flex-row flew-wrap justify-center">
    <img v-for="image in event.images" :key="image"  :src="image" alt="events image" class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"/>
  </div>
</template>
