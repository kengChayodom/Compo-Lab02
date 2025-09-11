<script setup lang="ts">
import { type Event as EventType } from '@/types'
import { ref } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const event = ref<EventType>({
  id: 0,
  category: '',
  title: '',
  description: '',
  location: '',
  date: '',
  time: '',
  petsAllowed: false, // << สำคัญ: ให้ตรงกับ backend
  organizer: '',
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
        <label>Category</label>
        <input v-model="event.category" type="text" placeholder="Category" class="field" />

        <h3>Name &amp; describe your event</h3>

        <label>Title</label>
        <input v-model="event.title" type="text" placeholder="Title" class="field" />

        <label>Description</label>
        <input v-model="event.description" type="text" placeholder="Description" class="field" />

        <h3>Where is your event?</h3>

        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Location" class="field" />

        <h3>When is your event?</h3>

        <label>Date</label>
        <input v-model="event.date" type="text" placeholder="e.g. 1st Jan" class="field" />

        <label>Time</label>
        <input v-model="event.time" type="text" placeholder="e.g. 12.00 pm." class="field" />

        <label>
          <input v-model="event.petsAllowed" type="checkbox" />
          Pet allowed
        </label>

        <label>Organizer</label>
        <input v-model="event.organizer" type="text" placeholder="Organizer" class="field" />

        <button class="button -fill-gradient" type="submit">Submit</button>
        <button class="button -fill-gray" type="reset">Reset</button>
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
