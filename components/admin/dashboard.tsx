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
    <div className="space-y-3 lg:space-y-6" data-macaly="admin-dashboard">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800" data-macaly="dashboard-title">Dashboard</h1>
        <Button variant="outline" size="sm" className="text-xs lg:text-sm w-fit">
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <MessageCircle className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">New Requests</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800" data-macaly="new-requests-count">{stats.newRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-yellow-100 rounded-lg flex-shrink-0">
                <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">In Progress</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-purple-100 rounded-lg flex-shrink-0">
                <Wrench className="w-4 h-4 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Open PMs</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.openPMs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-green-100 rounded-lg flex-shrink-0">
                <Bed className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Occupied</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.occupiedRooms}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests and Room Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base lg:text-xl">Recent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 lg:space-y-3">
              {recentRequests.map((request) => (
                <div key={request.id} className="p-2 lg:p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-xs lg:text-sm truncate">{request.guestName}</span>
                      <Badge className={cn('text-xs px-1.5 py-0.5', statusConfig[request.status].color)}>
                        {statusConfig[request.status].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 break-words">{request.message}</p>
                    <p className="text-xs text-gray-500">Room {request.roomNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base lg:text-xl">Room Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 lg:space-y-3">
              {roomStatusList.map((room) => (
                <div key={room.id} className="p-2 lg:p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs lg:text-sm font-medium">{room.number}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs lg:text-sm font-medium truncate">Room {room.number}</p>
                        {room.guestName && (
                          <p className="text-gray-600 text-xs truncate">- {room.guestName}</p>
                        )}
                      </div>
                    </div>
                    <Badge className={cn('text-xs px-1.5 py-0.5 flex-shrink-0', roomStatusConfig[room.status].color)}>
                      {roomStatusConfig[room.status].label}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preventive Maintenance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base lg:text-xl">Preventive Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
            {openPMs.map((pm, index) => (
              <div key={index} className="p-3 lg:p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-600 flex-shrink-0" />
                  <span className="text-xs lg:text-sm font-medium truncate">{pm.room}</span>
                </div>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  Scheduled
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}