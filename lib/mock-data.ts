import { User, ServiceRequest, Room, UserRole, ChatRoom, Message, MaintenanceTask } from './types'

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@hotel.com',
    role: 'admin',
    phone: '+1-555-0101',
    avatar: '/avatars/sarah.jpg',
    isActive: true,
    assignedRooms: []
  },
  {
    id: 'housekeeper-1',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@hotel.com',
    role: 'housekeeper',
    phone: '+1-555-0102',
    avatar: '/avatars/maria.jpg',
    isActive: true,
    assignedRooms: ['room-101', 'room-102', 'room-103', 'room-201', 'room-202']
  },
  {
    id: 'housekeeper-2',
    name: 'James Wilson',
    email: 'james.wilson@hotel.com',
    role: 'housekeeper',
    phone: '+1-555-0103',
    avatar: '/avatars/james.jpg',
    isActive: true,
    assignedRooms: ['room-104', 'room-105', 'room-203', 'room-204', 'room-205']
  },
  {
    id: 'admin-2',
    name: 'Michael Chen',
    email: 'michael.chen@hotel.com',
    role: 'admin',
    phone: '+1-555-0104',
    avatar: '/avatars/michael.jpg',
    isActive: true,
    assignedRooms: []
  },
  {
    id: 'housekeeper-3',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@hotel.com',
    role: 'housekeeper',
    phone: '+1-555-0105',
    avatar: '/avatars/lisa.jpg',
    isActive: true,
    assignedRooms: ['room-301', 'room-302', 'room-303', 'room-304', 'room-305']
  },
  {
    id: 'housekeeper-4',
    name: 'David Brown',
    email: 'david.brown@hotel.com',
    role: 'housekeeper',
    phone: '+1-555-0106',
    avatar: '/avatars/david.jpg',
    isActive: true,
    assignedRooms: ['room-106', 'room-107', 'room-108', 'room-109', 'room-110']
  }
]

// Mock service requests
export const mockRequests: ServiceRequest[] = [
  {
    id: 'req-1',
    guestName: 'John Smith',
    roomNumber: '305',
    category: 'housekeeping',
    message: 'Extra blanket needed for the night',
    priority: 'medium',
    status: 'new',
    createdAt: new Date('2025-01-26T10:30:00'),
    updatedAt: new Date('2025-01-26T10:30:00'),
    phone: '+1-555-0123'
  },
  {
    id: 'req-2',
    guestName: 'Jane Doe',
    roomNumber: '217',
    category: 'maintenance',
    message: "TV isn't working properly, channels are fuzzy",
    priority: 'high',
    status: 'in_progress',
    createdAt: new Date('2025-01-26T09:15:00'),
    updatedAt: new Date('2025-01-26T09:15:00'),
    assignedTo: 'tech-1',
    phone: '+1-555-0124'
  },
  {
    id: 'req-3',
    guestName: 'Bob Wilson',
    roomNumber: '414',
    category: 'housekeeping',
    message: 'Need more towels and toiletries',
    priority: 'low',
    status: 'new',
    createdAt: new Date('2025-01-26T11:45:00'),
    updatedAt: new Date('2025-01-26T11:45:00'),
    phone: '+1-555-0125'
  },
  {
    id: 'req-4',
    guestName: 'Alice Brown',
    roomNumber: '112',
    category: 'front_desk',
    message: 'Late checkout request for 2 PM',
    priority: 'medium',
    status: 'new',
    createdAt: new Date('2025-01-26T12:00:00'),
    updatedAt: new Date('2025-01-26T12:00:00'),
    phone: '+1-555-0126'
  },
  {
    id: 'req-5',
    guestName: 'Mike Davis',
    roomNumber: '208',
    category: 'maintenance',
    message: 'Leaking faucet in bathroom, water everywhere',
    priority: 'high',
    status: 'in_progress',
    createdAt: new Date('2025-01-26T08:30:00'),
    updatedAt: new Date('2025-01-26T08:30:00'),
    assignedTo: 'maint-1',
    phone: '+1-555-0127'
  },
  {
    id: 'req-6',
    guestName: 'Emily Johnson',
    roomNumber: '503',
    category: 'maintenance',
    message: 'Room temperature too cold, AC not working',
    priority: 'high',
    status: 'new',
    createdAt: new Date('2025-01-26T13:20:00'),
    updatedAt: new Date('2025-01-26T13:20:00'),
    phone: '+1-555-0128'
  },
  {
    id: 'req-7',
    guestName: 'David Lee',
    roomNumber: '104',
    category: 'technology',
    message: 'WiFi connection is very slow',
    priority: 'medium',
    status: 'new',
    createdAt: new Date('2025-01-26T14:10:00'),
    updatedAt: new Date('2025-01-26T14:10:00'),
    phone: '+1-555-0129'
  },
  {
    id: 'req-8',
    guestName: 'Lisa Wang',
    roomNumber: '301',
    category: 'housekeeping',
    message: 'Request for extra pillows and room service menu',
    priority: 'low',
    status: 'completed',
    createdAt: new Date('2025-01-26T15:00:00'),
    updatedAt: new Date('2025-01-26T16:30:00'),
    assignedTo: 'housekeeper-1',
    response: 'Pillows and menu delivered. Guest satisfied.',
    phone: '+1-555-0130'
  }
]

