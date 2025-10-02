<script setup lang="ts">
import { type Organizer } from '@/types'
import { ref } from 'vue'
import OrganizeService from '@/services/OrganizerService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'

const organizer = ref<Organizer>({
  id: 0,
  name: '',
  images: [],
})

const router = useRouter()
const store = useMessageStore()

function saveOrganizer() {
  OrganizeService.saveOrganizer(organizer.value)
    .then((response) => {
      router.push({ name: 'organizers-detail-view', params: { id: response.data.id } })
      store.updateMessage('You have successfully added a new organizer: ' + response.data.name)
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
      <h1>Create an Organize</h1>

      <form @submit.prevent="saveOrganizer">
        <h3>Organize Information</h3>

        <label>Organize Name</label>
        <BaseInput v-model="organizer.name" type="text" label="Name" class="field" />

        <h3>The image of the Organizer</h3>
        <ImageUpload v-model="organizer.images" />

        <div class="button-group">
          <button class="button -fill-gradient" type="submit">Create Organize</button>
        </div>
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
  color: #2c3e50;
}

.card h3 {
  color: #34495e;
  margin-bottom: 16px;
  margin-top: 24px;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.button-group .button {
  flex: 1;
}

textarea.field {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

@media (max-width: 480px) {
  .card {
    padding: 20px;
  }

  .button-group {
    flex-direction: column;
  }

  .button-group .button {
    flex: none;
  }
}
</style>
