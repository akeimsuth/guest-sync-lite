'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  MessageCircle, 
  Clock, 
  Star,
  CheckCircle2,
  AlertCircle,
  Timer
} from 'lucide-react'
import { mockRequests } from '@/lib/mock-data'
import { ServiceRequest, HousekeeperStats } from '@/lib/types'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const statusConfig = {
  new: { color: 'bg-blue-500 text-white', label: 'New' },
  in_progress: { color: 'bg-yellow-500 text-white', label: 'In Progress' },
  completed: { color: 'bg-green-500 text-white', label: 'Completed' }
}

export function HousekeeperDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>(
    mockRequests.filter(r => r.category === 'Housekeeping' || r.roomNumber === '305')
  )

  const [stats] = useState<HousekeeperStats>({
    todayRequests: 6,
    avgResponseTime: 8.2,
    avgRating: 4.8,
    completedToday: 4
  })

  useEffect(() => {
    console.log('Housekeeper dashboard loaded with', requests.length, 'assigned requests')
  }, [])

  const handleMarkComplete = (requestId: string) => {
    console.log('Marking request as complete:', requestId)
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'completed' as const, completedAt: new Date() }
          : req
      )
    )
    toast.success('Request marked as complete!')
  }

  const handleMarkInProgress = (requestId: string) => {
    console.log('Marking request as in progress:', requestId)
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'in_progress' as const, assignedTo: 'housekeeper-1' }
          : req
      )
    )
    toast.success('Request marked as in progress!')
  }

  const pendingRequests = requests.filter(r => r.status !== 'completed')

  return (
    <div className="space-y-3 lg:space-y-6" data-macaly="housekeeper-dashboard">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800">Staff Portal</h1>
        <Badge variant="outline" className="text-xs lg:text-sm w-fit">
          Housekeeper View
        </Badge>
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
                <p className="text-xs text-gray-600 truncate">Today</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.todayRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-green-100 rounded-lg flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Completed</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.completedToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-yellow-100 rounded-lg flex-shrink-0">
                <Timer className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Avg Time</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.avgResponseTime}m</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-purple-100 rounded-lg flex-shrink-0">
                <Star className="w-4 h-4 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Rating</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.avgRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base lg:text-xl">
            <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Pending Requests</span>
            {pendingRequests.length > 0 && (
              <Badge className="bg-red-500 text-white ml-2 text-xs px-1.5 py-0.5">
                {pendingRequests.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <div className="text-center py-6 lg:py-8 text-gray-500">
              <CheckCircle2 className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-3 lg:mb-4 text-green-500" />
              <p className="text-sm lg:text-base">All requests completed! Great work!</p>
            </div>
          ) : (
            <div className="space-y-3 lg:space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-3 lg:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="space-y-3">
                    {/* Request Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-xs lg:text-sm">Guest: {request.guestName}</span>
                        <Badge className={cn('text-xs px-1.5 py-0.5', statusConfig[request.status].color)}>
                          {statusConfig[request.status].label}
                        </Badge>
                      </div>
                      <p className="text-xs lg:text-sm text-gray-600 break-words">{request.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Room: {request.roomNumber}</span>
                        <span>Phone: {request.phone}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      {request.status === 'new' && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkInProgress(request.id)}
                          className="text-xs px-2 py-1 h-8"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Start
                        </Button>
                      )}
                      {request.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={() => handleMarkComplete(request.id)}
                          className="text-xs px-2 py-1 h-8 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}