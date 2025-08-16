'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle,
  Timer,
  Building2,
  Users2
} from 'lucide-react'
import { Room, CleaningRecord, CleaningStats, User } from '@/lib/types'
import { mockRooms, mockUsers } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface CleaningTrackingProps {
  rooms: Room[]
  housekeepers: User[]
}

export function CleaningTracking({ rooms, housekeepers }: CleaningTrackingProps) {
  const [selectedHousekeeper, setSelectedHousekeeper] = useState<string>('all')
  const [timeRange, setTimeRange] = useState<string>('7d')
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview')

  // Get all cleaning records from rooms
  const allCleaningRecords = rooms.flatMap(room => room.cleaningHistory || [])
  
  // Filter records based on selection
  const filteredRecords = allCleaningRecords.filter(record => {
    if (selectedHousekeeper !== 'all' && record.housekeeperId !== selectedHousekeeper) {
      return false
    }
    
    const recordDate = new Date(record.startTime)
    const now = new Date()
    const daysDiff = (now.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24)
    
    switch (timeRange) {
      case '1d': return daysDiff <= 1
      case '7d': return daysDiff <= 7
      case '30d': return daysDiff <= 30
      case '90d': return daysDiff <= 90
      default: return true
    }
  })

  // Calculate cleaning statistics
  const calculateStats = (): CleaningStats => {
    const completedCleanings = filteredRecords.filter(r => r.status === 'completed' && r.duration)
    const totalCleanings = completedCleanings.length
    
    if (totalCleanings === 0) {
      return {
        averageTime: 0,
        totalCleanings: 0,
        onTimeCleanings: 0,
        delayedCleanings: 0,
        qualityScore: 0
      }
    }

    const totalTime = completedCleanings.reduce((sum, r) => sum + (r.duration || 0), 0)
    const averageTime = Math.round(totalTime / totalCleanings)
    
    // Consider cleaning "on time" if it's within 20% of expected time
    const expectedTime = 90 // 90 minutes is standard
    const onTimeCleanings = completedCleanings.filter(r => 
      (r.duration || 0) <= expectedTime * 1.2
    ).length
    
    const delayedCleanings = totalCleanings - onTimeCleanings
    
    const qualityScore = completedCleanings.reduce((sum, r) => 
      sum + (r.qualityRating || 0), 0
    ) / totalCleanings

    return {
      averageTime,
      totalCleanings,
      onTimeCleanings,
      delayedCleanings,
      qualityScore: Math.round(qualityScore * 10) / 10
    }
  }

  const stats = calculateStats()

  // Get housekeeper performance
  const getHousekeeperPerformance = () => {
    const performance = housekeepers
      .filter(h => h.role === 'housekeeper')
      .map(housekeeper => {
        const housekeeperRecords = filteredRecords.filter(r => r.housekeeperId === housekeeper.id)
        const completedRecords = housekeeperRecords.filter(r => r.status === 'completed' && r.duration)
        
        if (completedRecords.length === 0) {
          return {
            ...housekeeper,
            averageTime: 0,
            totalCleanings: 0,
            qualityScore: 0
          }
        }

        const totalTime = completedRecords.reduce((sum, r) => sum + (r.duration || 0), 0)
        const averageTime = Math.round(totalTime / completedRecords.length)
        const qualityScore = completedRecords.reduce((sum, r) => 
          sum + (r.qualityRating || 0), 0
        ) / completedRecords.length

        return {
          ...housekeeper,
          averageTime,
          totalCleanings: completedRecords.length,
          qualityScore: Math.round(qualityScore * 10) / 10
        }
      })
      .sort((a, b) => b.totalCleanings - a.totalCleanings)

    return performance
  }

  const housekeeperPerformance = getHousekeeperPerformance()

  // Get recent cleaning activities
  const getRecentCleanings = () => {
    return filteredRecords
      .filter(r => r.status === 'completed')
      .sort((a, b) => new Date(b.endTime!).getTime() - new Date(a.endTime!).getTime())
      .slice(0, 5)
  }

  const recentCleanings = getRecentCleanings()

  // Get currently cleaning rooms
  const getCurrentlyCleaning = () => {
    return rooms.filter(room => room.status === 'cleaning')
  }

  const currentlyCleaning = getCurrentlyCleaning()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Cleaning Time Tracking</h2>
          <p className="text-gray-600 text-sm lg:text-base">Monitor housekeeping efficiency and performance</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedHousekeeper} onValueChange={setSelectedHousekeeper}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              {housekeepers
                .filter(h => h.role === 'housekeeper')
                .map(housekeeper => (
                  <SelectItem key={housekeeper.id} value={housekeeper.id}>
                    {housekeeper.name}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Time</p>
                <p className="text-xl font-bold">{stats.averageTime} min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cleanings</p>
                <p className="text-xl font-bold">{stats.totalCleanings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">On Time</p>
                <p className="text-xl font-bold">{stats.onTimeCleanings}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Delayed</p>
                <p className="text-xl font-bold">{stats.delayedCleanings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users2 className="w-5 h-5" />
              <span>Staff Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {housekeeperPerformance.map((housekeeper) => (
                <div key={housekeeper.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {housekeeper.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{housekeeper.name}</p>
                      <p className="text-xs text-gray-500">{housekeeper.totalCleanings} cleanings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{housekeeper.averageTime} min avg</p>
                    <p className="text-xs text-gray-500">Rating: {housekeeper.qualityScore}/5</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Currently Cleaning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="w-5 h-5" />
              <span>Currently Cleaning</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentlyCleaning.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No rooms currently being cleaned</p>
              ) : (
                currentlyCleaning.map((room) => {
                  const cleaningRecord = room.cleaningHistory?.find(r => r.status === 'in_progress')
                  const housekeeper = housekeepers.find(h => h.id === room.assignedHousekeeper)
                  const startTime = room.cleaningStartTime
                  const duration = startTime ? Math.round((Date.now() - startTime.getTime()) / (1000 * 60)) : 0

                  return (
                    <div key={room.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Room {room.number}</p>
                        <p className="text-xs text-gray-500">{housekeeper?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{duration} min</p>
                        <p className="text-xs text-gray-500">Started {startTime?.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cleanings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Recent Cleanings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCleanings.map((cleaning) => {
              const room = rooms.find(r => r.id === cleaning.roomId)
              const housekeeper = housekeepers.find(h => h.id === cleaning.housekeeperId)
              
              return (
                <div key={cleaning.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">R{room?.number}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Room {room?.number}</p>
                      <p className="text-xs text-gray-500">{housekeeper?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{cleaning.duration} min</p>
                    <p className="text-xs text-gray-500">
                      {cleaning.endTime?.toLocaleDateString()} at {cleaning.endTime?.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={cn(
                      'text-xs',
                      cleaning.qualityRating === 5 ? 'bg-green-100 text-green-800' :
                      cleaning.qualityRating === 4 ? 'bg-blue-100 text-blue-800' :
                      cleaning.qualityRating === 3 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    )}>
                      {cleaning.qualityRating}/5
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 