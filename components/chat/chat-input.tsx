'use client'

import { useState, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (content: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage) {
      onSendMessage(trimmedMessage)
      setMessage('')
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-3 lg:p-4 border-t border-gray-200 bg-gray-50">
      <div className="flex space-x-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 min-h-[50px] lg:min-h-[60px] max-h-[120px] resize-none text-sm"
          rows={1}
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="px-3 lg:px-4 py-2 min-w-[44px] lg:min-w-[48px]"
          size="sm"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-2 hidden lg:block">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  )
} 