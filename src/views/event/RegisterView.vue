<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  event: Event
  id: string
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {
  // If the registration API call successful
  // Push back to the event details view
  store.updateMessage('You successsuflly registered for ' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { od: props.event.id } })
}
</script>

<template>
  <p>Register event here</p>
  <button
    class="px-5 py-2 rounded-md bg-gray-600 text-white font-medium hover:bg-green-500 active:scale-95 transition"
    @click="register"
  >
    Register
  </button>
</template>
