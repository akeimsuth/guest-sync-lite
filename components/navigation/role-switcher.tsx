'use client'

import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserRole } from '@/lib/types'
import { ChevronDown, User, Shield, Wrench } from 'lucide-react'

const roleConfig = {
  guest: { icon: User, label: 'Guest View', color: 'text-blue-600' },
  housekeeper: { icon: Wrench, label: 'Staff Portal', color: 'text-green-600' },
  admin: { icon: Shield, label: 'Hotel View', color: 'text-purple-600' }
}

export function RoleSwitcher() {
  const { user, switchRole } = useAuth()

  if (!user) return null

  const currentConfig = roleConfig[user.role]
  const CurrentIcon = currentConfig.icon

  return (
    <div className="fixed top-4 right-4 z-50" data-macaly="role-switcher">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white shadow-lg border-2 hover:shadow-xl transition-shadow"
          >
            <CurrentIcon className={`w-4 h-4 mr-2 ${currentConfig.color}`} />
            <span className="font-medium">{currentConfig.label}</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {Object.entries(roleConfig).map(([role, config]) => {
            const Icon = config.icon
            const isActive = user.role === role
            
            return (
              <DropdownMenuItem
                key={role}
                onClick={() => switchRole(role as UserRole)}
                disabled={isActive}
                className={isActive ? 'bg-gray-50' : ''}
              >
                <Icon className={`w-4 h-4 mr-2 ${config.color}`} />
                <span>{config.label}</span>
                {isActive && <span className="ml-auto text-xs text-gray-500">Current</span>}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}