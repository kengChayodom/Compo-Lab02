export interface Event {
  id: number
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: string
}

export interface Student {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  image: string
  description: string
}

export interface Organization {
  id: number
  organization_Name: string
  address: string
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}
