import type { Event as EventType } from '@/types'
import apiClient from './AxiosCLient'
import type { AxiosResponse } from 'axios'

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

  getEventsByKeyword(
    keyword: string,
    perPage: number,
    page: number,
  ): Promise<AxiosResponse<EventType[]>> {
    const url = `/events?q=${encodeURIComponent(keyword)}&_limit=${perPage}&_page=${page}`
    console.log('API URL:', url)
    return apiClient.get<EventType[]>(url)
  },
}
