import { User, ServiceRequest, Room, UserRole, ChatRoom, Message } from './types'

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: 'housekeeper-1',
    email: 'maria@hotel.com',
    role: 'housekeeper',
    name: 'Maria Garcia',
    assignedRooms: ['301', '302', '303', '304', '305']
  },
  {
    id: 'housekeeper-2',
    email: 'juan@hotel.com',
    role: 'housekeeper',
    name: 'Juan Rodriguez',
    assignedRooms: ['201', '202', '203', '204', '205']
  },
  {
    id: 'admin-1',
    email: 'admin@hotel.com',
    role: 'admin',
    name: 'Sarah Johnson'
  },
  {
    id: 'admin-2',
    email: 'manager@hotel.com',
    role: 'admin',
    name: 'Michael Chen'
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
    message: 'Extra blanket needed for the night',
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
    message: "TV isn't working properly, channels are fuzzy",
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
    message: 'Need more towels and toiletries',
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
    message: 'Late checkout request for 2 PM',
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
    message: 'Leaking faucet in bathroom, water everywhere',
    status: 'in_progress',
    priority: 'high',
    category: 'Maintenance',
    createdAt: new Date('2025-01-26T08:30:00'),
    assignedTo: 'maint-1'
  },
  {
    id: 'req-6',
    guestId: 'guest-6',
    guestName: 'Emily Johnson',
    roomNumber: '503',
    phone: '+1-555-0128',
    message: 'Room temperature too cold, AC not working',
    status: 'new',
    priority: 'high',
    category: 'Maintenance',
    createdAt: new Date('2025-01-26T13:20:00')
  },
  {
    id: 'req-7',
    guestId: 'guest-7',
    guestName: 'David Lee',
    roomNumber: '104',
    phone: '+1-555-0129',
    message: 'WiFi connection is very slow',
    status: 'new',
    priority: 'medium',
    category: 'Technology',
    createdAt: new Date('2025-01-26T14:10:00')
  },
  {
    id: 'req-8',
    guestId: 'guest-8',
    guestName: 'Lisa Wang',
    roomNumber: '301',
    phone: '+1-555-0130',
    message: 'Room cleaning needed, towels and sheets',
    status: 'completed',
    priority: 'medium',
    category: 'Housekeeping',
    createdAt: new Date('2025-01-26T07:00:00'),
    completedAt: new Date('2025-01-26T09:30:00'),
    rating: 4
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
    checkIn: new Date('2025-01-24'),
    checkOut: new Date('2025-01-27'),
    assignedHousekeeper: 'housekeeper-2'
  },
  {
    id: 'room-414',
    number: '414',
    status: 'occupied',
    guestName: 'Bob Wilson',
    checkIn: new Date('2025-01-26'),
    checkOut: new Date('2025-01-29'),
    assignedHousekeeper: 'housekeeper-1'
  },
  {
    id: 'room-503',
    number: '503',
    status: 'occupied',
    guestName: 'Emily Johnson',
    checkIn: new Date('2025-01-25'),
    checkOut: new Date('2025-01-30'),
    assignedHousekeeper: 'housekeeper-2'
  },
  {
    id: 'room-104',
    number: '104',
    status: 'occupied',
    guestName: 'David Lee',
    checkIn: new Date('2025-01-26'),
    checkOut: new Date('2025-01-28'),
    assignedHousekeeper: 'housekeeper-1'
  },
  {
    id: 'room-301',
    number: '301',
    status: 'cleaning',
    lastCleaned: new Date('2025-01-26T09:30:00'),
    assignedHousekeeper: 'housekeeper-1'
  },
  {
    id: 'room-208',
    number: '208',
    status: 'maintenance',
    guestName: 'Mike Davis',
    checkIn: new Date('2025-01-25'),
    checkOut: new Date('2025-01-27'),
    assignedHousekeeper: 'housekeeper-2',
    notes: 'Plumbing issue - faucet repair needed'
  },
  {
    id: 'room-112',
    number: '112',
    status: 'occupied',
    guestName: 'Alice Brown',
    checkIn: new Date('2025-01-26'),
    checkOut: new Date('2025-01-27'),
    assignedHousekeeper: 'housekeeper-1'
  },
  {
    id: 'room-201',
    number: '201',
    status: 'vacant',
    lastCleaned: new Date('2025-01-26T06:00:00'),
    assignedHousekeeper: 'housekeeper-2'
  },
  {
    id: 'room-202',
    number: '202',
    status: 'vacant',
    lastCleaned: new Date('2025-01-26T06:30:00'),
    assignedHousekeeper: 'housekeeper-2'
  },
  {
    id: 'room-203',
    number: '203',
    status: 'occupied',
    guestName: 'Sarah Miller',
    checkIn: new Date('2025-01-26'),
    checkOut: new Date('2025-01-29'),
    assignedHousekeeper: 'housekeeper-2'
  },
  {
    id: 'room-204',
    number: '204',
    status: 'cleaning',
    lastCleaned: new Date('2025-01-26T10:00:00'),
    assignedHousekeeper: 'housekeeper-2'
  },
  {
    id: 'room-205',
    number: '205',
    status: 'vacant',
    lastCleaned: new Date('2025-01-26T07:00:00'),
    assignedHousekeeper: 'housekeeper-2'
  }
]

