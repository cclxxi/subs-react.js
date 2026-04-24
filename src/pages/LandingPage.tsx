import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { SAMPLE_SUBS, fmt } from '../data'
import { useIsMobile } from '../hooks/useIsMobile'

const FEATURES = [
  {
    icon: '◎',
    title: 'Know exactly what you pay',
    body: 'See every subscription in one view. No more mystery charges, no more forgotten trials.',
  },
  {
    icon: '⊙',
    title: 'Renewal alerts',
    body: 'Get notified before charges hit. Cancel, downgrade, or keep — your choice, your timing.',
  },
  {
    icon: '◈',
    title: 'Spending insights',
    body: "Track trends over time. Visualize categories. Spot what you're over-paying for.",
  },
]

const LOGOS = ['Netflix', 'Spotify', 'Adobe', 'GitHub', 'Notion', 'Figma', 'Linear', 'Slack']

export default function LandingPage() {
  const navigate = useNavigate()
  const onLogin = () => navigate('/login')
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const isMobile = useIsMobile()
  const px = isMobile ? '20px' : '48px'

  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Animated background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%, oklch(66% 0.28 295 / 0.12) 0%, transparent 70%)`,
          transition: 'background 0.3s ease',
        }}
      />
      <div
        style={{
          position: 'fixed',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(82% 0.22 145 / 0.06) 0%, transparent 70%)',
          top: -100,
          right: -100,
          pointerEvents: 'none',
        }}
      />

      {/* NAV */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `14px ${px}`,
          background: 'rgba(7,8,16,0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: 'Syne',
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: '-0.5px',
            flexShrink: 0,
          }}
        >
          <span style={{ color: 'var(--accent)' }}>sub</span>track
        </div>

        {!isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 14px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: 12,
              color: 'var(--accent2)',
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--accent2)',
                display: 'inline-block',
                boxShadow: '0 0 6px var(--accent2)',
              }}
            />
            Free forever — no credit card required
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {!isMobile && (
            <button
              onClick={onLogin}
              style={{
                padding: '9px 22px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
              }}
            >
              Sign in
            </button>
          )}
          <button
            onClick={onLogin}
            style={{
              padding: isMobile ? '8px 16px' : '9px 22px',
              borderRadius: 10,
              fontSize: isMobile ? 13 : 14,
              fontWeight: 600,
              background: 'var(--accent)',
              color: 'white',
              fontFamily: 'Syne',
              boxShadow: '0 0 20px var(--accent-glow)',
              transition: 'all 0.2s',
            }}
          >
            {isMobile ? 'Get started' : 'Get started'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '64px 20px 60px' : '120px 48px 100px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <h1
          className='fade-up'
          style={{
            fontFamily: 'Syne',
            fontWeight: 800,
            fontSize: 'clamp(36px, 8vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            maxWidth: 900,
            marginBottom: 20,
            background: 'linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Stop losing money
          <br />
          to forgotten subs
        </h1>

        <p
          className='fade-up-2'
          style={{
            color: 'var(--muted)',
            fontSize: isMobile ? 16 : 19,
            maxWidth: 520,
            marginBottom: isMobile ? 32 : 44,
            lineHeight: 1.7,
            padding: `0 ${isMobile ? '4px' : '0'}`,
          }}
        >
          One dashboard. Every subscription. Total clarity over what you spend — and what you can
          cut.
        </p>

        <div
          className='fade-up-2'
          style={{
            display: 'flex',
            gap: 14,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: isMobile ? 48 : 72,
          }}
        >
          <button
            onClick={onLogin}
            style={{
              padding: isMobile ? '14px 28px' : '16px 36px',
              borderRadius: 12,
              fontSize: isMobile ? 15 : 16,
              fontWeight: 700,
              background: 'var(--accent)',
              color: 'white',
              fontFamily: 'Syne',
              boxShadow: '0 0 40px var(--accent-glow)',
              transition: 'all 0.2s',
              width: isMobile ? '100%' : undefined,
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.transform = 'none'
            }}
          >
            Open your dashboard →
          </button>
        </div>

        {/* Mock dashboard preview */}
        <div
          className='fade-up-4'
          style={{
            width: '100%',
            maxWidth: 860,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: isMobile ? 16 : 24,
            boxShadow: '0 80px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -40,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, oklch(66% 0.28 295 / 0.15), transparent)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: isMobile ? 8 : 12,
              marginBottom: isMobile ? 10 : 16,
            }}
          >
            {[
              { l: 'Monthly Total', v: '$129.95', c: 'var(--accent2)' },
              { l: 'Active Subs', v: '7', c: 'var(--accent)' },
              { l: 'Due This Week', v: '2', c: 'oklch(76% 0.22 55)' },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 10,
                  padding: isMobile ? '10px 12px' : '14px 16px',
                  border: '1px solid var(--card-border)',
                }}
              >
                <div
                  style={{ fontSize: isMobile ? 9 : 10, color: 'var(--muted)', marginBottom: 4 }}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 16 : 22,
                    fontWeight: 700,
                    fontFamily: 'Syne',
                    color: s.c,
                  }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 8 : 12,
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 10,
                padding: 14,
                border: '1px solid var(--card-border)',
              }}
            >
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 10 }}>
                Subscriptions
              </div>
              {SAMPLE_SUBS.slice(0, isMobile ? 3 : 4).map((s) => (
                <div
                  key={s.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: s.color + '22',
                      border: `1px solid ${s.color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 7,
                      fontWeight: 700,
                      color: s.color,
                      fontFamily: 'Syne',
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </div>
                  <span style={{ fontSize: 11, flex: 1, textAlign: 'left' }}>{s.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {fmt(s.price, s.currency)}
                  </span>
                </div>
              ))}
            </div>
            {!isMobile && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 10,
                  padding: 14,
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 4 }}>
                  By Category
                </div>
                {[
                  ['Entertainment', 42],
                  ['Productivity', 32],
                  ['Dev Tools', 16],
                  ['Music', 10],
                ].map(([l, p]) => (
                  <div key={l}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 10,
                        marginBottom: 2,
                      }}
                    >
                      <span style={{ color: 'var(--muted)' }}>{l}</span>
                      <span>{p}%</span>
                    </div>
                    <div
                      style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.07)' }}
                    >
                      <div
                        style={{
                          width: `${p}%`,
                          height: '100%',
                          borderRadius: 99,
                          background: 'var(--accent)',
                          opacity: 0.7,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <div style={{ padding: `0 ${px} 60px`, textAlign: 'center' }}>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: 12,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Track all your favorite services
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {LOGOS.map((l) => (
            <div
              key={l}
              style={{
                padding: '7px 16px',
                borderRadius: 99,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                fontSize: 12,
                color: 'var(--muted)',
                fontWeight: 500,
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section
        style={{ padding: `40px ${px} 80px`, maxWidth: 1100, margin: '0 auto', width: '100%' }}
      >
        <h2
          style={{
            fontFamily: 'Syne',
            fontSize: isMobile ? 28 : 42,
            fontWeight: 800,
            letterSpacing: '-1px',
            marginBottom: isMobile ? 32 : 56,
            textAlign: 'center',
          }}
        >
          Everything you need,
          <br />
          <span style={{ color: 'var(--accent)' }}>nothing you don't</span>
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px,1fr))',
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <div
              key={i}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                borderRadius: 20,
                padding: '24px',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)'
                ;(e.currentTarget as HTMLElement).style.background = 'var(--card)'
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 14, color: 'var(--accent)' }}>{f.icon}</div>
              <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                {f.title}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: `40px ${px} 80px`, textAlign: 'center' }}>
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(110,64,201,0.15), rgba(29,185,84,0.1))',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24,
            padding: isMobile ? '40px 24px' : '60px 48px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Syne',
              fontWeight: 800,
              fontSize: isMobile ? 28 : 38,
              marginBottom: 14,
              letterSpacing: '-1px',
            }}
          >
            Take back control
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: isMobile ? 15 : 16,
              marginBottom: 28,
              lineHeight: 1.7,
            }}
          >
            Join thousands who've cut their subscription spend by an average of $47/month.
          </p>
          <button
            onClick={onLogin}
            style={{
              padding: isMobile ? '14px 28px' : '16px 44px',
              borderRadius: 12,
              fontSize: isMobile ? 15 : 16,
              fontWeight: 700,
              background: 'var(--accent)',
              color: 'white',
              fontFamily: 'Syne',
              boxShadow: '0 0 40px var(--accent-glow)',
              transition: 'all 0.2s',
              width: isMobile ? '100%' : undefined,
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.transform = 'none'
            }}
          >
            Get started free →
          </button>
        </div>
      </section>
    </div>
  )
}
