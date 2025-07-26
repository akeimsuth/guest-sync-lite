'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Clock, Send } from 'lucide-react'
import { toast } from 'sonner'

export function RequestForm() {
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) {
      toast.error('Please describe your request')
      return
    }

    setIsSubmitting(true)
    console.log('Submitting request:', { 
      message, 
      guestId: user?.id, 
      roomNumber: user?.roomNumber 
    })

    // Simulate API call
    setTimeout(() => {
      toast.success('Request submitted successfully!')
      console.log('Request submitted successfully')
      setMessage('')
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-slate-800 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-slate-800 rounded-full"></div>
            </div>
            <h1 className="text-xl font-semibold" data-macaly="app-title">GuestSync</h1>
          </div>
          <Badge variant="outline" className="bg-blue-600 text-white border-blue-500">
            Switch to Hotel View
          </Badge>
        </div>
      </div>

      <div className="p-6">
        {/* Back navigation */}
        <div className="flex items-center mb-6">
          <ArrowLeft className="w-5 h-5 text-gray-600 mr-2" />
          <span className="text-gray-600 font-medium">Back</span>
          <span className="text-2xl font-bold text-gray-800 ml-4">Custom Request</span>
        </div>

        {/* Request Form */}
        <Card className="max-w-md mx-auto shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg text-gray-800" data-macaly="form-title">
              How can we help you?
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea
                placeholder="Describe your request..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] resize-none border-2 focus:border-blue-500 transition-colors"
                data-macaly="request-textarea"
              />

              <Button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="w-full py-6 text-lg font-semibold bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-colors disabled:opacity-50"
                data-macaly="submit-button"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>Submit Request</span>
                  </div>
                )}
              </Button>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span data-macaly="response-time">Estimated response time: 5-10 minutes</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Room info */}
        {user?.roomNumber && (
          <div className="text-center mt-6 text-sm text-gray-600">
            Room {user.roomNumber} • {user.name}
          </div>
        )}
      </div>
    </div>
  )
}