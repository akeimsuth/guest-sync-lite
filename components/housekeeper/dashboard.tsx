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
    <div className="space-y-6" data-macaly="housekeeper-dashboard">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Staff Portal</h1>
        <Badge variant="outline" className="text-sm">
          Housekeeper View
        </Badge>
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Pending Requests</span>
            {pendingRequests.length > 0 && (
              <Badge className="bg-red-500 text-white ml-2">
                {pendingRequests.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <p>All requests completed! Great work!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {request.category} - Room {request.roomNumber}
                        </h3>
                        <Badge className={cn('text-xs', statusConfig[request.status].color)}>
                          {statusConfig[request.status].label}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{request.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Timer className="w-4 h-4" />
                          <span>{new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </span>
                        <span>Guest: {request.guestName}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {request.status === 'new' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkInProgress(request.id)}
                          className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                        >
                          Start Work
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleMarkComplete(request.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        data-macaly="mark-complete-button"
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Request Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>Request Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1" data-macaly="today-requests">
                {stats.todayRequests}
              </div>
              <p className="text-sm text-gray-600">Today's Requests</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1" data-macaly="avg-response-time">
                {stats.avgResponseTime} min
              </div>
              <p className="text-sm text-gray-600">Avg. Response Time</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <span className="text-3xl font-bold text-yellow-600" data-macaly="avg-rating">
                  {stats.avgRating}
                </span>
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
              </div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col space-y-1">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs">New Request</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-1">
              <Clock className="w-5 h-5" />
              <span className="text-xs">Break Time</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-1">
              <AlertCircle className="w-5 h-5" />
              <span className="text-xs">Report Issue</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col space-y-1">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs">Room Clean</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}