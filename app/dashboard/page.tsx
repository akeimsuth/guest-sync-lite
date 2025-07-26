'use client'

import { AuthProvider } from '@/components/auth-provider'
import { AppLayout } from '@/components/layouts/app-layout'
import { StaffView } from '@/components/views/staff-view'
import { Toaster } from '@/components/ui/sonner'

export default function DashboardPage() {
  return (
    <AuthProvider>
      <AppLayout>
        <StaffView />
      </AppLayout>
      <Toaster />
    </AuthProvider>
  )
}