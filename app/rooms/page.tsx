'use client'

import { AuthProvider } from '@/components/auth-provider'
import { AppLayout } from '@/components/layouts/app-layout'
import { RoomsView } from '@/components/views/rooms-view'
import { Toaster } from '@/components/ui/sonner'

export default function RoomsPage() {
  return (
    <AuthProvider>
      <AppLayout>
        <RoomsView />
      </AppLayout>
      <Toaster />
    </AuthProvider>
  )
} 