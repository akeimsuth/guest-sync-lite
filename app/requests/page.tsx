'use client'

import { AuthProvider } from '@/components/auth-provider'
import { AppLayout } from '@/components/layouts/app-layout'
import { RequestsView } from '@/components/views/requests-view'
import { Toaster } from '@/components/ui/sonner'

export default function RequestsPage() {
  return (
    <AuthProvider>
      <AppLayout>
        <RequestsView />
      </AppLayout>
      <Toaster />
    </AuthProvider>
  )
} 