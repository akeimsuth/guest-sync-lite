'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { ChatRoomList } from './chat-room-list'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { ChatRoom, Message } from '@/lib/types'
import { mockChatRooms } from '@/lib/mock-data'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ChatView() {
  const { user } = useAuth()
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null)
  const [rooms, setRooms] = useState<ChatRoom[]>(mockChatRooms)
  const [showRoomList, setShowRoomList] = useState(true)

  const handleSendMessage = (content: string) => {
    if (!selectedRoom || !user) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      content,
      timestamp: new Date(),
      isRead: false
    }

    const updatedRooms = rooms.map(room => {
      if (room.id === selectedRoom.id) {
        return {
          ...room,
          messages: [...room.messages, newMessage],
          lastMessage: newMessage,
          unreadCount: room.unreadCount + 1
        }
      }
      return room
    })

    setRooms(updatedRooms)
    setSelectedRoom(updatedRooms.find(r => r.id === selectedRoom.id) || null)
  }

  const handleRoomSelect = (room: ChatRoom) => {
    // Mark messages as read when selecting a room
    const updatedRooms = rooms.map(r => {
      if (r.id === room.id) {
        return {
          ...r,
          messages: r.messages.map(msg => ({ ...msg, isRead: true })),
          unreadCount: 0
        }
      }
      return r
    })
    
    setRooms(updatedRooms)
    setSelectedRoom(updatedRooms.find(r => r.id === room.id) || null)
    
    // On mobile, hide room list when room is selected
    if (window.innerWidth < 1024) {
      setShowRoomList(false)
    }
  }

  const handleBackToRooms = () => {
    setShowRoomList(true)
    setSelectedRoom(null)
  }

  return (
    <div className="h-full flex bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Mobile Header for Chat Room */}
      {selectedRoom && (
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToRooms}
            className="p-2 mr-3"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{selectedRoom.name}</span>
          </div>
        </div>
      )}

      {/* Chat Room List */}
      <div className={`
        ${showRoomList ? 'block' : 'hidden'} lg:block
        w-full lg:w-80 border-r border-gray-200 flex-shrink-0
        ${selectedRoom ? 'lg:relative' : 'relative'}
      `}>
        <ChatRoomList 
          rooms={rooms}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
        />
      </div>

      {/* Chat Messages */}
      <div className={`
        flex-1 flex flex-col
        ${selectedRoom ? 'block' : 'hidden lg:block'}
        ${selectedRoom ? 'pt-16 lg:pt-0' : ''}
      `}>
        {selectedRoom ? (
          <>
            <div className="flex-1 overflow-hidden">
              <ChatMessages 
                messages={selectedRoom.messages}
                currentUserId={user?.id}
              />
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Select a chat room</h3>
              <p className="text-sm">Choose a room from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 