'use client'

import { AuthProvider } from '@/components/auth-provider'
import { AppLayout } from '@/components/layouts/app-layout'
import { StaffView } from '@/components/views/staff-view'
import { useAuth } from '@/components/auth-provider'
import { Toaster } from '@/components/ui/sonner'

function AppContent() {
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
        <div className="text-center px-4">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Welcome to GuestSync</h1>
          <p className="text-gray-600 text-sm lg:text-base">Hotel Request Management System</p>
        </div>
      </div>
    )
  }

  return (
    <AppLayout>
      <StaffView />
    </AppLayout>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  )
}