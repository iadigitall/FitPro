import { createHashRouter, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Workout from './pages/Workout'
import Nutrition from './pages/Nutrition'
import Evolution from './pages/Evolution'
import Profile from './pages/Profile'

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #0d2260 0%, #070d1f 55%, #030810 100%)' }}>
      <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: 'rgba(220,232,255,0.3)', borderTopColor: '#dce8ff' }} />
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { user, profile, loading } = useAuthStore()
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" replace />
  if (!profile?.onboardingComplete) return <Navigate to="/onboarding" replace />
  return children
}

function AuthRoute({ children }) {
  const { user, profile, loading } = useAuthStore()
  if (loading) return <Spinner />
  if (user && profile?.onboardingComplete) return <Navigate to="/dashboard" replace />
  return children
}

function OnboardingRoute({ children }) {
  const { user, profile, loading } = useAuthStore()
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/login" replace />
  if (profile?.onboardingComplete) return <Navigate to="/dashboard" replace />
  return children
}

export const router = createHashRouter([
  { path: '/login',      element: <AuthRoute><Auth defaultTab="login" /></AuthRoute> },
  { path: '/register',   element: <AuthRoute><Auth defaultTab="signup" /></AuthRoute> },
  { path: '/onboarding', element: <OnboardingRoute><Onboarding /></OnboardingRoute> },
  {
    path: '/',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      { index: true,          element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard',    element: <Dashboard /> },
      { path: 'workout',      element: <Workout /> },
      { path: 'nutrition',    element: <Nutrition /> },
      { path: 'evolution',    element: <Evolution /> },
      { path: 'profile',      element: <Profile /> },
    ],
  },
  { path: '*', element: <Navigate to="/login" replace /> },
])