// Mock rooms
export const mockRooms: Room[] = [
  {
    id: 'room-101',
    number: '101',
    type: 'standard',
    status: 'occupied',
    floor: 1,
    capacity: 2,
    price: 120,
    lastCleaned: new Date('2025-07-15T08:00:00Z'),
    assignedHousekeeper: 'housekeeper-1',
    guestName: 'John Smith',
    checkInDate: new Date('2025-07-14T15:00:00Z'),
    checkOutDate: new Date('2025-07-16T11:00:00Z'),
    notes: 'Guest requested extra towels',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningStartTime: new Date('2025-07-15T09:00:00Z'),
    cleaningEndTime: new Date('2025-07-15T09:15:00Z'),
    cleaningDuration: 75, // 1 hour 15 minutes
    cleaningHistory: [
      {
        id: 'clean-101-1',
        roomId: 'room-101',
        housekeeperId: 'housekeeper-1',
        housekeeperName: 'Maria Rodriguez',
        startTime: new Date('2025-07-15T08:00:00Z'),
        endTime: new Date('2025-07-15T09:15:00Z'),
        duration: 75,
        status: 'completed',
        notes: 'Standard cleaning completed',
        qualityRating: 5,
        createdAt: new Date('2025-07-15T08:00:00Z'),
        updatedAt: new Date('2025-07-15T09:15:00Z')
      }
    ]
  },
  {
    id: 'room-102',
    number: '102',
    type: 'standard',
    status: 'cleaning',
    floor: 1,
    capacity: 2,
    price: 120,
    lastCleaned: new Date('2025-08-15T09:00:00Z'),
    assignedHousekeeper: 'housekeeper-1',
    notes: 'Ready for next guest',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningStartTime: new Date('2025-08-16T08:00:00Z'),
    
    cleaningHistory: [
      {
        id: 'clean-102-1',
        roomId: 'room-102',
        housekeeperId: 'housekeeper-1',
        housekeeperName: 'Maria Rodriguez',
        startTime: new Date('2025-08-15T09:00:00Z'),
        status: 'in_progress',
        notes: 'Currently being cleaned',
        createdAt: new Date('2025-08-15T09:00:00Z'),
        updatedAt: new Date('2025-08-15T09:00:00Z')
      }
    ]
  },
  {
    id: 'room-103',
    number: '103',
    type: 'deluxe',
    status: 'occupied',
    floor: 1,
    capacity: 3,
    price: 180,
    lastCleaned: new Date('2024-01-14T10:00:00Z'),
    assignedHousekeeper: 'housekeeper-1',
    guestName: 'Emily Davis',
    checkInDate: new Date('2024-01-13T14:00:00Z'),
    checkOutDate: new Date('2024-01-17T10:00:00Z'),
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Mini Bar', 'Ocean View'],
    isActive: true,
    cleaningStartTime: new Date('2024-01-14T10:00:00Z'),
    cleaningEndTime: new Date('2024-01-14T11:45:00Z'),
    cleaningDuration: 105, // 1 hour 45 minutes
    cleaningHistory: [
      {
        id: 'clean-103-1',
        roomId: 'room-103',
        housekeeperId: 'housekeeper-1',
        housekeeperName: 'Maria Rodriguez',
        startTime: new Date('2024-01-14T10:00:00Z'),
        endTime: new Date('2024-01-14T11:45:00Z'),
        duration: 105,
        status: 'completed',
        notes: 'Deluxe room requires extra attention to detail',
        qualityRating: 5,
        createdAt: new Date('2024-01-14T10:00:00Z'),
        updatedAt: new Date('2024-01-14T11:45:00Z')
      }
    ]
  },
  {
    id: 'room-104',
    number: '104',
    type: 'standard',
    status: 'vacant',
    floor: 1,
    capacity: 2,
    price: 120,
    lastCleaned: new Date('2024-01-15T11:00:00Z'),
    assignedHousekeeper: 'housekeeper-2',
    notes: 'Available for immediate check-in',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningStartTime: new Date('2024-01-15T11:00:00Z'),
    cleaningEndTime: new Date('2024-01-15T12:20:00Z'),
    cleaningDuration: 80, // 1 hour 20 minutes
    cleaningHistory: [
      {
        id: 'clean-104-1',
        roomId: 'room-104',
        housekeeperId: 'housekeeper-2',
        housekeeperName: 'James Wilson',
        startTime: new Date('2024-01-15T11:00:00Z'),
        endTime: new Date('2024-01-15T12:20:00Z'),
        duration: 80,
        status: 'completed',
        notes: 'Standard cleaning completed',
        qualityRating: 4,
        createdAt: new Date('2024-01-15T11:00:00Z'),
        updatedAt: new Date('2024-01-15T12:20:00Z')
      }
    ]
  },
  {
    id: 'room-105',
    number: '105',
    type: 'suite',
    status: 'maintenance',
    floor: 1,
    capacity: 4,
    price: 280,
    lastCleaned: new Date('2024-01-10T08:00:00Z'),
    assignedHousekeeper: 'housekeeper-2',
    notes: 'HVAC system repair in progress',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Kitchen', 'Living Room', 'Balcony'],
    isActive: true,
    cleaningStartTime: new Date('2024-01-10T08:00:00Z'),
    cleaningEndTime: new Date('2024-01-10T10:30:00Z'),
    cleaningDuration: 150, // 2 hours 30 minutes
    cleaningHistory: [
      {
        id: 'clean-105-1',
        roomId: 'room-105',
        housekeeperId: 'housekeeper-2',
        housekeeperName: 'James Wilson',
        startTime: new Date('2024-01-10T08:00:00Z'),
        endTime: new Date('2024-01-10T10:30:00Z'),
        duration: 150,
        status: 'completed',
        notes: 'Suite cleaning took longer due to size and amenities',
        qualityRating: 5,
        createdAt: new Date('2024-01-10T08:00:00Z'),
        updatedAt: new Date('2024-01-10T10:30:00Z')
      }
    ]
  },
  {
    id: 'room-201',
    number: '201',
    type: 'standard',
    status: 'occupied',
    floor: 2,
    capacity: 2,
    price: 130,
    lastCleaned: new Date('2024-01-15T07:00:00Z'),
    assignedHousekeeper: 'housekeeper-1',
    guestName: 'Robert Johnson',
    checkInDate: new Date('2024-01-14T16:00:00Z'),
    checkOutDate: new Date('2024-01-18T11:00:00Z'),
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-202',
    number: '202',
    type: 'deluxe',
    status: 'occupied',
    floor: 2,
    capacity: 3,
    price: 190,
    lastCleaned: new Date('2024-01-14T09:00:00Z'),
    assignedHousekeeper: 'housekeeper-1',
    guestName: 'Amanda Wilson',
    checkInDate: new Date('2024-01-12T15:00:00Z'),
    checkOutDate: new Date('2024-01-19T10:00:00Z'),
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Mini Bar', 'City View'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-203',
    number: '203',
    type: 'standard',
    status: 'cleaning',
    floor: 2,
    capacity: 2,
    price: 130,
    lastCleaned: new Date('2024-01-15T10:00:00Z'),
    assignedHousekeeper: 'housekeeper-2',
    notes: 'Deep cleaning in progress',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningStartTime: new Date('2025-08-16T08:20:00Z'),
    cleaningHistory: [
      {
        id: 'clean-203-1',
        roomId: 'room-203',
        housekeeperId: 'housekeeper-2',
        housekeeperName: 'James Wilson',
        startTime: new Date('2025-08-15T10:00:00Z'),
        status: 'in_progress',
        notes: 'Deep cleaning in progress',
        createdAt: new Date('2025-08-15T10:00:00Z'),
        updatedAt: new Date('2025-08-15T10:00:00Z')
      }
    ]
  },
  {
    id: 'room-204',
    number: '204',
    type: 'accessible',
    status: 'vacant',
    floor: 2,
    capacity: 2,
    price: 140,
    lastCleaned: new Date('2025-08-15T12:00:00Z'),
    assignedHousekeeper: 'housekeeper-2',
    notes: 'ADA compliant room, ready for guests with disabilities',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Wheelchair Accessible', 'Grab Bars'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-205',
    number: '205',
    type: 'standard',
    status: 'occupied',
    floor: 2,
    capacity: 2,
    price: 130,
    lastCleaned: new Date('2025-08-14T11:00:00Z'),
    assignedHousekeeper: 'housekeeper-2',
    guestName: 'Jennifer Lee',
    checkInDate: new Date('2025-08-13T17:00:00Z'),
    checkOutDate: new Date('2025-08-16T12:00:00Z'),
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-301',
    number: '301',
    type: 'suite',
    status: 'occupied',
    floor: 3,
    capacity: 4,
    price: 300,
    lastCleaned: new Date('2025-08-14T08:00:00Z'),
    assignedHousekeeper: 'housekeeper-3',
    guestName: 'William Davis',
    checkInDate: new Date('2025-08-12T14:00:00Z'),
    checkOutDate: new Date('2025-08-20T11:00:00Z'),
    notes: 'VIP guest, premium service required',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Kitchen', 'Living Room', 'Balcony', 'Ocean View'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-302',
    number: '302',
    type: 'deluxe',
    status: 'vacant',
    floor: 3,
    capacity: 3,
    price: 200,
    lastCleaned: new Date('2025-08-15T13:00:00Z'),
    assignedHousekeeper: 'housekeeper-3',
    notes: 'Premium room available',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Mini Bar', 'Ocean View'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-303',
    number: '303',
    type: 'standard',
    status: 'occupied',
    floor: 3,
    capacity: 2,
    price: 140,
    lastCleaned: new Date('2025-08-14T10:00:00Z'),
    assignedHousekeeper: 'housekeeper-3',
    guestName: 'Patricia Garcia',
    checkInDate: new Date('2025-08-14T15:00:00Z'),
    checkOutDate: new Date('2025-08-17T10:00:00Z'),
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-304',
    number: '304',
    type: 'standard',
    status: 'cleaning',
    floor: 3,
    capacity: 2,
    price: 140,
    lastCleaned: new Date('2025-08-15T14:00:00Z'),
    assignedHousekeeper: 'housekeeper-3',
    notes: 'Turnover cleaning',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningStartTime: new Date('2025-08-16T07:30:00Z'),
    cleaningHistory: [
      {
        id: 'clean-304-1',
        roomId: 'room-304',
        housekeeperId: 'housekeeper-3',
        housekeeperName: 'Lisa Thompson',
        startTime: new Date('2025-08-15T14:00:00Z'),
        status: 'in_progress',
        notes: 'Turnover cleaning in progress',
        createdAt: new Date('2025-08-15T14:00:00Z'),
        updatedAt: new Date('2025-08-15T14:00:00Z')
      }
    ]
  },
  {
    id: 'room-305',
    number: '305',
    type: 'accessible',
    status: 'maintenance',
    floor: 3,
    capacity: 2,
    price: 150,
    lastCleaned: new Date('2025-08-10T09:00:00Z'),
    assignedHousekeeper: 'housekeeper-3',
    notes: 'Bathroom renovation in progress',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Wheelchair Accessible'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-106',
    number: '106',
    type: 'standard',
    status: 'vacant',
    floor: 1,
    capacity: 2,
    price: 120,
    lastCleaned: new Date('2025-08-15T15:00:00Z'),
    assignedHousekeeper: 'housekeeper-4',
    notes: 'Available for check-in',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-107',
    number: '107',
    type: 'deluxe',
    status: 'occupied',
    floor: 1,
    capacity: 3,
    price: 180,
    lastCleaned: new Date('2025-08-14T12:00:00Z'),
    assignedHousekeeper: 'housekeeper-4',
    guestName: 'Thomas Anderson',
    checkInDate: new Date('2025-08-13T16:00:00Z'),
    checkOutDate: new Date('2025-08-18T11:00:00Z'),
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Mini Bar', 'Garden View'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-108',
    number: '108',
    type: 'standard',
    status: 'cleaning',
    floor: 1,
    capacity: 2,
    price: 120,
    lastCleaned: new Date('2025-08-15T16:00:00Z'),
    assignedHousekeeper: 'housekeeper-4',
    notes: 'Deep cleaning in progress',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningStartTime: new Date('2025-08-15T16:00:00Z'),
    cleaningHistory: [
      {
        id: 'clean-108-1',
        roomId: 'room-108',
        housekeeperId: 'housekeeper-4',
        housekeeperName: 'David Brown',
        startTime: new Date('2025-08-15T16:00:00Z'),
        status: 'in_progress',
        notes: 'Deep cleaning in progress',
        createdAt: new Date('2025-08-15T16:00:00Z'),
        updatedAt: new Date('2025-08-15T16:00:00Z')
      }
    ]
  },
  {
    id: 'room-109',
    number: '109',
    type: 'suite',
    status: 'vacant',
    floor: 1,
    capacity: 4,
    price: 280,
    lastCleaned: new Date('2025-08-15T17:00:00Z'),
    assignedHousekeeper: 'housekeeper-4',
    notes: 'Premium suite available',
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom', 'Kitchen', 'Living Room', 'Balcony', 'Garden View'],
    isActive: true,
    cleaningHistory: []
  },
  {
    id: 'room-110',
    number: '110',
    type: 'standard',
    status: 'occupied',
    floor: 1,
    capacity: 2,
    price: 120,
    lastCleaned: new Date('2025-08-14T13:00:00Z'),
    assignedHousekeeper: 'housekeeper-4',
    guestName: 'Nancy Martinez',
    checkInDate: new Date('2025-08-14T14:00:00Z'),
    checkOutDate: new Date('2025-08-16T10:00:00Z'),
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    isActive: true,
    cleaningHistory: []
  }
]

