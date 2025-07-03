<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryInfo from '@/components/CategoryInfo.vue'
import type { Event } from '@/types'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref<Event[]>(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/kengChayodom/Compo-Lab02/db')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log('There was an error!', error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>

  <div class="category">
    <CategoryInfo v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
