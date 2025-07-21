<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryInfo from '@/components/CategoryInfo.vue'
import type { Event } from '@/types'
import { ref, onMounted, computed } from 'vue'
import EventService from '@/services/EventService'

const events = ref<Event[]>([])
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
})
const page = computed(() => props.page)
onMounted(() => {
  EventService.getEvents(2, page.value)
    .then((response) => {
      console.log(response.data)
      events.value = response.data
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