// Mock chat messages
const mockMessages: Message[] = [
  {
    id: 'msg-1',
    roomId: 'room-general',
    senderId: 'admin-1',
    senderName: 'Sarah Johnson',
    senderRole: 'admin',
    content: 'Good morning team! How are we looking today?',
    timestamp: new Date('2025-01-26T08:00:00'),
    isRead: true
  },
  {
    id: 'msg-2',
    roomId: 'room-general',
    senderId: 'housekeeper-1',
    senderName: 'Maria Garcia',
    senderRole: 'housekeeper',
    content: 'Morning Sarah! I\'ve completed rooms 301-304. Room 305 has a guest request for extra blankets.',
    timestamp: new Date('2025-01-26T08:05:00'),
    isRead: true
  },
  {
    id: 'msg-3',
    roomId: 'room-general',
    senderId: 'admin-1',
    senderName: 'Sarah Johnson',
    senderRole: 'admin',
    content: 'Perfect! I\'ll handle the blanket request. Any issues with the cleaning?',
    timestamp: new Date('2025-01-26T08:07:00'),
    isRead: true
  },
  {
    id: 'msg-4',
    roomId: 'room-general',
    senderId: 'housekeeper-1',
    senderName: 'Maria Garcia',
    senderRole: 'housekeeper',
    content: 'All good! The new cleaning supplies are working great.',
    timestamp: new Date('2025-01-26T08:10:00'),
    isRead: false
  },
  {
    id: 'msg-5',
    roomId: 'room-general',
    senderId: 'housekeeper-2',
    senderName: 'Juan Rodriguez',
    senderRole: 'housekeeper',
    content: 'Hi team! I\'m starting on the 2nd floor. Room 208 has a maintenance issue.',
    timestamp: new Date('2025-01-26T08:15:00'),
    isRead: true
  },
  {
    id: 'msg-6',
    roomId: 'room-general',
    senderId: 'admin-1',
    senderName: 'Sarah Johnson',
    senderRole: 'admin',
    content: 'Thanks Juan! I\'ve already logged the maintenance request for room 208.',
    timestamp: new Date('2025-01-26T08:20:00'),
    isRead: false
  }
]

