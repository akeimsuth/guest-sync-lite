'use client'

import { useAuth } from '@/components/auth-provider'
import { AdminDashboard } from '@/components/admin/dashboard'
import { HousekeeperDashboard } from '@/components/housekeeper/dashboard'

export function StaffView() {
  const { user } = useAuth()

  if (user?.role === 'admin') {
    return <AdminDashboard />
  }

  if (user?.role === 'housekeeper') {
    return <HousekeeperDashboard />
  }

  return (
    <div className="text-center py-12">
      <p className="text-gray-600">Invalid user role</p>
    </div>
  )
}