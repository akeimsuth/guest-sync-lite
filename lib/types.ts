export type UserRole = 'guest' | 'housekeeper' | 'admin'

export type RequestStatus = 'new' | 'in_progress' | 'completed'

export type RoomStatus = 'occupied' | 'vacant' | 'maintenance' | 'cleaning'

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
  phone?: string
  roomNumber?: string
  assignedRooms?: string[]
}

export interface ServiceRequest {
  id: string
  guestId: string
  guestName: string
  roomNumber: string
  phone: string
  message: string
  status: RequestStatus
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: Date
  assignedTo?: string
  completedAt?: Date
  rating?: number
  response?: string
}

export interface Room {
  id: string
  number: string
  status: RoomStatus
  guestName?: string
  checkIn?: Date
  checkOut?: Date
  assignedHousekeeper?: string
  lastCleaned?: Date
  notes?: string
}

export interface HousekeeperStats {
  todayRequests: number
  avgResponseTime: number
  avgRating: number
  completedToday: number
}