import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
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
}
