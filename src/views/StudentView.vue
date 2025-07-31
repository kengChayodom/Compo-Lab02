<script setup lang="ts">
import type { Student } from '@/types'
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'
import StudentCard from '@/components/StudentCard.vue'

const students = ref<Student[]>([])

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      console.log(response.data)
      students.value = response.data
    })
    .catch((error) => {
      console.log('There was an error!', error)
    })
})
</script>

<template>
  <h1>Student</h1>
  <div class="flex flex-col items-center gap-4">
    <StudentCard v-for="student in students" :key="student.id" :student="student" />
  </div>
</template>
