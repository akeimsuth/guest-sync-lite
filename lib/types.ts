export type UserRole = 'housekeeper' | 'admin'

export type RequestStatus = 'new' | 'in_progress' | 'completed'

export type RoomStatus = 'occupied' | 'vacant' | 'maintenance' | 'cleaning'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  avatar?: string
  isActive: boolean
  assignedRooms?: string[] // Array of room IDs this staff member is assigned to
}

export interface ServiceRequest {
  id: string
  guestName: string
  roomNumber: string
  category: 'housekeeping' | 'maintenance' | 'technology' | 'front_desk'
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'new' | 'in_progress' | 'completed'
  createdAt: Date
  updatedAt: Date
  assignedTo?: string // User ID of assigned staff member
  response?: string
  phone?: string
}

export interface Room {
  id: string
  number: string
  type: 'standard' | 'deluxe' | 'suite' | 'accessible'
  status: 'occupied' | 'vacant' | 'cleaning' | 'maintenance' | 'out_of_order'
  floor: number
  capacity: number
  price: number
  lastCleaned?: Date
  assignedHousekeeper?: string // User ID of assigned housekeeper
  guestName?: string
  checkInDate?: Date
  checkOutDate?: Date
  notes?: string
  amenities: string[]
  isActive: boolean
  // Cleaning time tracking
  cleaningStartTime?: Date
  cleaningEndTime?: Date
  cleaningDuration?: number // in minutes
  cleaningHistory: CleaningRecord[]
}

export interface HousekeeperStats {
  todayRequests: number
  avgResponseTime: number
  avgRating: number
  completedToday: number
}

export interface Message {
  id: string
  roomId: string
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
  description: string
  participants: string[]
  messages: Message[]
  lastMessage?: Message
  unreadCount: number
  isActive: boolean
}

export interface MaintenanceTask {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  category: 'plumbing' | 'electrical' | 'hvac' | 'structural' | 'appliance' | 'other'
  assignedTo?: string // User ID of assigned maintenance staff
  estimatedDuration: number // in hours
  actualDuration?: number // in hours
  estimatedCost: number
  actualCost?: number
  scheduledDate: Date
  completedDate?: Date
  roomId?: string // Associated room if applicable
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// New types for room management
export interface CreateRoomData {
  number: string
  type: 'standard' | 'deluxe' | 'suite' | 'accessible'
  floor: number
  capacity: number
  price: number
  amenities: string[]
  notes?: string
}

export interface RoomAssignment {
  roomId: string
  housekeeperId: string
  assignedDate: Date
  isActive: boolean
}

// New interface for cleaning time tracking
export interface CleaningRecord {
  id: string
  roomId: string
  housekeeperId: string
  housekeeperName: string
  startTime: Date
  endTime?: Date
  duration?: number // in minutes
  status: 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  qualityRating?: number // 1-5 rating
  issues?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CleaningStats {
  averageTime: number // in minutes
  totalCleanings: number
  onTimeCleanings: number
  delayedCleanings: number
  qualityScore: number // average rating
}