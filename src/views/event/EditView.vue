<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import { type Event } from '@/types'
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router'

const props = defineProps<{
  event: Event
  id: string
}>()

const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const Edit = () => {
  // If the registration API call successful
  // Push back to the event details view
  store.updateMessage('You successsuflly go to Detail page')
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { od: props.event.id } })
}
</script>

<template>
  <p>Edit event here</p>

  <button @click="Edit">GO to detail page</button>
</template>