// Mock chat messages
const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'admin-1',
    senderName: 'Sarah Johnson',
    senderRole: 'admin',
    content: 'Good morning team! How are we looking today?',
    timestamp: new Date('2025-01-26T08:00:00'),
    isRead: true
  },
  {
    id: 'msg-2',
    senderId: 'housekeeper-1',
    senderName: 'Maria Garcia',
    senderRole: 'housekeeper',
    content: 'Morning Sarah! I\'ve completed rooms 301-304. Room 305 has a guest request for extra blankets.',
    timestamp: new Date('2025-01-26T08:05:00'),
    isRead: true
  },
  {
    id: 'msg-3',
    senderId: 'admin-1',
    senderName: 'Sarah Johnson',
    senderRole: 'admin',
    content: 'Perfect! I\'ll handle the blanket request. Any issues with the cleaning?',
    timestamp: new Date('2025-01-26T08:07:00'),
    isRead: true
  },
  {
    id: 'msg-4',
    senderId: 'housekeeper-1',
    senderName: 'Maria Garcia',
    senderRole: 'housekeeper',
    content: 'All good! The new cleaning supplies are working great.',
    timestamp: new Date('2025-01-26T08:10:00'),
    isRead: false
  },
  {
    id: 'msg-5',
    senderId: 'housekeeper-2',
    senderName: 'Juan Rodriguez',
    senderRole: 'housekeeper',
    content: 'Hi team! I\'m starting on the 2nd floor. Room 208 has a maintenance issue.',
    timestamp: new Date('2025-01-26T08:15:00'),
    isRead: true
  },
  {
    id: 'msg-6',
    senderId: 'admin-1',
    senderName: 'Sarah Johnson',
    senderRole: 'admin',
    content: 'Thanks Juan! I\'ve already logged the maintenance request for room 208.',
    timestamp: new Date('2025-01-26T08:20:00'),
    isRead: false
  }
]

// Mock chat rooms
export const mockChatRooms: ChatRoom[] = [
  {
    id: 'room-general',
    name: 'General Staff',
    participants: ['admin-1', 'admin-2', 'housekeeper-1', 'housekeeper-2'],
    messages: mockMessages,
    lastMessage: mockMessages[mockMessages.length - 1],
    unreadCount: 2
  },
  {
    id: 'room-maintenance',
    name: 'Maintenance Updates',
    participants: ['admin-1', 'admin-2', 'housekeeper-1', 'housekeeper-2'],
    messages: [
      {
        id: 'msg-maint-1',
        senderId: 'admin-1',
        senderName: 'Sarah Johnson',
        senderRole: 'admin',
        content: 'Heads up: HVAC maintenance scheduled for tomorrow 9-11 AM',
        timestamp: new Date('2025-01-26T07:30:00'),
        isRead: true
      },
      {
        id: 'msg-maint-2',
        senderId: 'admin-1',
        senderName: 'Sarah Johnson',
        senderRole: 'admin',
        content: 'Room 208 plumbing issue has been assigned to maintenance team',
        timestamp: new Date('2025-01-26T08:30:00'),
        isRead: false
      }
    ],
    lastMessage: {
      id: 'msg-maint-2',
      senderId: 'admin-1',
      senderName: 'Sarah Johnson',
      senderRole: 'admin',
      content: 'Room 208 plumbing issue has been assigned to maintenance team',
      timestamp: new Date('2025-01-26T08:30:00'),
      isRead: false
    },
    unreadCount: 1
  },
  {
    id: 'room-emergency',
    name: 'Emergency Alerts',
    participants: ['admin-1', 'admin-2'],
    messages: [],
    unreadCount: 0
  },
  {
    id: 'room-housekeeping',
    name: 'Housekeeping Team',
    participants: ['housekeeper-1', 'housekeeper-2'],
    messages: [
      {
        id: 'msg-hk-1',
        senderId: 'housekeeper-1',
        senderName: 'Maria Garcia',
        senderRole: 'housekeeper',
        content: 'Good morning! Starting my rounds on the 3rd floor.',
        timestamp: new Date('2025-01-26T07:00:00'),
        isRead: true
      },
      {
        id: 'msg-hk-2',
        senderId: 'housekeeper-2',
        senderName: 'Juan Rodriguez',
        senderRole: 'housekeeper',
        content: 'Morning Maria! I\'ll be on the 2nd floor today.',
        timestamp: new Date('2025-01-26T07:05:00'),
        isRead: true
      }
    ],
    lastMessage: {
      id: 'msg-hk-2',
      senderId: 'housekeeper-2',
      senderName: 'Juan Rodriguez',
      senderRole: 'housekeeper',
      content: 'Morning Maria! I\'ll be on the 2nd floor today.',
      timestamp: new Date('2025-01-26T07:05:00'),
      isRead: true
    },
    unreadCount: 0
  }
]

// Mock current user state
let currentUser: User | null = mockUsers[0] // Default to housekeeper user

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