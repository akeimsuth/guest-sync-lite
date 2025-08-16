'use client'

import { AuthProvider } from '@/components/auth-provider'
import { AppLayout } from '@/components/layouts/app-layout'
import { StaffView } from '@/components/views/staff-view'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Building2, Timer } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <AuthProvider>
      <AppLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center px-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to GuestSync</h1>
              <p className="text-gray-600 mb-8">Hotel Management System</p>
              
              {/* Simple Demo Section */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Try the System</h2>
                <div className="space-y-3">
                  <Link href="/rooms" className="block">
                    <Button className="w-full">
                      <Building2 className="w-4 h-4 mr-2" />
                      Room Management
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="block">
                    <Button variant="outline" className="w-full">
                      <Timer className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Simple Feature List */}
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Room Management</h3>
                    <p className="text-sm text-gray-600">Assign staff, track cleaning times, monitor room status</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <Timer className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">Time Tracking</h3>
                    <p className="text-sm text-gray-600">Real-time cleaning duration tracking for staff efficiency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StaffView />
      </AppLayout>
      <Toaster />
    </AuthProvider>
  )
}