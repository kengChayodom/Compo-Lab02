<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import CategoryInfo from '@/components/CategoryInfo.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'

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

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(pageSize.value, page.value)
      .then((response) => {
        console.log(response.data)

        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log('There was an error!', error)
      })
  })
})
</script>

<template>
  <div class="page-size-links">
    <router-link
      v-for="size in pageSizeOption"
      :key="size"
      :to="{ name: 'home', query: { page: 1, pageSize: size } }"
      :class="{ active: pageSize === size }"
      ><button>{{ size }} per page</button>
    </router-link>
  </div>

  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'home', query: { page: page - 1, pageSize: pageSize } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Prev Page
      </router-link>
      <router-link
        id="page-next"
        :to="{ name: 'home', query: { page: page + 1, pageSize: pageSize } }"
        rel="next"
        v-if="hasNexPage"
      >
        Next Page &#62;
      </router-link>
    </div>
  </div>

  <div class="category">
    <CategoryInfo v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.page-size-links {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

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

.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
