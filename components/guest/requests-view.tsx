'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Clock,
  CheckCircle2,
  User,
  Star,
  MessageCircle,
  Plus
} from 'lucide-react'
import { mockRequests } from '@/lib/mock-data'
import { ServiceRequest } from '@/lib/types'
import { cn } from '@/lib/utils'

const statusConfig = {
  new: { color: 'bg-blue-500 text-white', label: 'New' },
  in_progress: { color: 'bg-yellow-500 text-white', label: 'In Progress' },
  completed: { color: 'bg-green-500 text-white', label: 'Completed' }
}

export function GuestRequestsView() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<ServiceRequest[]>([])

  useEffect(() => {
    // Filter requests for the current guest
    const guestRequests = mockRequests.filter(r => r.guestId === user?.id)
    
    // Add some additional mock requests for demonstration
    const additionalRequests: ServiceRequest[] = [
      {
        id: 'guest-req-1',
        guestId: user?.id || 'guest-1',
        guestName: user?.name || 'John Smith',
        roomNumber: user?.roomNumber || '305',
        phone: user?.phone || '+1-555-0123',
        message: 'Extra towels',
        status: 'completed',
        priority: 'low',
        category: 'Housekeeping',
        createdAt: new Date('2025-01-26T12:30:00'),
        completedAt: new Date('2025-01-26T12:45:00'),
        rating: 5,
        assignedTo: 'Maria'
      },
      {
        id: 'guest-req-2',
        guestId: user?.id || 'guest-1',
        guestName: user?.name || 'John Smith',
        roomNumber: user?.roomNumber || '305',
        phone: user?.phone || '+1-555-0123',
        message: 'Breakfast order',
        status: 'in_progress',
        priority: 'medium',
        category: 'Room Service',
        createdAt: new Date('2025-01-26T11:15:00'),
        assignedTo: 'Maria'
      }
    ]

    setRequests([...guestRequests, ...additionalRequests])
    console.log('Guest requests loaded:', guestRequests.length + additionalRequests.length)
  }, [user])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={cn(
          'w-4 h-4',
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        )} 
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-slate-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-slate-800 rounded-full"></div>
            </div>
            <h1 className="text-xl font-semibold">GuestSync</h1>
          </div>
          <Badge variant="outline" className="bg-blue-600 text-white border-blue-500">
            Switch to Hotel View
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800" data-macaly="my-requests-title">My Requests</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No requests yet</h3>
            <p className="text-gray-500 mb-6">Submit your first service request to get started</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Request
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="shadow-md border-0 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {request.category}
                        </h3>
                        <Badge className={cn('text-xs', statusConfig[request.status].color)}>
                          {statusConfig[request.status].label}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{request.message}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        Requested at: {new Date(request.createdAt).toLocaleString([], { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    
                    {request.completedAt && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>
                          Completed at: {new Date(request.completedAt).toLocaleString([], { 
                            month: 'short', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    )}

                    {request.assignedTo && (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Assigned to: {request.assignedTo}</span>
                      </div>
                    )}
                  </div>

                  {request.rating && request.status === 'completed' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-yellow-600" data-macaly="rating-label">
                          Your rating:
                        </span>
                        <div className="flex space-x-1">
                          {renderStars(request.rating)}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}