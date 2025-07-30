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
import { ChevronDown, Shield, Wrench } from 'lucide-react'

const roleConfig = {
  housekeeper: { icon: Wrench, label: 'Staff Portal', color: 'text-green-600' },
  admin: { icon: Shield, label: 'Hotel View', color: 'text-purple-600' }
}

export function RoleSwitcher() {
  const { user, switchRole } = useAuth()

  if (!user) return null

  const currentConfig = roleConfig[user.role]
  const CurrentIcon = currentConfig.icon

  return (
    <div className="relative z-50" data-macaly="role-switcher">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="bg-white shadow-lg border-2 hover:shadow-xl transition-shadow text-xs lg:text-sm"
            size="sm"
          >
            <CurrentIcon className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
            <span className="font-medium hidden sm:inline">{currentConfig.label}</span>
            <span className="font-medium sm:hidden">{currentConfig.label.split(' ')[0]}</span>
            <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 lg:w-48">
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
                <Icon className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
                <span className="text-xs lg:text-sm">{config.label}</span>
                {isActive && <span className="ml-auto text-xs text-gray-500">Current</span>}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}