'use client'

import { useAuth } from '@/components/auth-provider'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  MessageCircle, 
  DoorOpen, 
  Wrench, 
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  }
]

export function MobileNav() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) {
    return null
  }

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user.role)
  )

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-2">
      <nav className="flex justify-around">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1',
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 