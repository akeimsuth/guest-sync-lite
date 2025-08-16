'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  Clock, 
  Wrench, 
  Building2, 
  Timer,
  Users
} from 'lucide-react'
import { mockRequests, mockRooms, mockUsers, mockMaintenanceTasks } from '@/lib/mock-data'
import { ServiceRequest, Room, MaintenanceTask } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/auth-provider'
import { Button } from '../ui/button'

export function AdminDashboard() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests)
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(mockMaintenanceTasks)

  // Calculate statistics
  const stats = {
    newRequests: requests.filter(r => r.status === 'new').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    openPMs: maintenanceTasks.filter(t => t.status === 'pending').length,
    occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
    totalRooms: rooms.length,
    unassignedRooms: rooms.filter(r => !r.assignedHousekeeper).length,
    housekeepers: mockUsers.filter(u => u.role === 'housekeeper').length
  }

  // Calculate cleaning statistics
  const cleaningStats = {
    currentlyCleaning: rooms.filter(r => r.status === 'cleaning').length,
    averageCleaningTime: Math.round(
      rooms
        .filter(r => r.cleaningDuration)
        .reduce((sum, r) => sum + (r.cleaningDuration || 0), 0) / 
        Math.max(rooms.filter(r => r.cleaningDuration).length, 1)
    ),
    onTimeCleanings: rooms.filter(r => 
      r.cleaningDuration && r.cleaningDuration <= 90
    ).length,
    delayedCleanings: rooms.filter(r => 
      r.cleaningDuration && r.cleaningDuration > 90
    ).length
  }

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">Only administrators can access this dashboard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Hotel operations overview</p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.newRequests}</div>
            <div className="text-sm text-gray-600">New Requests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.openPMs}</div>
            <div className="text-sm text-gray-600">Open PMs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.occupiedRooms}/{stats.totalRooms}</div>
            <div className="text-sm text-gray-600">Rooms Occupied</div>
          </CardContent>
        </Card>
      </div>

      {/* Room Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Room Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalRooms}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalRooms - stats.occupiedRooms}</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{cleaningStats.currentlyCleaning}</div>
              <div className="text-sm text-gray-600">Cleaning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.unassignedRooms}</div>
              <div className="text-sm text-gray-600">Unassigned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Currently Cleaning */}
      {cleaningStats.currentlyCleaning > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-blue-600" />
              Currently Cleaning ({cleaningStats.currentlyCleaning})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms
                .filter(room => room.status === 'cleaning')
                .map(room => {
                  const housekeeper = mockUsers.find(h => h.id === room.assignedHousekeeper)
                  const startTime = room.cleaningStartTime
                  const duration = startTime ? Math.round((Date.now() - startTime.getTime()) / (1000 * 60)) : 0
                  const isOnTime = duration <= 90

                  return (
                    <div key={room.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Room {room.number}</h3>
                        <Badge className={cn(
                          'text-xs',
                          isOnTime ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        )}>
                          {isOnTime ? 'On Time' : 'Delayed'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{housekeeper?.name}</p>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{duration} minutes</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Started: {startTime?.toLocaleTimeString()}
                      </p>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Recent Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{request.guestName} - Room {request.roomNumber}</p>
                  <p className="text-sm text-gray-600">{request.message}</p>
                </div>
                <Badge className={cn(
                  'text-xs',
                  request.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  request.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                )}>
                  {request.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <a href="/rooms" className="block">
              <Button variant="outline" className="w-full h-16 flex-col">
                <Building2 className="w-5 h-5 mb-1" />
                <span className="text-xs">Manage Rooms</span>
              </Button>
            </a>
            <a href="/requests" className="block">
              <Button variant="outline" className="w-full h-16 flex-col">
                <MessageCircle className="w-5 h-5 mb-1" />
                <span className="text-xs">View Requests</span>
              </Button>
            </a>
            <a href="/maintenance" className="block">
              <Button variant="outline" className="w-full h-16 flex-col">
                <Wrench className="w-5 h-5 mb-1" />
                <span className="text-xs">Maintenance</span>
              </Button>
            </a>
            <a href="/chat" className="block">
              <Button variant="outline" className="w-full h-16 flex-col">
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs">Staff Chat</span>
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}