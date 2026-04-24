import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { login } from '../auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const onSuccess = () => { login(); navigate('/dashboard') }
  const onBack = () => navigate('/')
  const onForgot = () => navigate('/forgot')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 1200)
  }

  const inputStyle = (key: string): React.CSSProperties => ({
    width: '100%',
    padding: '13px 16px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${focused === key ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
    color: 'var(--text)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxShadow: focused === key ? '0 0 0 3px var(--accent-glow)' : 'none',
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 24,
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, oklch(66% 0.28 295 / 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 60% at 80% 20%, oklch(82% 0.22 145 / 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className='fade-up'
        style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            color: 'var(--muted)',
            fontSize: 13,
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.color = 'white'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.color = 'var(--muted)'
          }}
        >
          ← Back to home
        </button>

        <div
          style={{
            background: 'rgba(14,15,30,0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24,
            padding: '36px 32px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
          }}
        >
          <div
            style={{
              fontFamily: 'Syne',
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: '-0.5px',
              marginBottom: 4,
            }}
          >
            <span style={{ color: 'var(--accent)' }}>sub</span>track
          </div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 26, marginBottom: 6 }}>
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>
            {mode === 'login' ? 'Sign in to your dashboard' : 'Start tracking your subscriptions'}
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            {mode === 'signup' && (
              <div>
                <label
                  style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}
                >
                  Full name
                </label>
                <input
                  placeholder='Alex Johnson'
                  style={inputStyle('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            )}
            <div>
              <label
                style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}
              >
                Email
              </label>
              <input
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 12, color: 'var(--muted)' }}>Password</label>
                {mode === 'login' && (
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      onForgot()
                    }}
                    style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}
                  >
                    Forgot?
                  </a>
                )}
              </div>
              <input
                type='password'
                placeholder='••••••••'
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={inputStyle('pass')}
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              style={{
                marginTop: 8,
                padding: '14px',
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                background: loading ? 'rgba(110,64,201,0.5)' : 'var(--accent)',
                color: 'white',
                fontFamily: 'Syne',
                boxShadow: loading ? 'none' : '0 0 30px var(--accent-glow)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              {loading ? (
                <>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='white'
                    strokeWidth='2.5'
                    style={{ animation: 'spin 0.8s linear infinite' }}
                  >
                    <path d='M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83' />
                  </svg>
                  Signing in…
                </>
              ) : mode === 'login' ? (
                'Sign in →'
              ) : (
                'Create account →'
              )}
            </button>
          </form>

          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <button
            onClick={onSuccess}
            style={{
              marginTop: 16,
              width: '100%',
              padding: '12px',
              borderRadius: 12,
              fontSize: 14,
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
            }}
          >
            <svg width='16' height='16' viewBox='0 0 24 24'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
            Continue with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--muted)', fontSize: 13 }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault()
                setMode(mode === 'login' ? 'signup' : 'login')
              }}
              style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
