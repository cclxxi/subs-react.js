import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function ForgotPage() {
  const navigate = useNavigate()
  const onBack = () => navigate('/login')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1400)
  }

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
          ← Back to sign in
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
              marginBottom: 20,
            }}
          >
            <span style={{ color: 'var(--accent)' }}>sub</span>track
          </div>

          {!sent ? (
            <>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  marginBottom: 20,
                  background: 'var(--accent-glow)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}
              >
                🔑
              </div>

              <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 24, marginBottom: 8 }}>
                Forgot password?
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
                No worries. Enter your email and we'll send you a reset link.
              </p>

              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      color: 'var(--muted)',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Email address
                  </label>
                  <input
                    type='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${focused ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                      color: 'var(--text)',
                      fontSize: 14,
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      boxShadow: focused ? '0 0 0 3px var(--accent-glow)' : 'none',
                    }}
                  />
                </div>
                <button
                  type='submit'
                  disabled={loading}
                  style={{
                    marginTop: 4,
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
                      Sending…
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  margin: '0 auto 20px',
                  background: 'oklch(82% 0.22 145 / 0.15)',
                  border: '1px solid oklch(82% 0.22 145 / 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                }}
              >
                ✉️
              </div>
              <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 24, marginBottom: 10 }}>
                Check your inbox
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
                We sent a reset link to
              </p>
              <p
                style={{ color: 'var(--accent2)', fontWeight: 600, fontSize: 15, marginBottom: 28 }}
              >
                {email}
              </p>
              <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.6 }}>
                Didn't get it? Check spam or{' '}
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault()
                    setSent(false)
                  }}
                  style={{ color: 'var(--accent)', textDecoration: 'none' }}
                >
                  try again
                </a>
                .
              </p>
            </div>
          )}

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault()
                onBack()
              }}
              style={{ color: 'var(--muted)', fontSize: 13, textDecoration: 'none' }}
            >
              ← Back to sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
