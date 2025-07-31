<script setup lang="ts">
import type { Student } from '@/types'
defineProps<{
  student: Student
}>()
</script>

<template>
  <div class="flex justify-center">
    <div
      class="p-5 w-[250px] cursor-pointer border border-gray-600 mb-[18px] transition-transform duration-200 hover:scale-105 hover:shadow-md"
    >
      <h2 class="text-lg font-semibold mb-1">{{ student.name }} {{ student.surname }}</h2>
      <h3>{{ student.gpa }}</h3>
    </div>
  </div>
</template>
