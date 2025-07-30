'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Bed, 
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Calendar,
  Phone
} from 'lucide-react'
import { mockRooms } from '@/lib/mock-data'
import { Room, RoomStatus } from '@/lib/types'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const roomStatusConfig = {
  occupied: { color: 'bg-green-500 text-white', label: 'Occupied', icon: Users },
  vacant: { color: 'bg-gray-500 text-white', label: 'Vacant', icon: Bed },
  maintenance: { color: 'bg-red-500 text-white', label: 'Maintenance', icon: AlertCircle },
  cleaning: { color: 'bg-blue-500 text-white', label: 'Cleaning', icon: Clock }
}

export function RoomsView() {
  const { user } = useAuth()
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    let filtered = rooms

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.number.includes(searchTerm) ||
        (room.guestName && room.guestName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(room => room.status === statusFilter)
    }

    setFilteredRooms(filtered)
  }, [rooms, searchTerm, statusFilter])

  const handleStatusChange = (roomId: string, newStatus: RoomStatus) => {
    setRooms(prev => 
      prev.map(room => 
        room.id === roomId 
          ? { ...room, status: newStatus }
          : room
      )
    )
    toast.success(`Room ${rooms.find(r => r.id === roomId)?.number} status updated`)
  }

  const stats = {
    total: rooms.length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    vacant: rooms.filter(r => r.status === 'vacant').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length
  }

  const occupancyRate = Math.round((stats.occupied / stats.total) * 100)

  return (
    <div className="space-y-3 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800">Room Management</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button size="sm" className="text-xs lg:text-sm w-fit">
            <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            Add Room
          </Button>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              onClick={() => setViewMode('grid')}
              className="text-xs lg:text-sm"
            >
              Grid
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'outline'}
              onClick={() => setViewMode('list')}
              className="text-xs lg:text-sm"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <Bed className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Total</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-green-100 rounded-lg flex-shrink-0">
                <Users className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Occupied</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.occupied}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-gray-100 rounded-lg flex-shrink-0">
                <Bed className="w-4 h-4 lg:w-6 lg:h-6 text-gray-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Vacant</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.vacant}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Cleaning</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.cleaning}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-red-100 rounded-lg flex-shrink-0">
                <AlertCircle className="w-4 h-4 lg:w-6 lg:h-6 text-red-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Maintenance</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.maintenance}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Occupancy Rate */}
      <Card>
        <CardContent className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Occupancy Rate</h3>
              <p className="text-sm text-gray-600">{stats.occupied} of {stats.total} rooms occupied</p>
            </div>
            <div className="text-right">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600">{occupancyRate}%</div>
              <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base lg:text-xl">
            <Filter className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Display */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base lg:text-xl">
            Rooms ({filteredRooms.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRooms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bed className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No rooms found matching your filters.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
              {filteredRooms.map((room) => {
                const StatusIcon = roomStatusConfig[room.status].icon
                
                return (
                  <div key={room.id} className="p-3 lg:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="space-y-3">
                      {/* Room Header */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-sm font-medium">{room.number}</span>
                        </div>
                        <Badge className={cn('text-xs px-1.5 py-0.5', roomStatusConfig[room.status].color)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {roomStatusConfig[room.status].label}
                        </Badge>
                      </div>

                      {/* Room Details */}
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">Room {room.number}</h3>
                        {room.guestName && (
                          <p className="text-xs text-gray-600 truncate">Guest: {room.guestName}</p>
                        )}
                        {room.checkIn && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            Check-in: {new Date(room.checkIn).toLocaleDateString()}
                          </div>
                        )}
                        {room.checkOut && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            Check-out: {new Date(room.checkOut).toLocaleDateString()}
                          </div>
                        )}
                        {room.assignedHousekeeper && (
                          <p className="text-xs text-gray-500">HK: {room.assignedHousekeeper}</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap">
                        {room.status === 'occupied' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(room.id, 'cleaning')}
                            className="text-xs px-2 py-1 h-8"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            Clean
                          </Button>
                        )}
                        {room.status === 'cleaning' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(room.id, 'vacant')}
                            className="text-xs px-2 py-1 h-8 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Ready
                          </Button>
                        )}
                        {room.status === 'vacant' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(room.id, 'maintenance')}
                            className="text-xs px-2 py-1 h-8"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Maintenance
                          </Button>
                        )}
                        {room.status === 'maintenance' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(room.id, 'vacant')}
                            className="text-xs px-2 py-1 h-8 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Fixed
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRooms.map((room) => {
                const StatusIcon = roomStatusConfig[room.status].icon
                
                return (
                  <div key={room.id} className="p-3 lg:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium">{room.number}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-sm">Room {room.number}</h3>
                          {room.guestName && (
                            <p className="text-xs text-gray-600 truncate">Guest: {room.guestName}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={cn('text-xs px-1.5 py-0.5', roomStatusConfig[room.status].color)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {roomStatusConfig[room.status].label}
                        </Badge>
                        <div className="flex gap-2">
                          {room.status === 'occupied' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(room.id, 'cleaning')}
                              className="text-xs px-2 py-1 h-8"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              Clean
                            </Button>
                          )}
                          {room.status === 'cleaning' && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(room.id, 'vacant')}
                              className="text-xs px-2 py-1 h-8 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Ready
                            </Button>
                          )}
                          {room.status === 'vacant' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(room.id, 'maintenance')}
                              className="text-xs px-2 py-1 h-8"
                            >
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Maintenance
                            </Button>
                          )}
                          {room.status === 'maintenance' && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(room.id, 'vacant')}
                              className="text-xs px-2 py-1 h-8 bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Fixed
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 