// Additional messages for other chat rooms
const maintenanceMessages: Message[] = [
  {
    id: 'msg-maint-1',
    roomId: 'room-maintenance',
    senderId: 'admin-1',
    senderName: 'Sarah Johnson',
    senderRole: 'admin',
    content: 'Maintenance team, please update on room 305 plumbing status.',
    timestamp: new Date('2025-01-26T09:00:00'),
    isRead: true
  },
  {
    id: 'msg-maint-2',
    roomId: 'room-maintenance',
    senderId: 'admin-2',
    senderName: 'Michael Chen',
    senderRole: 'admin',
    content: 'Parts ordered. Will complete when they arrive.',
    timestamp: new Date('2025-01-26T09:30:00'),
    isRead: false
  }
]

const housekeepingMessages: Message[] = [
  {
    id: 'msg-hk-1',
    roomId: 'room-housekeeping',
    senderId: 'housekeeper-1',
    senderName: 'Maria Rodriguez',
    senderRole: 'housekeeper',
    content: 'Team, I\'ve completed the deep cleaning checklist for floor 1.',
    timestamp: new Date('2025-01-26T10:00:00'),
    isRead: true
  },
  {
    id: 'msg-hk-2',
    roomId: 'room-housekeeping',
    senderId: 'housekeeper-2',
    senderName: 'James Wilson',
    senderRole: 'housekeeper',
    content: 'Floor 2 deep cleaning in progress. Will update when complete.',
    timestamp: new Date('2025-01-26T10:15:00'),
    isRead: false
  }
]

