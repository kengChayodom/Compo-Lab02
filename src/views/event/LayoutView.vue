<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)
</script>

<template>
  <div v-if="event" class="p-6 max-w-3xl mx-auto text-gray-800">
    <h1 class="text-3xl font-bold mb-4">{{ event.title }}</h1>
    <nav class="mb-6 flex gap-4 text-black-700 font-medium justify-center">
      <router-link
        :to="{ name: 'event-detail-view' }"
        class="hover:underline"
        exact-active-class="text-green-500"
      >
        Details
      </router-link>
      <span>|</span>
      <router-link
        :to="{ name: 'event-register-view' }"
        class="hover:underline"
        exact-active-class="text-green-500"
      >
        Register
      </router-link>
      <span>|</span>
      <router-link
        :to="{ name: 'event-edit-view' }"
        class="hover:underline"
        exact-active-class="text-green-500"
      >
        Edit
      </router-link>
    </nav>
    <router-view :event="event"></router-view>
  </div>
</template>
