'use client'

import { AuthProvider } from '@/components/auth-provider'
import { AppLayout } from '@/components/layouts/app-layout'
import { GuestRequestsView } from '@/components/guest/requests-view'
import { Toaster } from '@/components/ui/sonner'

export default function GuestRequestsPage() {
  return (
    <AuthProvider>
      <AppLayout>
        <GuestRequestsView />
      </AppLayout>
      <Toaster />
    </AuthProvider>
  )
}