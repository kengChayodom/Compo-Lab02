<script setup lang="ts">
import type { Event, Organizer } from '@/types'
import { onMounted, ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import OrganizerService from '@/services/OrganizerService'
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue'

const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers()
    .then((response) => {
      console.log(response.data)
      organizers.value = response.data
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
})
const event = ref<Event>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petAllowed: false, // << สำคัญ: ให้ตรงกับ backend
  organizer: {
    id: 0,
    name: '',
    images: [],
    roles: [],
  },
  images: [],
})

const router = useRouter()
const store = useMessageStore()
function saveEvent() {
  EventService.saveEvent(event.value)
    .then((response) => {
      router.push({ name: 'event-detail-view', params: { id: response.data.id } })
      store.updateMessage('You are successfully add a new event for ' + response.data.title)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
    })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1>Create an event</h1>
      <form @submit.prevent="saveEvent">
        <BaseInput v-model="event.category" label="Category" type="text" class="field" />

        <h3>Name &amp; describe your event</h3>

        <BaseInput v-model="event.title" type="text" label="Title" class="field" />

        <label>Description</label>
        <BaseInput v-model="event.description" type="text" label="Description" class="field" />

        <h3>Where is your event?</h3>

        <label>Location</label>
        <BaseInput v-model="event.location" type="text" label="Location" class="field" />

        <h3>When is your event?</h3>

        <label>Date</label>
        <BaseInput v-model="event.date" type="text" label="e.g. 1st Jan" class="field" />

        <label>Time</label>
        <BaseInput v-model="event.time" type="text" label="e.g. 12.00 pm." class="field" />

        <label>
          <BaseInput v-model="event.petAllowed" type="checkbox" label="Pet allowed" />
          Pet allowed
        </label>

        <h3>Who is your Organizer?</h3>

        <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" />

        <h3>The image of the Event</h3>
        <ImageUpload v-model="event.images" />

        <button class="button -fill-gradient" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<!-- CSS หลักของฟอร์ม -->
<style src="@/assets/form.css"></style>

<!-- กรอบการ์ดกลางหน้า -->
<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  background: #f7f9fb;
}
.card {
  width: 100%;
  max-width: 720px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}
.card h1 {
  margin-top: 0;
  text-align: center;
}
@media (max-width: 480px) {
  .card {
    padding: 20px;
  }
}
</style>
