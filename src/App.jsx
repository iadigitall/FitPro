import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { router } from './router'
import { useAuthStore } from './store/authStore'
import { Splash } from './components/Splash'

export default function App() {
  const initializeAuth = useAuthStore((s) => s.initializeAuth)
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem('fitpro_splash_done')
  )

  useEffect(() => {
    const unsubscribe = initializeAuth()
    return unsubscribe
  }, [initializeAuth])

  const handleSplashDone = () => {
    sessionStorage.setItem('fitpro_splash_done', '1')
    setShowSplash(false)
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && <Splash onDone={handleSplashDone} />}
      </AnimatePresence>
      {!showSplash && <RouterProvider router={router} />}
    </>
  )
}