const emergencyMessages: Message[] = [
  {
    id: 'msg-emerg-1',
    roomId: 'room-emergency',
    senderId: 'admin-1',
    senderName: 'Sarah Johnson',
    senderRole: 'admin',
    content: 'Emergency protocol reminder: All staff please review evacuation procedures.',
    timestamp: new Date('2025-01-26T07:00:00'),
    isRead: true
  }
]

// Mock chat rooms
export const mockChatRooms: ChatRoom[] = [
  {
    id: 'room-general',
    name: 'General Staff',
    description: 'General announcements and updates for all staff',
    participants: ['admin-1', 'admin-2', 'housekeeper-1', 'housekeeper-2', 'housekeeper-3', 'housekeeper-4'],
    messages: mockMessages,
    lastMessage: mockMessages[mockMessages.length - 1],
    unreadCount: 2,
    isActive: true
  },
  {
    id: 'room-maintenance',
    name: 'Maintenance Updates',
    description: 'Maintenance team communications and updates',
    participants: ['admin-1', 'admin-2'],
    messages: maintenanceMessages,
    lastMessage: maintenanceMessages[maintenanceMessages.length - 1],
    unreadCount: 1,
    isActive: true
  },
  {
    id: 'room-emergency',
    name: 'Emergency Alerts',
    description: 'Emergency notifications and urgent communications',
    participants: ['admin-1', 'admin-2'],
    messages: emergencyMessages,
    lastMessage: emergencyMessages[emergencyMessages.length - 1],
    unreadCount: 0,
    isActive: true
  },
  {
    id: 'room-housekeeping',
    name: 'Housekeeping Team',
    description: 'Housekeeping team coordination and updates',
    participants: ['housekeeper-1', 'housekeeper-2', 'housekeeper-3', 'housekeeper-4'],
    messages: housekeepingMessages,
    lastMessage: housekeepingMessages[housekeepingMessages.length - 1],
    unreadCount: 3,
    isActive: true
  }
]

