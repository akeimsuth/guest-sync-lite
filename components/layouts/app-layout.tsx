'use client'

import { useAuth } from '@/components/auth-provider'
import { SidebarNav } from '@/components/navigation/sidebar-nav'
import { BottomNav } from '@/components/navigation/bottom-nav'
import { RoleSwitcher } from '@/components/navigation/role-switcher'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading GuestSync...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to GuestSync</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>
      </div>
    )
  }

  const isGuestView = user.role === 'guest'
  const isStaffView = user.role === 'housekeeper' || user.role === 'admin'

  return (
    <div className="min-h-screen bg-gray-50">
      <RoleSwitcher />
      
      {isStaffView && (
        <div className="flex">
          <SidebarNav />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      )}

      {isGuestView && (
        <div className="pb-20">
          <main className="min-h-screen">
            {children}
          </main>
          <BottomNav />
        </div>
      )}
    </div>
  )
}