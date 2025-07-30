export type UserRole = 'housekeeper' | 'admin'

export type RequestStatus = 'new' | 'in_progress' | 'completed'

export type RoomStatus = 'occupied' | 'vacant' | 'maintenance' | 'cleaning'

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
  phone?: string
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
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdAt: Date
  assignedTo?: string
  completedAt?: Date
  rating?: number
}

export interface Room {
  id: string
  number: string
  status: RoomStatus
  guestName?: string
  checkIn?: Date
  checkOut?: Date
  lastCleaned?: Date
  assignedHousekeeper?: string
  notes?: string
}

export interface HousekeeperStats {
  todayRequests: number
  avgResponseTime: number
  avgRating: number
  completedToday: number
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: UserRole
  content: string
  timestamp: Date
  isRead: boolean
}

export interface ChatRoom {
  id: string
  name: string
  participants: string[]
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
}