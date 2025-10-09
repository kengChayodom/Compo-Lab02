// import type { Organizer } from '@/types'
import type { Organizer } from '@/types'
import apiClient from './AxiosCLient'

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
