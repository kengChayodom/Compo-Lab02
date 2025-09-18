<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryInfo from '@/components/CategoryInfo.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const router = useRouter()

const events = ref<Event[] | null>([])
const totalEvents = ref(0)
const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
})

const pageSizeOption = [2, 3, 4, 6]

const page = computed(() => props.page)
const pageSize = computed(() => props.pageSize)
const keyword = ref('')

// Function to load events (similar to your original)
function loadEvents() {
  EventService.getEvents(pageSize.value, page.value)
    .then((response) => {
      console.log('Loading normal events:', response.data)
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.log('There was an error!', error)
    })
}

// Your original updateKeyword function with fixes
function updateKeyword(value: string) {
  keyword.value = value // Make sure to update the ref
  let queryFunction

  if (value.trim() === '') {
    // Load all events when search is empty
    queryFunction = EventService.getEvents(pageSize.value, page.value)
  } else {
    // Search with keyword
    queryFunction = EventService.getEventsByKeyword(value, pageSize.value, page.value)
  }

  queryFunction
    .then((response) => {
      console.log('Search results:', response.data)
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.log('Search error:', error)
      router.push({ name: 'NetworkError' })
    })
}

// Load initial events
onMounted(() => {
  loadEvents()
})

// Watch for page/pageSize changes (when not searching)
watch([page, pageSize], () => {
  if (keyword.value.trim() === '') {
    loadEvents()
  } else {
    // If we have a keyword, search again with new pagination
    updateKeyword(keyword.value)
  }
})
</script>

<template>
  <div class="flex justify-center gap-4 my-6">
    <router-link
      v-for="size in pageSizeOption"
      :key="size"
      :to="{ name: 'home', query: { page: 1, pageSize: size } }"
    >
      <button
        class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition"
        :class="{ 'bg-green-100 text-green-700 font-semibold': pageSize === size }"
      >
        {{ size }} per page
      </button>
    </router-link>
  </div>

  <h1 class="text-3xl">Events For Good</h1>
  <div class="flex flex-col items-center">
    <div>
      <input
        v-model="keyword"
        type="text"
        placeholder="Search..."
        @input="(e) => updateKeyword((e.target as HTMLInputElement).value)"
        class="border rounded px-2 py-1 w-full"
      />
    </div>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="flex w-[290px] justify-between text-blue-700 font-medium">
      <router-link
        class="text-left hover:underline"
        :to="{ name: 'home', query: { page: page - 1, pageSize: pageSize } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Prev Page
      </router-link>
      <router-link
        class="text-right hover:underline"
        :to="{ name: 'home', query: { page: page + 1, pageSize: pageSize } }"
        rel="next"
        v-if="hasNexPage"
      >
        Next Page &#62;
      </router-link>
    </div>
  </div>

  <div class="flex flex-col items-end mt-10 gap-4">
    <CategoryInfo v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>
