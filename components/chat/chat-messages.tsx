'use client'

import { useEffect, useRef } from 'react'
import { Message } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Shield, Wrench } from 'lucide-react'

interface ChatMessagesProps {
  messages: Message[]
  currentUserId?: string
}

export function ChatMessages({ messages, currentUserId }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-3 h-3" />
      case 'housekeeper':
        return <Wrench className="w-3 h-3" />
      default:
        return null
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'housekeeper':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Messages Header - Hidden on mobile */}
      <div className="hidden lg:block p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
        <p className="text-sm text-gray-500">{messages.length} messages</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-3 lg:space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-sm lg:text-base">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId === currentUserId
            
            return (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  isOwnMessage ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] lg:max-w-md px-3 py-2 lg:px-4 lg:py-2 rounded-lg',
                    isOwnMessage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  )}
                >
                  {/* Message Header */}
                  <div className={cn(
                    'flex items-center space-x-2 mb-1',
                    isOwnMessage ? 'justify-end' : 'justify-start'
                  )}>
                    <span className="text-xs font-medium">
                      {message.senderName}
                    </span>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        'text-xs px-1 py-0',
                        getRoleColor(message.senderRole)
                      )}
                    >
                      {getRoleIcon(message.senderRole)}
                      <span className="ml-1 capitalize text-xs">{message.senderRole}</span>
                    </Badge>
                  </div>

                  {/* Message Content */}
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </p>

                  {/* Message Footer */}
                  <div className={cn(
                    'flex items-center justify-between mt-2 text-xs',
                    isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                  )}>
                    <span>{formatTime(message.timestamp)}</span>
                    {isOwnMessage && (
                      <span className="flex items-center space-x-1">
                        {message.isRead ? (
                          <span>✓✓</span>
                        ) : (
                          <span>✓</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
} 