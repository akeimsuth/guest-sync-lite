'use client'

import { AuthProvider } from '@/components/auth-provider'
import { AppLayout } from '@/components/layouts/app-layout'
import { ChatView } from '@/components/chat/chat-view'
import { Toaster } from '@/components/ui/sonner'

export default function ChatPage() {
  return (
    <AuthProvider>
      <AppLayout>
        <ChatView />
      </AppLayout>
      <Toaster />
    </AuthProvider>
  )
} 