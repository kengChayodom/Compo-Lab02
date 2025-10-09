import apiClient from './AxiosCLient'

export default {
  getStudents() {
    return apiClient.get('/students')
  },
}
