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
  X
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
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  if (!user) {
    return null
  }

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user.role)
  )

  const handleNavClick = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="w-full lg:w-64 bg-slate-800 text-white min-h-screen flex flex-col" data-macaly="sidebar-navigation">
      {/* Header with close button for mobile */}
      <div className="p-4 lg:p-6 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Building className="w-5 h-5 text-slate-800" />
          </div>
          <span className="text-xl font-semibold">GuestSync</span>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden p-2 text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-4">
          {filteredNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    isActive 
                      ? 'bg-slate-700 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Sign Out */}
      <div className="p-4 border-t border-slate-700">
        <div className="mb-3">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-slate-400 capitalize">{user.role}</p>
        </div>
        <button
          onClick={signOut}
          className="flex items-center space-x-2 text-slate-300 hover:text-white text-sm w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}