'use client'

import { ChatRoom } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Users, MessageCircle } from 'lucide-react'

interface ChatRoomListProps {
  rooms: ChatRoom[]
  selectedRoom: ChatRoom | null
  onRoomSelect: (room: ChatRoom) => void
}

export function ChatRoomList({ rooms, selectedRoom, onRoomSelect }: ChatRoomListProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Chat Rooms</h2>
        <p className="text-sm text-gray-500">Internal communication</p>
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id
          const hasUnread = room.unreadCount > 0
          
          return (
            <div
              key={room.id}
              onClick={() => onRoomSelect(room)}
              className={cn(
                'p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 active:bg-gray-100',
                isSelected && 'bg-blue-50 border-blue-200'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <h3 className={cn(
                      'text-sm font-medium truncate',
                      hasUnread ? 'text-gray-900' : 'text-gray-700'
                    )}>
                      {room.name}
                    </h3>
                  </div>
                  
                  {room.lastMessage && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {room.lastMessage.senderName}: {room.lastMessage.content}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Users className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-500">
                      {room.participants.length} participants
                    </span>
                  </div>
                </div>

                {hasUnread && (
                  <Badge variant="destructive" className="ml-2 flex-shrink-0">
                    {room.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 