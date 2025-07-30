'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MessageCircle, 
  Clock, 
  CheckCircle2,
  Search,
  Filter,
  Plus,
  Phone,
  MapPin
} from 'lucide-react'
import { mockRequests } from '@/lib/mock-data'
import { ServiceRequest } from '@/lib/types'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const statusConfig = {
  new: { color: 'bg-blue-500 text-white', label: 'New', icon: MessageCircle },
  in_progress: { color: 'bg-yellow-500 text-white', label: 'In Progress', icon: Clock },
  completed: { color: 'bg-green-500 text-white', label: 'Completed', icon: CheckCircle2 }
}

const priorityConfig = {
  low: { color: 'bg-gray-500 text-white', label: 'Low' },
  medium: { color: 'bg-yellow-500 text-white', label: 'Medium' },
  high: { color: 'bg-red-500 text-white', label: 'High' }
}

export function RequestsView() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests)
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>(mockRequests)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  useEffect(() => {
    let filtered = requests

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.roomNumber.includes(searchTerm)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter)
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(request => request.priority === priorityFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(request => request.category === categoryFilter)
    }

    setFilteredRequests(filtered)
  }, [requests, searchTerm, statusFilter, priorityFilter, categoryFilter])

  const handleStatusChange = (requestId: string, newStatus: 'new' | 'in_progress' | 'completed') => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              status: newStatus,
              completedAt: newStatus === 'completed' ? new Date() : undefined,
              assignedTo: newStatus === 'in_progress' ? user?.id : req.assignedTo
            }
          : req
      )
    )
    toast.success(`Request marked as ${statusConfig[newStatus].label}`)
  }

  const handleAssign = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, assignedTo: user?.id }
          : req
      )
    )
    toast.success('Request assigned to you')
  }

  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length
  }

  const categories = Array.from(new Set(requests.map(r => r.category)))

  return (
    <div className="space-y-3 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800">Service Requests</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button size="sm" className="text-xs lg:text-sm w-fit">
            <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            New Request
          </Button>
        </div>
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
                <p className="text-xs text-gray-600 truncate">Total</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <MessageCircle className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">New</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.new}</p>
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
              <div className="p-1.5 lg:p-3 bg-green-100 rounded-lg flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Completed</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base lg:text-xl">
            <Filter className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search requests..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base lg:text-xl">
            Requests ({filteredRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No requests found matching your filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRequests.map((request) => {
                const StatusIcon = statusConfig[request.status].icon
                const isAssignedToMe = request.assignedTo === user?.id
                
                return (
                  <div key={request.id} className="p-3 lg:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="space-y-3">
                      {/* Request Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-xs lg:text-sm">Guest: {request.guestName}</span>
                          <Badge className={cn('text-xs px-1.5 py-0.5', statusConfig[request.status].color)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[request.status].label}
                          </Badge>
                          <Badge className={cn('text-xs px-1.5 py-0.5', priorityConfig[request.priority].color)}>
                            {priorityConfig[request.priority].label}
                          </Badge>
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            {request.category}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Request Details */}
                      <div className="space-y-2">
                        <p className="text-xs lg:text-sm text-gray-600 break-words">{request.message}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Room {request.roomNumber}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {request.phone}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap">
                        {request.status === 'new' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(request.id, 'in_progress')}
                              className="text-xs px-2 py-1 h-8"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              Start
                            </Button>
                            {user?.role === 'admin' && !request.assignedTo && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAssign(request.id)}
                                className="text-xs px-2 py-1 h-8"
                              >
                                Assign
                              </Button>
                            )}
                          </>
                        )}
                        {request.status === 'in_progress' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(request.id, 'completed')}
                            className="text-xs px-2 py-1 h-8 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Complete
                          </Button>
                        )}
                        {isAssignedToMe && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            Assigned to you
                          </Badge>
                        )}
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