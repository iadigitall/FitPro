import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Dumbbell, Utensils, TrendingUp, User } from 'lucide-react'
import { motion } from 'framer-motion'

const tabs = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Início',   id: 'tour-nav-home' },
  { to: '/workout',    icon: Dumbbell,         label: 'Treino',   id: 'tour-nav-workout' },
  { to: '/nutrition',  icon: Utensils,         label: 'Nutrição', id: 'tour-nav-nutrition' },
  { to: '/evolution',  icon: TrendingUp,       label: 'Evolução', id: 'tour-nav-evolution' },
  { to: '/profile',    icon: User,             label: 'Perfil',   id: 'tour-nav-profile' },
]

export function BottomNav() {
  return (
    <nav
      id="bottom-nav"
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        padding: '6px',
        gap: 2,
        background: 'rgba(7, 10, 22, 0.82)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderRadius: 100,
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 12px 48px rgba(0,0,0,0.65), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {tabs.map(({ to, icon: Icon, label, id }) => (
        <NavLink
          key={to}
          to={to}
          id={id}
          style={{ textDecoration: 'none' }}
        >
          {({ isActive }) => (
            <div
              style={{
                position: 'relative',
                width: 54,
                height: 44,
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="island-bubble"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 50,
                    background: 'rgba(220,232,255,0.11)',
                    boxShadow: '0 0 20px rgba(220,232,255,0.07)',
                  }}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.6}
                style={{
                  color: isActive ? '#dce8ff' : 'rgba(220,232,255,0.28)',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'color 0.15s',
                }}
              />
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
