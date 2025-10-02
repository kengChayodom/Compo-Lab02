// import type { Organizer } from '@/types'
import type { Organizer } from '@/types'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getOrganizers() {
    return apiClient.get('/organizers')
  },

  getOrganizersLists(perPage: number, page: number) {
    return apiClient.get('/organizers?_limit=' + perPage + '&_page=' + page)
  },

  getOrganizer(id: number) {
    return apiClient.get('/organizers/' + id)
  },

  saveOrganizer(organize: Organizer) {
    // Remove id field before posting (let json-server auto-generate)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...organizeData } = organize
    return apiClient.post('/organizers', organizeData)
  },
}