export const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: 'task-1',
    title: 'HVAC System Maintenance',
    description: 'Regular maintenance and cleaning of HVAC system in room 105',
    priority: 'medium',
    status: 'completed',
    category: 'hvac',
    assignedTo: 'admin-1',
    estimatedDuration: 4,
    actualDuration: 3.5,
    estimatedCost: 200,
    actualCost: 180,
    scheduledDate: new Date('2024-01-15T09:00:00Z'),
    completedDate: new Date('2024-01-15T12:30:00Z'),
    roomId: 'room-105',
    notes: 'System cleaned and filters replaced. Working efficiently now.',
    createdAt: new Date('2024-01-10T08:00:00Z'),
    updatedAt: new Date('2024-01-15T12:30:00Z')
  },
  {
    id: 'task-2',
    title: 'Plumbing Repair - Room 305',
    description: 'Fix leaking faucet and replace shower head in accessible room',
    priority: 'high',
    status: 'in_progress',
    category: 'plumbing',
    assignedTo: 'admin-2',
    estimatedDuration: 2,
    actualDuration: 1.5,
    estimatedCost: 150,
    actualCost: 120,
    scheduledDate: new Date('2024-01-16T10:00:00Z'),
    roomId: 'room-305',
    notes: 'Parts ordered. Will complete when parts arrive.',
    createdAt: new Date('2024-01-14T14:00:00Z'),
    updatedAt: new Date('2024-01-16T11:30:00Z')
  },
  {
    id: 'task-3',
    title: 'Electrical Inspection',
    description: 'Annual electrical safety inspection of all rooms',
    priority: 'medium',
    status: 'pending',
    category: 'electrical',
    estimatedDuration: 8,
    estimatedCost: 500,
    scheduledDate: new Date('2024-01-20T08:00:00Z'),
    notes: 'Scheduled for next week. Will need access to all rooms.',
    createdAt: new Date('2024-01-12T09:00:00Z'),
    updatedAt: new Date('2024-01-12T09:00:00Z')
  },
  {
    id: 'task-4',
    title: 'Structural Assessment',
    description: 'Inspect building structure and foundation for any issues',
    priority: 'low',
    status: 'pending',
    category: 'structural',
    estimatedDuration: 6,
    estimatedCost: 800,
    scheduledDate: new Date('2024-01-25T09:00:00Z'),
    notes: 'Routine inspection. No immediate concerns expected.',
    createdAt: new Date('2024-01-10T11:00:00Z'),
    updatedAt: new Date('2024-01-10T11:00:00Z')
  }
]

// Mock current user state
let currentUser: User | null = mockUsers[0] // Default to admin user

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