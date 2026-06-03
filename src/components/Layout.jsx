import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Tour } from './Tour'
import { Celebration } from './Celebration'
import { useUserStore } from '../store/userStore'

export default function Layout() {
  const { celebration, clearCelebration } = useUserStore()

  return (
    <div
      className="flex flex-col w-full relative overflow-x-hidden"
      style={{
        minHeight: '100dvh',
        background: 'radial-gradient(ellipse at 50% 30%, #0d2260 0%, #070d1f 55%, #030810 100%)',
      }}
    >
      <main className="flex-1 pb-28">
        <Outlet />
      </main>
      <BottomNav />
      <Tour />
      <Celebration type={celebration} onClose={clearCelebration} />
    </div>
  )
}
