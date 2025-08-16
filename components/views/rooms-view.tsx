'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Grid3X3, 
  List, 
  Users, 
  UserPlus, 
  Building2, 
  Bed, 
  Calendar,
  MapPin,
  DollarSign,
  Star,
  Wrench,
  CheckCircle2,
  Clock,
  AlertCircle,
  Timer
} from 'lucide-react'
import { Room, User, CreateRoomData } from '@/lib/types'
import { mockRooms, mockUsers } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function RoomsView() {
  const { user } = useAuth()
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter
    const matchesType = typeFilter === 'all' || room.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Get housekeepers for assignment
  const housekeepers = mockUsers.filter(user => user.role === 'housekeeper')

  // Calculate occupancy rate
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length
  const occupancyRate = Math.round((occupiedRooms / rooms.length) * 100)

  // Calculate cleaning statistics
  const cleaningStats = {
    currentlyCleaning: rooms.filter(room => room.status === 'cleaning').length,
    averageCleaningTime: Math.round(
      rooms
        .filter(room => room.cleaningDuration)
        .reduce((sum, room) => sum + (room.cleaningDuration || 0), 0) / 
        Math.max(rooms.filter(room => room.cleaningDuration).length, 1)
    ),
    onTimeCleanings: rooms.filter(room => 
      room.cleaningDuration && room.cleaningDuration <= 90
    ).length,
    delayedCleanings: rooms.filter(room => 
      room.cleaningDuration && room.cleaningDuration > 90
    ).length
  }

  // Handle room creation
  const handleCreateRoom = (roomData: CreateRoomData) => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      ...roomData,
      status: 'vacant',
      lastCleaned: new Date(),
      isActive: true,
      amenities: roomData.amenities || [],
      cleaningHistory: []
    }
    
    setRooms(prev => [newRoom, ...prev])
    setShowCreateDialog(false)
  }

  // Handle staff assignment
  const handleAssignStaff = (roomId: string, housekeeperId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, assignedHousekeeper: housekeeperId }
        : room
    ))
    setShowAssignDialog(false)
    setSelectedRoom(null)
  }

  // Handle room status update
  const handleStatusUpdate = (roomId: string, newStatus: Room['status']) => {
    setRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room
      
      const updatedRoom = { ...room, status: newStatus }
      
      // Handle cleaning time tracking
      if (newStatus === 'cleaning' && room.status !== 'cleaning') {
        // Starting cleaning
        updatedRoom.cleaningStartTime = new Date()
        updatedRoom.cleaningEndTime = undefined
        updatedRoom.cleaningDuration = undefined
        
        // Add to cleaning history
        const newCleaningRecord = {
          id: `clean-${roomId}-${Date.now()}`,
          roomId: roomId,
          housekeeperId: room.assignedHousekeeper || '',
          housekeeperName: housekeepers.find(h => h.id === room.assignedHousekeeper)?.name || 'Unknown',
          startTime: new Date(),
          status: 'in_progress' as const,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        
        updatedRoom.cleaningHistory = [...(room.cleaningHistory || []), newCleaningRecord]
      } else if (room.status === 'cleaning' && newStatus !== 'cleaning') {
        // Finishing cleaning
        if (room.cleaningStartTime) {
          const endTime = new Date()
          const duration = Math.round((endTime.getTime() - room.cleaningStartTime.getTime()) / (1000 * 60))
          
          updatedRoom.cleaningEndTime = endTime
          updatedRoom.cleaningDuration = duration
          updatedRoom.lastCleaned = endTime
          
          // Update cleaning history
          if (updatedRoom.cleaningHistory && updatedRoom.cleaningHistory.length > 0) {
            const lastRecord = updatedRoom.cleaningHistory[updatedRoom.cleaningHistory.length - 1]
            if (lastRecord.status === 'in_progress') {
              lastRecord.endTime = endTime
              lastRecord.duration = duration
              lastRecord.status = 'completed'
              lastRecord.updatedAt = endTime
            }
          }
        }
      }
      
      return updatedRoom
    }))
  }

  // Get status configuration
  const getStatusConfig = (status: Room['status']) => {
    const configs = {
      occupied: { label: 'Occupied', color: 'bg-blue-100 text-blue-800', icon: Users },
      vacant: { label: 'Vacant', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
      cleaning: { label: 'Cleaning', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      maintenance: { label: 'Maintenance', color: 'bg-red-100 text-red-800', icon: Wrench },
      out_of_order: { label: 'Out of Order', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
    }
    return configs[status] || configs.vacant
  }

  // Get type configuration
  const getTypeConfig = (type: Room['type']) => {
    const configs = {
      standard: { label: 'Standard', color: 'bg-gray-100 text-gray-800' },
      deluxe: { label: 'Deluxe', color: 'bg-blue-100 text-blue-800' },
      suite: { label: 'Suite', color: 'bg-purple-100 text-purple-800' },
      accessible: { label: 'Accessible', color: 'bg-green-100 text-green-800' }
    }
    return configs[type] || configs.standard
  }

  // Get assigned housekeeper name
  const getAssignedHousekeeperName = (housekeeperId?: string) => {
    if (!housekeeperId) return 'Unassigned'
    const housekeeper = housekeepers.find(h => h.id === housekeeperId)
    return housekeeper?.name || 'Unknown'
  }

  // Get cleaning duration display
  const getCleaningDurationDisplay = (room: Room) => {
    if (room.status === 'cleaning' && room.cleaningStartTime) {
      const now = new Date()
      const duration = Math.round((now.getTime() - room.cleaningStartTime.getTime()) / (1000 * 60))
      return `${duration} min`
    } else if (room.cleaningDuration) {
      return `${room.cleaningDuration} min`
    }
    return null
  }

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">Only administrators can access room management.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Room Management</h1>
          <p className="text-gray-600 text-sm lg:text-base">Manage hotel rooms, assignments, and status</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="text-xs lg:text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Room
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Room</DialogTitle>
              </DialogHeader>
              <CreateRoomForm onSubmit={handleCreateRoom} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Rooms</p>
                <p className="text-xl font-bold">{rooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Occupied</p>
                <p className="text-xl font-bold">{occupiedRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Occupancy Rate</p>
                <p className="text-xl font-bold">{occupancyRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Avg. Cleaning</p>
                <p className="text-xl font-bold">{cleaningStats.averageCleaningTime} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cleaning Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Timer className="w-5 h-5" />
            <span>Cleaning Status Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{cleaningStats.currentlyCleaning}</div>
              <div className="text-sm text-gray-600">Currently Cleaning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{cleaningStats.onTimeCleanings}</div>
              <div className="text-sm text-gray-600">On Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{cleaningStats.delayedCleanings}</div>
              <div className="text-sm text-gray-600">Delayed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{cleaningStats.averageCleaningTime}</div>
              <div className="text-sm text-gray-600">Avg. Time (min)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and View Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Input
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="vacant">Vacant</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="out_of_order">Out of Order</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="accessible">Accessible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Rooms Display */}
      <Tabs value={viewMode} className="w-full">
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onStatusUpdate={handleStatusUpdate}
                onAssignStaff={(room) => {
                  setSelectedRoom(room)
                  setShowAssignDialog(true)
                }}
                getStatusConfig={getStatusConfig}
                getTypeConfig={getTypeConfig}
                getAssignedHousekeeperName={getAssignedHousekeeperName}
                getCleaningDurationDisplay={getCleaningDurationDisplay}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <div className="space-y-2">
            {filteredRooms.map((room) => (
              <RoomListItem
                key={room.id}
                room={room}
                onStatusUpdate={handleStatusUpdate}
                onAssignStaff={(room) => {
                  setSelectedRoom(room)
                  setShowAssignDialog(true)
                }}
                getStatusConfig={getStatusConfig}
                getTypeConfig={getTypeConfig}
                getAssignedHousekeeperName={getAssignedHousekeeperName}
                getCleaningDurationDisplay={getCleaningDurationDisplay}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Staff Assignment Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Staff to Room {selectedRoom?.number}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Current Assignment</label>
              <p className="text-sm text-gray-600">
                {selectedRoom ? getAssignedHousekeeperName(selectedRoom.assignedHousekeeper) : ''}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Assign to</label>
              <Select onValueChange={(value) => handleAssignStaff(selectedRoom!.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select housekeeper" />
                </SelectTrigger>
                <SelectContent>
                  {housekeepers.map((housekeeper) => (
                    <SelectItem key={housekeeper.id} value={housekeeper.id}>
                      {housekeeper.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Room Card Component
function RoomCard({ 
  room, 
  onStatusUpdate, 
  onAssignStaff, 
  getStatusConfig, 
  getTypeConfig, 
  getAssignedHousekeeperName,
  getCleaningDurationDisplay
}: {
  room: Room
  onStatusUpdate: (roomId: string, status: Room['status']) => void
  onAssignStaff: (room: Room) => void
  getStatusConfig: (status: Room['status']) => any
  getTypeConfig: (type: Room['type']) => any
  getAssignedHousekeeperName: (housekeeperId?: string) => string
  getCleaningDurationDisplay: (room: Room) => string | null
}) {
  const statusConfig = getStatusConfig(room.status)
  const typeConfig = getTypeConfig(room.type)
  const StatusIcon = statusConfig.icon
  const cleaningDuration = getCleaningDurationDisplay(room)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Room {room.number}</CardTitle>
          <Badge className={cn('text-xs', statusConfig.color)}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusConfig.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn('text-xs', typeConfig.color)}>
            {typeConfig.label}
          </Badge>
          <span className="text-xs text-gray-500">Floor {room.floor}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {room.guestName && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{room.guestName}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <Bed className="w-4 h-4 text-gray-500" />
            <span>Capacity: {room.capacity}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span>${room.price}/night</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <UserPlus className="w-4 h-4 text-gray-500" />
            <span className="truncate">{getAssignedHousekeeperName(room.assignedHousekeeper)}</span>
          </div>
          {cleaningDuration && (
            <div className="flex items-center gap-2 text-sm">
              <Timer className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-purple-600">{cleaningDuration}</span>
            </div>
          )}
          {room.checkInDate && room.checkOutDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-xs">
                {new Date(room.checkInDate).toLocaleDateString()} - {new Date(room.checkOutDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAssignStaff(room)}
            className="flex-1 text-xs"
          >
            <UserPlus className="w-3 h-3 mr-1" />
            Assign
          </Button>
          <Select value={room.status} onValueChange={(value: Room['status']) => onStatusUpdate(room.id, value)}>
            <SelectTrigger className="flex-1 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vacant">Vacant</SelectItem>
              <SelectItem value="cleaning">Cleaning</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="out_of_order">Out of Order</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

// Room List Item Component
function RoomListItem({ 
  room, 
  onStatusUpdate, 
  onAssignStaff, 
  getStatusConfig, 
  getTypeConfig, 
  getAssignedHousekeeperName,
  getCleaningDurationDisplay
}: {
  room: Room
  onStatusUpdate: (roomId: string, status: Room['status']) => void
  onAssignStaff: (room: Room) => void
  getStatusConfig: (status: Room['status']) => any
  getTypeConfig: (type: Room['type']) => any
  getAssignedHousekeeperName: (housekeeperId?: string) => string
  getCleaningDurationDisplay: (room: Room) => string | null
}) {
  const statusConfig = getStatusConfig(room.status)
  const typeConfig = getTypeConfig(room.type)
  const StatusIcon = statusConfig.icon
  const cleaningDuration = getCleaningDurationDisplay(room)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-lg font-bold">Room {room.number}</div>
              <div className="text-xs text-gray-500">Floor {room.floor}</div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className={cn('text-xs', statusConfig.color)}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig.label}
                </Badge>
                <Badge variant="outline" className={cn('text-xs', typeConfig.color)}>
                  {typeConfig.label}
                </Badge>
              </div>
              {room.guestName && (
                <div className="text-sm font-medium">{room.guestName}</div>
              )}
              <div className="text-xs text-gray-500">
                Capacity: {room.capacity} • ${room.price}/night
              </div>
              {cleaningDuration && (
                <div className="text-xs text-gray-500">
                  Cleaning: <span className="font-medium text-purple-600">{cleaningDuration}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right text-sm">
              <div className="font-medium">{getAssignedHousekeeperName(room.assignedHousekeeper)}</div>
              <div className="text-gray-500">Assigned</div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAssignStaff(room)}
              >
                <UserPlus className="w-3 h-3 mr-1" />
                Assign
              </Button>
              <Select value={room.status} onValueChange={(value: Room['status']) => onStatusUpdate(room.id, value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="out_of_order">Out of Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Create Room Form Component
function CreateRoomForm({ onSubmit }: { onSubmit: (data: CreateRoomData) => void }) {
  const [formData, setFormData] = useState<CreateRoomData>({
    number: '',
    type: 'standard',
    floor: 1,
    capacity: 2,
    price: 120,
    amenities: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }))
    } else {
      setFormData(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Room Number</label>
          <Input
            value={formData.number}
            onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
            placeholder="101"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Floor</label>
          <Input
            type="number"
            value={formData.floor}
            onChange={(e) => setFormData(prev => ({ ...prev, floor: parseInt(e.target.value) }))}
            min="1"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Type</label>
          <Select value={formData.type} onValueChange={(value: Room['type']) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="accessible">Accessible</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Capacity</label>
          <Input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
            min="1"
            max="6"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Price per Night</label>
        <Input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) }))}
          min="50"
          step="10"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Amenities</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['WiFi', 'TV', 'AC', 'Private Bathroom', 'Mini Bar', 'Kitchen', 'Balcony', 'Ocean View'].map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">Create Room</Button>
      </div>
    </form>
  )
} 