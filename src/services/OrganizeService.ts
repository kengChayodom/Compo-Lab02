import type { Organization } from '@/types'
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
  getOrganizes(perPage: number, page: number) {
    return apiClient.get('/organizes?_limit=' + perPage + '&_page=' + page)
  },

  getOrganize(id: number) {
    return apiClient.get('/organizes/' + id)
  },

  saveOrganize(organize: Organization) {
    // Remove id field before posting (let json-server auto-generate)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...organizeData } = organize
    return apiClient.post('/organizes', organizeData)
  },
}
