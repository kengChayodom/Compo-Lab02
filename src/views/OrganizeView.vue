<script setup lang="ts">
import OrganizeCard from '@/components/OrganizeCard.vue'
import OrganizeService from '@/services/OrganizeService'
import { type Organization } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'

const organizes = ref<Organization[] | null>([])
const totalOrganize = ref(0)
const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalOrganize.value / pageSize.value)

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

const page = computed(() => props.page || 1)
const pageSize = computed(() => props.pageSize || 2)

onMounted(() => {
  watchEffect(() => {
    OrganizeService.getOrganizes(pageSize.value, page.value)
      .then((response) => {
        console.log(response.data)

        organizes.value = response.data
        totalOrganize.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.log('There was an error!', error)
      })
  })
})
</script>

<template>
  <div class="flex justify-center gap-4 my-6">
    <router-link
      v-for="size in pageSizeOption"
      :key="size"
      :to="{ name: 'organizes', query: { page: 1, pageSize: size } }"
    >
      <button
        class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition"
        :class="{ 'bg-green-100 text-green-700 font-semibold': pageSize === size }"
      >
        {{ size }} per page
      </button>
    </router-link>
  </div>

  <h1 class="text-3xl">Organize</h1>
  <div class="flex flex-col items-center">
    <OrganizeCard v-for="organize in organizes" :key="organize.id" :organize="organize" />
    <div class="flex w-[290px] justify-between text-blue-700 font-medium">
      <router-link
        class="text-left hover:underline"
        :to="{ name: 'organizes', query: { page: page - 1, pageSize: pageSize } }"
        rel="prev"
        v-if="page != 1"
      >
        &#60; Prev Page
      </router-link>
      <router-link
        class="text-right hover:underline"
        :to="{ name: 'organizes', query: { page: page + 1, pageSize: pageSize } }"
        rel="next"
        v-if="hasNexPage"
      >
        Next Page &#62;
      </router-link>
    </div>
  </div>
</template>
