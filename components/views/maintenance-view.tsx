'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Wrench, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
} from 'lucide-react'
import { mockRooms } from '@/lib/mock-data'
import { Room } from '@/lib/types'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface MaintenanceTask {
  id: string
  title: string
  description: string
  roomNumber?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  category: string
  assignedTo?: string
  createdAt: Date
  scheduledFor?: Date
  completedAt?: Date
  estimatedDuration: number // in hours
  actualDuration?: number
  cost?: number
}

const priorityConfig = {
  low: { color: 'bg-gray-500 text-white', label: 'Low' },
  medium: { color: 'bg-yellow-500 text-white', label: 'Medium' },
  high: { color: 'bg-orange-500 text-white', label: 'High' },
  urgent: { color: 'bg-red-500 text-white', label: 'Urgent' }
}

const statusConfig = {
  pending: { color: 'bg-gray-500 text-white', label: 'Pending', icon: Clock },
  in_progress: { color: 'bg-blue-500 text-white', label: 'In Progress', icon: Wrench },
  completed: { color: 'bg-green-500 text-white', label: 'Completed', icon: CheckCircle2 },
  cancelled: { color: 'bg-red-500 text-white', label: 'Cancelled', icon: AlertCircle }
}

export function MaintenanceView() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<MaintenanceTask[]>([
    {
      id: '1',
      title: 'HVAC System Inspection',
      description: 'Annual HVAC system inspection and maintenance for all units',
      priority: 'medium',
      status: 'pending',
      category: 'HVAC',
      createdAt: new Date('2025-01-26'),
      scheduledFor: new Date('2025-01-28'),
      estimatedDuration: 4
    },
    {
      id: '2',
      title: 'Leaking Faucet Repair',
      description: 'Fix leaking faucet in room 208 bathroom',
      roomNumber: '208',
      priority: 'high',
      status: 'in_progress',
      category: 'Plumbing',
      assignedTo: 'maint-1',
      createdAt: new Date('2025-01-26T08:30:00'),
      estimatedDuration: 2,
      actualDuration: 1.5
    },
    {
      id: '3',
      title: 'TV System Replacement',
      description: 'Replace non-working TV in room 217',
      roomNumber: '217',
      priority: 'medium',
      status: 'completed',
      category: 'Electronics',
      assignedTo: 'tech-1',
      createdAt: new Date('2025-01-26T09:15:00'),
      completedAt: new Date('2025-01-26T11:00:00'),
      estimatedDuration: 1,
      actualDuration: 1,
      cost: 150
    },
    {
      id: '4',
      title: 'Fire Alarm System Test',
      description: 'Monthly fire alarm system testing and inspection',
      priority: 'high',
      status: 'pending',
      category: 'Safety',
      createdAt: new Date('2025-01-26'),
      scheduledFor: new Date('2025-01-27'),
      estimatedDuration: 3
    }
  ])
  const [filteredTasks, setFilteredTasks] = useState<MaintenanceTask[]>(tasks)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    roomNumber: '',
    priority: 'medium' as const,
    category: '',
    scheduledFor: ''
  })

  useEffect(() => {
    let filtered = tasks

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.roomNumber && task.roomNumber.includes(searchTerm))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter)
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(task => task.category === categoryFilter)
    }

    setFilteredTasks(filtered)
  }, [tasks, searchTerm, statusFilter, priorityFilter, categoryFilter])

  const handleStatusChange = (taskId: string, newStatus: MaintenanceTask['status']) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: newStatus,
              completedAt: newStatus === 'completed' ? new Date() : task.completedAt
            }
          : task
      )
    )
    toast.success(`Task marked as ${statusConfig[newStatus].label}`)
  }

  const handleAssign = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, assignedTo: user?.id }
          : task
      )
    )
    toast.success('Task assigned to you')
  }

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.description || !newTask.category) {
      toast.error('Please fill in all required fields')
      return
    }

    const task: MaintenanceTask = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      roomNumber: newTask.roomNumber || undefined,
      priority: newTask.priority,
      status: 'pending',
      category: newTask.category,
      createdAt: new Date(),
      scheduledFor: newTask.scheduledFor ? new Date(newTask.scheduledFor) : undefined,
      estimatedDuration: 2
    }

    setTasks(prev => [...prev, task])
    setNewTask({
      title: '',
      description: '',
      roomNumber: '',
      priority: 'medium',
      category: '',
      scheduledFor: ''
    })
    setShowNewTaskForm(false)
    toast.success('Maintenance task created')
  }

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    urgent: tasks.filter(t => t.priority === 'urgent').length
  }

  const categories = Array.from(new Set(tasks.map(t => t.category)))

  return (
    <div className="space-y-3 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800">Maintenance Management</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            size="sm" 
            className="text-xs lg:text-sm w-fit"
            onClick={() => setShowNewTaskForm(true)}
          >
            <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <Wrench className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
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
              <div className="p-1.5 lg:p-3 bg-gray-100 rounded-lg flex-shrink-0">
                <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-gray-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Pending</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <Wrench className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
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

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-3 bg-red-100 rounded-lg flex-shrink-0">
                <AlertCircle className="w-4 h-4 lg:w-6 lg:h-6 text-red-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-600 truncate">Urgent</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-800">{stats.urgent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Task Form */}
      {showNewTaskForm && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base lg:text-xl">Create New Maintenance Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                className="text-sm"
              />
              <Input
                placeholder="Room number (optional)"
                value={newTask.roomNumber}
                onChange={(e) => setNewTask(prev => ({ ...prev, roomNumber: e.target.value }))}
                className="text-sm"
              />
              <Select value={newTask.priority} onValueChange={(value: any) => setNewTask(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
              <Select value={newTask.category} onValueChange={(value) => setNewTask(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Safety">Safety</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newTask.scheduledFor}
                onChange={(e) => setNewTask(prev => ({ ...prev, scheduledFor: e.target.value }))}
                className="text-sm"
              />
            </div>
            <Textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
              className="mt-3 text-sm"
              rows={3}
            />
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleCreateTask} className="text-xs">
                Create Task
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowNewTaskForm(false)} className="text-xs">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                placeholder="Search tasks..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                <SelectItem value="urgent">Urgent</SelectItem>
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

      {/* Tasks List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base lg:text-xl">
            Maintenance Tasks ({filteredTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Wrench className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No maintenance tasks found matching your filters.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => {
                const StatusIcon = statusConfig[task.status].icon
                
                return (
                  <div key={task.id} className="p-3 lg:p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="space-y-3">
                      {/* Task Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-xs lg:text-sm">{task.title}</span>
                          <Badge className={cn('text-xs px-1.5 py-0.5', statusConfig[task.status].color)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[task.status].label}
                          </Badge>
                          <Badge className={cn('text-xs px-1.5 py-0.5', priorityConfig[task.priority].color)}>
                            {priorityConfig[task.priority].label}
                          </Badge>
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            {task.category}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Task Details */}
                      <div className="space-y-2">
                        <p className="text-xs lg:text-sm text-gray-600 break-words">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                          {task.roomNumber && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Room {task.roomNumber}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Est: {task.estimatedDuration}h
                          </span>
                          {task.actualDuration && (
                            <span className="flex items-center gap-1">
                              <Wrench className="w-3 h-3" />
                              Actual: {task.actualDuration}h
                            </span>
                          )}
                          {task.cost && (
                            <span className="flex items-center gap-1">
                              <span>$</span>
                              Cost: ${task.cost}
                            </span>
                          )}
                          {task.scheduledFor && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Scheduled: {new Date(task.scheduledFor).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 flex-wrap">
                        {task.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(task.id, 'in_progress')}
                              className="text-xs px-2 py-1 h-8"
                            >
                              <Wrench className="w-3 h-3 mr-1" />
                              Start
                            </Button>
                            {!task.assignedTo && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleAssign(task.id)}
                                className="text-xs px-2 py-1 h-8"
                              >
                                <User className="w-3 h-3 mr-1" />
                                Assign
                              </Button>
                            )}
                          </>
                        )}
                        {task.status === 'in_progress' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(task.id, 'completed')}
                            className="text-xs px-2 py-1 h-8 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Complete
                          </Button>
                        )}
                        {task.assignedTo && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            Assigned
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