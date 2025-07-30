'use client'

import { AuthProvider } from '@/components/auth-provider'
import { AppLayout } from '@/components/layouts/app-layout'
import { MaintenanceView } from '@/components/views/maintenance-view'
import { Toaster } from '@/components/ui/sonner'

export default function MaintenancePage() {
  return (
    <AuthProvider>
      <AppLayout>
        <MaintenanceView />
      </AppLayout>
      <Toaster />
    </AuthProvider>
  )
} 