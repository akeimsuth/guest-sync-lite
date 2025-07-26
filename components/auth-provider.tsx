'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, UserRole } from '@/lib/types'
import { getCurrentUser, setCurrentUser, switchUserRole } from '@/lib/mock-data'

interface AuthContextType {
  user: User | null
  loading: boolean
  switchRole: (role: UserRole) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user state
    const timer = setTimeout(() => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setLoading(false)
      console.log('Auth provider initialized with user:', currentUser?.name)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const switchRole = (role: UserRole) => {
    console.log('Switching to role:', role)
    switchUserRole(role)
    const newUser = getCurrentUser()
    setUser(newUser)
  }

  const signOut = () => {
    console.log('User signed out')
    setCurrentUser(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, switchRole, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}