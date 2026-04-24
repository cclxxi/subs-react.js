import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import AddModal from '../components/AddModal'
import DonutChart from '../components/DonutChart'
import ManageCardsModal from '../components/ManageCardsModal'
import SubCard from '../components/SubCard'
import SubRow from '../components/SubRow'
import { logout } from '../auth'
import { type Card, SAMPLE_CARDS, SAMPLE_SUBS, type Subscription, type User, fmt } from '../data'
import { useIsMobile } from '../hooks/useIsMobile'
import SettingsPage from './SettingsPage'

export default function Dashboard() {
  const routerNavigate = useNavigate()
  const onLogout = () => { logout(); routerNavigate('/') }
  const [subs, setSubs] = useState<Subscription[]>(SAMPLE_SUBS)
  const [cards, setCards] = useState<Card[]>(SAMPLE_CARDS)
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showCards, setShowCards] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'paused'>('all')
  const [sidebarPage, setSidebarPage] = useState<'dashboard' | 'settings'>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User>({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatarColor: 'linear-gradient(135deg, oklch(66% 0.28 295), oklch(66% 0.28 255))',
  })

  const isMobile = useIsMobile()

  const onAddCard = (card: Card) => setCards((cs) => [...cs, card])
  const onDeleteCard = (id: string) => {
    setCards((cs) => cs.filter((c) => c.id !== id))
    setSubs((ss) => ss.map((s) => (s.cardId === id ? { ...s, cardId: null } : s)))
  }

  const active = subs.filter((s) => s.active)
  const monthly = active.reduce((a, s) => a + s.price, 0)
  const yearly = monthly * 12
  const upcoming = active.filter((s) => s.next <= 7)

  const filtered = subs.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    const matchTab =
      activeTab === 'all' ||
      (activeTab === 'active' && s.active) ||
      (activeTab === 'paused' && !s.active)
    return matchSearch && matchTab
  })

  const onToggle = (id: number) =>
    setSubs((ss) => ss.map((s) => (s.id === id ? { ...s, active: !s.active } : s)))
  const onDelete = (id: number) => setSubs((ss) => ss.filter((s) => s.id !== id))
  const onAdd = (sub: Omit<Subscription, 'id'>) =>
    setSubs((ss) => [...ss, { ...sub, id: Date.now() }])

  const goTo = (page: 'dashboard' | 'settings') => {
    setSidebarPage(page)
    setSidebarOpen(false)
  }

  const sidebar = (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        background: 'var(--bg2)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0',
        height: '100%',
      }}
    >
      <div
        style={{
          padding: '0 20px 24px',
          fontFamily: 'Syne',
          fontWeight: 800,
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>
          <span style={{ color: 'var(--accent)' }}>sub</span>track
        </span>
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            style={{ background: 'none', color: 'var(--muted)', fontSize: 20, lineHeight: 1 }}
          >
            ✕
          </button>
        )}
      </div>

      <div style={{ padding: '0 16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            flexShrink: 0,
            background: user.avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            color: 'white',
          }}
        >
          {user.name.charAt(0)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user.email}
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '0 16px 16px' }} />

      {(
        [
          { icon: '⊞', label: 'Dashboard', page: 'dashboard' },
          { icon: '◎', label: 'Settings', page: 'settings' },
        ] as const
      ).map((item) => (
        <button
          key={item.label}
          onClick={() => goTo(item.page)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 20px',
            background: sidebarPage === item.page ? 'rgba(255,255,255,0.07)' : 'none',
            borderLeft:
              sidebarPage === item.page ? '2px solid var(--accent)' : '2px solid transparent',
            color: sidebarPage === item.page ? 'white' : 'var(--muted)',
            fontSize: 14,
            fontWeight: sidebarPage === item.page ? 500 : 400,
            transition: 'all 0.15s',
            textAlign: 'left',
          }}
        >
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      <div style={{ padding: '16px 16px 0', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 10,
            fontSize: 13,
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--muted)',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>↩</span> Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Desktop sidebar */}
      {!isMobile && sidebar}

      {/* Mobile sidebar drawer */}
      {isMobile && sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 200,
              backdropFilter: 'blur(4px)',
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: 260,
              zIndex: 201,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {sidebar}
          </div>
        </>
      )}

      {sidebarPage === 'settings' ? (
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {isMobile && (
            <div
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg2)',
              }}
            >
              <button
                onClick={() => setSidebarOpen(true)}
                style={{ background: 'none', color: 'var(--muted)', fontSize: 20 }}
              >
                ☰
              </button>
              <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 16 }}>Settings</span>
            </div>
          )}
          <SettingsPage user={user} onSave={(u) => setUser((prev) => ({ ...prev, ...u }))} />
        </div>
      ) : (
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: isMobile ? 16 : 32,
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 16 : 24,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  style={{
                    background: 'none',
                    color: 'var(--muted)',
                    fontSize: 22,
                    lineHeight: 1,
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  ☰
                </button>
              )}
              <div>
                <h1
                  style={{
                    fontFamily: 'Syne',
                    fontWeight: 800,
                    fontSize: isMobile ? 22 : 28,
                    marginBottom: 2,
                  }}
                >
                  Dashboard
                </h1>
                {!isMobile && (
                  <p style={{ color: 'var(--muted)', fontSize: 14 }}>
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowCards(true)}
                style={{
                  padding: isMobile ? '9px 14px' : '12px 20px',
                  borderRadius: 12,
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: 500,
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                }}
              >
                💳 {!isMobile && 'My Cards '}({cards.length})
              </button>
              <button
                onClick={() => setShowAdd(true)}
                style={{
                  padding: isMobile ? '9px 14px' : '12px 24px',
                  borderRadius: 12,
                  fontSize: isMobile ? 13 : 14,
                  fontWeight: 600,
                  background: 'var(--accent)',
                  color: 'white',
                  fontFamily: 'Syne',
                  boxShadow: '0 0 20px var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                }}
              >
                + {isMobile ? 'Add' : 'Add subscription'}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(180px,1fr))',
              gap: isMobile ? 10 : 16,
            }}
          >
            {[
              {
                label: 'Monthly spend',
                value: fmt(monthly),
                sub: `${fmt(yearly)} / year`,
                color: 'var(--accent2)',
                glow: 'var(--accent2-glow)',
              },
              {
                label: 'Active subs',
                value: String(active.length),
                sub: `${subs.length - active.length} paused`,
                color: 'var(--accent)',
                glow: 'var(--accent-glow)',
              },
              {
                label: 'Due this week',
                value: String(upcoming.length),
                sub: upcoming.map((s) => s.name).join(', ') || 'Nothing upcoming',
                color: 'oklch(76% 0.22 55)',
                glow: 'oklch(76% 0.22 55 / 0.2)',
              },
              {
                label: 'Avg per service',
                value: fmt(active.length ? monthly / active.length : 0),
                sub: 'across all subs',
                color: 'oklch(72% 0.2 260)',
                glow: 'oklch(72% 0.2 260 / 0.2)',
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 14,
                  padding: isMobile ? '14px' : '20px',
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${s.glow}, transparent)`,
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>
                  {s.label}
                </div>
                <div
                  style={{
                    fontFamily: 'Syne',
                    fontWeight: 800,
                    fontSize: isMobile ? 20 : 28,
                    color: s.color,
                    marginBottom: 2,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: 'var(--muted)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Charts + upcoming */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 12 : 16,
            }}
          >
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  marginBottom: 16,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Spending by category
              </div>
              <DonutChart subs={subs} />
            </div>
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  marginBottom: 16,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Upcoming renewals
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[...active]
                  .sort((a, b) => a.next - b.next)
                  .slice(0, 5)
                  .map((s) => {
                    const urgency =
                      s.next <= 3
                        ? 'var(--accent)'
                        : s.next <= 7
                          ? 'oklch(76% 0.22 55)'
                          : 'var(--accent2)'
                    return (
                      <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: s.color + '22',
                            border: `1px solid ${s.color}44`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 9,
                            fontWeight: 700,
                            color: s.color,
                            fontFamily: 'Syne',
                            flexShrink: 0,
                          }}
                        >
                          {s.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {s.name}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                            {fmt(s.price, s.currency)}/mo
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: 12, color: urgency, fontWeight: 600 }}>
                            {s.next === 0 ? 'Today' : s.next === 1 ? 'Tomorrow' : `${s.next}d`}
                          </div>
                          <div style={{ fontSize: 10, color: 'var(--muted)' }}>renewal</div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>

          {/* Subscription list */}
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--card-border)',
              borderRadius: 16,
              padding: isMobile ? 16 : 22,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 14,
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                All subscriptions
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                  placeholder='Search…'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 8,
                    fontSize: 13,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    outline: 'none',
                    width: isMobile ? 130 : 160,
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                  }}
                >
                  {(['all', 'active', 'paused'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      style={{
                        padding: '7px 10px',
                        fontSize: isMobile ? 11 : 12,
                        background: activeTab === t ? 'rgba(255,255,255,0.1)' : 'none',
                        color: activeTab === t ? 'white' : 'var(--muted)',
                        transition: 'all 0.15s',
                      }}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isMobile ? (
              /* Mobile: card list */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {filtered.map((s) => (
                  <SubCard
                    key={s.id}
                    sub={s}
                    cards={cards}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: 32, textAlign: 'center', color: 'var(--muted)' }}>
                    No subscriptions found
                  </div>
                )}
              </div>
            ) : (
              /* Desktop: table layout */
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 140px 80px 60px 64px',
                    padding: '0 16px 8px',
                    borderBottom: '1px solid var(--border)',
                    marginBottom: 4,
                  }}
                >
                  {['', 'Service', 'Card', 'Price', 'Renews', ''].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 10,
                        color: 'var(--muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        textAlign: i >= 3 ? 'right' : 'left',
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>
                {filtered.map((s) => (
                  <SubRow
                    key={s.id}
                    sub={s}
                    cards={cards}
                    onToggle={onToggle}
                    onDelete={onDelete}
                  />
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
                    No subscriptions found
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      )}

      {showAdd && <AddModal onAdd={onAdd} onClose={() => setShowAdd(false)} cards={cards} />}
      {showCards && (
        <ManageCardsModal
          cards={cards}
          onAdd={onAddCard}
          onDelete={onDeleteCard}
          onClose={() => setShowCards(false)}
        />
      )}
    </div>
  )
}
