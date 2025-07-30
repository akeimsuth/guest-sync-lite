'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { SidebarNav } from '@/components/navigation/sidebar-nav'
import { RoleSwitcher } from '@/components/navigation/role-switcher'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="font-semibold text-gray-900">GuestSync</span>
          </div>
        </div>
        <RoleSwitcher />
      </div>

      {/* Desktop Role Switcher */}
      <div className="hidden lg:block absolute top-4 right-4">
        <RoleSwitcher />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:inset-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <SidebarNav onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:ml-0 overflow-hidden">
          {/* Content Area */}
          <div className="flex-1 overflow-auto p-4 lg:p-6 pb-20 lg:pb-6">
            {children}
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden flex-shrink-0">
            <MobileNav />
          </div>
        </main>
      </div>
    </div>
  )
}