import axios, { type AxiosResponse } from 'axios'
import type { Event as EventType } from '@/types'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },

  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
  saveEvent(event: EventType) {
    // Remove id field before posting (let json-server auto-generate)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...eventData } = event
    return apiClient.post('/events', eventData)
  },

  getEventsByKeyword(keyword: string, perPage: number, page: number) {
    const q = encodeURIComponent(keyword)
    return apiClient.get(
      `/events?title=${q}&description=${q}&organizer=${q}&_limit=${perPage}&_page=${page}`,
    )
  },
}
