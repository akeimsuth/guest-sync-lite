'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MessageCircle, 
  Clock, 
  Wrench, 
  Users,
  CheckCircle2,
  AlertCircle,
  Bed
} from 'lucide-react'
import { mockRequests, mockRooms } from '@/lib/mock-data'
import { ServiceRequest, Room } from '@/lib/types'
import { cn } from '@/lib/utils'

const statusConfig = {
  new: { color: 'bg-blue-500 text-white', label: 'New' },
  in_progress: { color: 'bg-yellow-500 text-white', label: 'In Progress' },
  completed: { color: 'bg-green-500 text-white', label: 'Completed' }
}

const roomStatusConfig = {
  occupied: { color: 'bg-green-500 text-white', label: 'Occupied' },
  vacant: { color: 'bg-gray-500 text-white', label: 'Vacant' },
  maintenance: { color: 'bg-red-500 text-white', label: 'Maintenance' },
  cleaning: { color: 'bg-blue-500 text-white', label: 'Cleaning' }
}

export function AdminDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests)
  const [rooms, setRooms] = useState<Room[]>(mockRooms)

  useEffect(() => {
    console.log('Admin dashboard loaded with', requests.length, 'requests and', rooms.length, 'rooms')
  }, [])

  const stats = {
    newRequests: requests.filter(r => r.status === 'new').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    openPMs: 2, // Mock preventive maintenance
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length
  }

  const recentRequests = requests.slice(0, 5)
  const roomStatusList = rooms.slice(0, 4)
  const openPMs = [
    { room: 'HVAC Inspection', status: 'occupied' },
    { room: 'Room 503', status: 'vacant' },
    { room: 'Room 104', status: 'occupied' },
    { room: 'Room 105', status: 'vacant' }
  ]

  return (
    <div className="space-y-6" data-macaly="admin-dashboard">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800" data-macaly="dashboard-title">Dashboard</h1>
        <Button variant="outline" className="text-sm">
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New Requests</p>
                <p className="text-2xl font-bold text-gray-800" data-macaly="new-requests-count">{stats.newRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-800">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Wrench className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Open PMs</p>
                <p className="text-2xl font-bold text-gray-800">{stats.openPMs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Occupied Rooms</p>
                <p className="text-2xl font-bold text-gray-800">{stats.occupiedRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Recent Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Room {request.roomNumber}</span>
                      <span className="text-gray-600">{request.message}</span>
                    </div>
                  </div>
                  <Badge className={cn('text-xs', statusConfig[request.status].color)}>
                    {statusConfig[request.status].label}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bed className="w-5 h-5" />
              <span>Room Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomStatusList.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Room {room.number}</span>
                    {room.guestName && (
                      <span className="text-gray-600 ml-2">- {room.guestName}</span>
                    )}
                  </div>
                  <Badge className={cn('text-xs', roomStatusConfig[room.status].color)}>
                    {roomStatusConfig[room.status].label}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Open PMs Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wrench className="w-5 h-5" />
            <span>Open PMs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {openPMs.map((pm, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{pm.room}</span>
                <Badge className={cn('text-xs', roomStatusConfig[pm.status as keyof typeof roomStatusConfig].color)}>
                  {roomStatusConfig[pm.status as keyof typeof roomStatusConfig].label}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}