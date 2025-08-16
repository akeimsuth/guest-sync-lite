'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Timer, 
  Building2, 
  Play, 
  CheckCircle,
  Clock
} from 'lucide-react'
import { ServiceRequest, Room } from '@/lib/types'
import { mockRequests, mockRooms, mockUsers } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function HousekeeperDashboard() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests)
  const [rooms, setRooms] = useState<Room[]>(mockRooms)

  // Get assigned rooms for current housekeeper
  const assignedRooms = rooms.filter(room => room.assignedHousekeeper === user?.id)
  
  // Get rooms currently being cleaned by this housekeeper
  const currentlyCleaning = assignedRooms.filter(room => room.status === 'cleaning')
  
  // Get rooms that need cleaning (vacant but assigned to this housekeeper)
  const roomsNeedingCleaning = assignedRooms.filter(room => room.status === 'vacant')

  // Handle cleaning timer controls
  const handleStartCleaning = (roomId: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room
      
      const updatedRoom = { ...room, status: 'cleaning' }
      
      // Start cleaning timer
      updatedRoom.cleaningStartTime = new Date()
      updatedRoom.cleaningEndTime = undefined
      updatedRoom.cleaningDuration = undefined
      
      // Add to cleaning history
      const newCleaningRecord = {
        id: `clean-${roomId}-${Date.now()}`,
        roomId: roomId,
        housekeeperId: user?.id || '',
        housekeeperName: user?.name || 'Unknown',
        startTime: new Date(),
        status: 'in_progress' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      updatedRoom.cleaningHistory = [...(room.cleaningHistory || []), newCleaningRecord]
      
      return updatedRoom
    }))
  }

  const handleFinishCleaning = (roomId: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room
      
      const updatedRoom = { ...room, status: 'vacant' }
      
      // Stop cleaning timer and calculate duration
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
      
      return updatedRoom
    }))
  }

  // Get cleaning duration display
  const getCleaningDuration = (room: Room) => {
    if (room.status === 'cleaning' && room.cleaningStartTime) {
      const now = new Date()
      const duration = Math.round((now.getTime() - room.cleaningStartTime.getTime()) / (1000 * 60))
      return duration
    }
    return null
  }

  if (user?.role !== 'housekeeper') {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600">Only housekeepers can access this dashboard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Staff Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{assignedRooms.length}</div>
            <div className="text-sm text-gray-600">Assigned Rooms</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{currentlyCleaning.length}</div>
            <div className="text-sm text-gray-600">Currently Cleaning</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{roomsNeedingCleaning.length}</div>
            <div className="text-sm text-gray-600">Ready to Clean</div>
          </CardContent>
        </Card>
      </div>

      {/* Currently Cleaning */}
      {currentlyCleaning.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-blue-600" />
              Currently Cleaning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentlyCleaning.map((room) => {
                const duration = getCleaningDuration(room)
                
                return (
                  <div key={room.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <h3 className="font-medium">Room {room.number}</h3>
                      <p className="text-sm text-gray-600">Floor {room.floor} • {room.type}</p>
                      {duration && (
                        <div className="flex items-center gap-1 text-blue-600 mt-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{duration} minutes</span>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleFinishCleaning(room.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Finish
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rooms Ready to Clean */}
      {roomsNeedingCleaning.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-green-600" />
              Ready to Clean
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roomsNeedingCleaning.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Room {room.number}</h3>
                    <p className="text-sm text-gray-600">Floor {room.floor} • {room.type}</p>
                    {room.lastCleaned && (
                      <p className="text-xs text-gray-500 mt-1">
                        Last cleaned: {new Date(room.lastCleaned).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => handleStartCleaning(room.id)}
                    variant="outline"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Cleaning History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Recent Cleaning History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignedRooms
              .filter(room => room.cleaningDuration && room.status === 'vacant')
              .slice(0, 5)
              .map((room) => (
                <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Room {room.number}</h3>
                    <p className="text-sm text-gray-600">
                      Completed in {room.cleaningDuration} minutes
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {room.cleaningEndTime?.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {room.cleaningEndTime?.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            {assignedRooms.filter(room => room.cleaningDuration && room.status === 'vacant').length === 0 && (
              <p className="text-center text-gray-500 py-4">No cleaning history yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}