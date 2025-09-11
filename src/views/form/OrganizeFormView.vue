<script setup lang="ts">
import { type Organization } from '@/types'
import { ref } from 'vue'
import OrganizeService from '@/services/OrganizeService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const organize = ref<Organization>({
  id: 0,
  organization_Name: '',
  address: '',
})

const router = useRouter()
const store = useMessageStore()

function saveOrganize() {
  OrganizeService.saveOrganize(organize.value)
    .then((response) => {
      router.push({ name: 'organize-detail-view', params: { id: response.data.id } })
      store.updateMessage(
        'You have successfully added a new organize: ' + response.data.organization_Name,
      )
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

      <form @submit.prevent="saveOrganize">
        <h3>Organize Information</h3>

        <label>Organize Name</label>
        <input
          v-model="organize.organization_Name"
          type="text"
          placeholder="Enter organize name"
          class="field"
          required
        />

        <label>Address</label>
        <textarea
          v-model="organize.address"
          placeholder="Enter organize address"
          class="field"
          rows="3"
          required
        ></textarea>

        <div class="button-group">
          <button class="button -fill-gradient" type="submit">Create Organize</button>
          <button class="button -fill-gray" type="reset">Reset</button>
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
