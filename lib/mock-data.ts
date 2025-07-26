import { User, ServiceRequest, Room, UserRole } from './types'

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: 'guest-1',
    email: 'guest@hotel.com',
    role: 'guest',
    name: 'John Smith',
    phone: '+1-555-0123',
    roomNumber: '305'
  },
  {
    id: 'housekeeper-1',
    email: 'maria@hotel.com',
    role: 'housekeeper',
    name: 'Maria Garcia',
    assignedRooms: ['301', '302', '303', '304', '305']
  },
  {
    id: 'admin-1',
    email: 'admin@hotel.com',
    role: 'admin',
    name: 'Sarah Johnson'
  }
]

// Mock service requests
export const mockRequests: ServiceRequest[] = [
  {
    id: 'req-1',
    guestId: 'guest-1',
    guestName: 'John Smith',
    roomNumber: '305',
    phone: '+1-555-0123',
    message: 'Extra blanket needed',
    status: 'new',
    priority: 'medium',
    category: 'Housekeeping',
    createdAt: new Date('2025-01-26T10:30:00'),
    rating: 5
  },
  {
    id: 'req-2',
    guestId: 'guest-2',
    guestName: 'Jane Doe',
    roomNumber: '217',
    phone: '+1-555-0124',
    message: "TV isn't working",
    status: 'in_progress',
    priority: 'high',
    category: 'Maintenance',
    createdAt: new Date('2025-01-26T09:15:00'),
    assignedTo: 'tech-1'
  },
  {
    id: 'req-3',
    guestId: 'guest-3',
    guestName: 'Bob Wilson',
    roomNumber: '414',
    phone: '+1-555-0125',
    message: 'Need more towels',
    status: 'new',
    priority: 'low',
    category: 'Housekeeping',
    createdAt: new Date('2025-01-26T11:45:00')
  },
  {
    id: 'req-4',
    guestId: 'guest-4',
    guestName: 'Alice Brown',
    roomNumber: '112',
    phone: '+1-555-0126',
    message: 'Late checkout request',
    status: 'new',
    priority: 'medium',
    category: 'Front Desk',
    createdAt: new Date('2025-01-26T12:00:00')
  },
  {
    id: 'req-5',
    guestId: 'guest-5',
    guestName: 'Mike Davis',
    roomNumber: '208',
    phone: '+1-555-0127',
    message: 'Leaking faucet in bathroom',
    status: 'in_progress',
    priority: 'high',
    category: 'Maintenance',
    createdAt: new Date('2025-01-26T08:30:00'),
    assignedTo: 'maint-1'
  }
]

// Mock rooms
export const mockRooms: Room[] = [
  {
    id: 'room-305',
    number: '305',
    status: 'occupied',
    guestName: 'John Smith',
    checkIn: new Date('2025-01-25'),
    checkOut: new Date('2025-01-28'),
    assignedHousekeeper: 'housekeeper-1'
  },
  {
    id: 'room-217',
    number: '217',
    status: 'occupied',
    guestName: 'Jane Doe',
    assignedHousekeeper: 'housekeeper-2'
  },
  {
    id: 'room-414',
    number: '414',
    status: 'occupied',
    guestName: 'Bob Wilson',
    assignedHousekeeper: 'housekeeper-1'
  },
  {
    id: 'room-503',
    number: '503',
    status: 'vacant',
    lastCleaned: new Date('2025-01-26T06:00:00')
  },
  {
    id: 'room-104',
    number: '104',
    status: 'occupied',
    guestName: 'Charlie Green'
  }
]

// Mock current user state
let currentUser: User | null = mockUsers[0] // Default to guest user

export const getCurrentUser = (): User | null => currentUser

export const setCurrentUser = (user: User | null) => {
  currentUser = user
  console.log('Current user set to:', user?.name, user?.role)
}

export const switchUserRole = (role: UserRole) => {
  const user = mockUsers.find(u => u.role === role)
  if (user) {
    setCurrentUser(user)
    console.log('Switched to user role:', role)
  }
}