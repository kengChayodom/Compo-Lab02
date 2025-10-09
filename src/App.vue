<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useMessageStore } from './stores/message'

import { storeToRefs } from 'pinia'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccountPlus, mdiLogin, mdiAccount, mdiLogout } from '@mdi/js'

import { SpeedInsights } from '@vercel/speed-insights/vue'
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
const router = useRouter()
const store = useMessageStore()
const { message } = storeToRefs(store)

const token = localStorage.getItem('access_token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6 flex gap-20 p-[30px] justify-center">
          <nav class="flex">
            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccountPlus" />
                    <span class="ml-3">Sign Up</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <router-link to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogin" />
                    <span class="ml-3">Login</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/profile" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount" />
                    <span class="ml-3">{{ authStore.currentUserName }}</span>
                  </div>
                </router-link>
              </li>

              <li class="nav-item px-2">
                <a class="nav-link hover:cursor-pointer" @click="logout">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiLogout" />
                    <span class="ml-3">LogOut</span>
                  </div>
                </a>
              </li>
            </ul>
          </nav>

          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }"
            >Event</RouterLink
          >
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'about' }"
            >About</RouterLink
          >
          <span v-if="authStore.isAdmin">
            <RouterLink
              class="font-bold text-gray-700"
              exact-active-class="text-green-500"
              :to="{ name: 'add-event' }"
              >New Event</RouterLink
            >
          </span>
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'students' }"
            >Students</RouterLink
          >
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'organizers' }"
            >Organize</RouterLink
          >

          <span v-if="authStore.isAdmin">
            <RouterLink
              class="font-bold text-gray-700"
              exact-active-class="text-green-500"
              :to="{ name: 'add-organization' }"
              >New Organization</RouterLink
            >
          </span>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>
