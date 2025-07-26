'use client'

import { useAuth } from '@/components/auth-provider'
import { cn } from '@/lib/utils'
import { Home, MessageCircle, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<any>
}

const guestNavItems: NavItem[] = [
  {
    href: '/guest',
    label: 'Home',
    icon: Home
  },
  {
    href: '/guest/requests',
    label: 'My Requests',
    icon: MessageCircle
  }
]

export function BottomNav() {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user || user.role !== 'guest') {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50" data-macaly="bottom-navigation">
      <nav className="flex justify-around">
        {guestNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center py-2 px-4 rounded-lg transition-colors min-w-0',
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}