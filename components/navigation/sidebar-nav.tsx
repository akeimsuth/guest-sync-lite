'use client'

import { useAuth } from '@/components/auth-provider'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  MessageCircle, 
  DoorOpen, 
  Wrench, 
  Mail,
  Settings,
  LogOut,
  Building,
  MessageSquare,
  X,
  Building2,
  Plus,
  UserPlus
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<any>
  roles: string[]
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'housekeeper']
  },
  {
    href: '/requests',
    label: 'Requests',
    icon: MessageCircle,
    roles: ['admin', 'housekeeper']
  },
  {
    href: '/rooms',
    label: 'Rooms',
    icon: DoorOpen,
    roles: ['admin', 'housekeeper']
  },
  {
    href: '/chat',
    label: 'Chat',
    icon: MessageSquare,
    roles: ['admin', 'housekeeper']
  },
  {
    href: '/maintenance',
    label: 'Maintenance',
    icon: Wrench,
    roles: ['admin']
  },
  // {
  //   href: '/messages',
  //   label: 'Messages',
  //   icon: Mail,
  //   roles: ['admin', 'housekeeper']
  // }
]

interface SidebarNavProps {
  onClose?: () => void
}

export function SidebarNav({ onClose }: SidebarNavProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) {
    return null
  }

  const handleNavClick = () => {
    if (onClose) {
      onClose()
    }
  }

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'housekeeper']
    },
    {
      href: '/requests',
      label: 'Requests',
      icon: MessageCircle,
      roles: ['admin', 'housekeeper']
    },
    {
      href: '/rooms',
      label: 'Rooms',
      icon: Building2,
      roles: ['admin', 'housekeeper']
    },
    {
      href: '/chat',
      label: 'Chat',
      icon: MessageSquare,
      roles: ['admin', 'housekeeper']
    },
    {
      href: '/maintenance',
      label: 'Maintenance',
      icon: Wrench,
      roles: ['admin']
    }
  ]

  return (
    <div className="w-full lg:w-64 bg-slate-800 text-white min-h-screen flex flex-col" data-macaly="sidebar-navigation">
      <div className="p-4 lg:p-6 border-b border-slate-700 flex items-center justify-between">
        <h1 className="text-xl font-bold">GuestSync</h1>
        {onClose && (
          <Button onClick={onClose} className="lg:hidden p-2 text-white hover:bg-slate-700">
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            if (!item.roles.includes(user.role)) return null
            
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Quick Actions for Admin */}
        {user.role === 'admin' && (
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/rooms"
                  onClick={handleNavClick}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4 mr-3" />
                  Create Room
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  onClick={handleNavClick}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <UserPlus className="w-4 h-4 mr-3" />
                  Assign Staff
                </Link>
              </li>
              <li>
                <Link
                  href="/maintenance"
                  onClick={handleNavClick}
                  className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Wrench className="w-4 h-4 mr-3" />
                  New Task
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}