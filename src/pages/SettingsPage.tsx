import { useState } from 'react'

import type { User } from '../data'
import { useIsMobile } from '../hooks/useIsMobile'

interface Props {
  user: User
  onSave: (u: Partial<User>) => void
}

const AVATAR_COLORS = [
  'linear-gradient(135deg, oklch(66% 0.28 295), oklch(66% 0.28 255))',
  'linear-gradient(135deg, oklch(66% 0.28 145), oklch(66% 0.28 185))',
  'linear-gradient(135deg, oklch(66% 0.28 25),  oklch(66% 0.28 55))',
  'linear-gradient(135deg, oklch(66% 0.28 320), oklch(66% 0.28 350))',
  'linear-gradient(135deg, oklch(66% 0.28 200), oklch(66% 0.28 230))',
  'linear-gradient(135deg, #555, #888)',
]

const inputSt: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text)',
  fontSize: 14,
  outline: 'none',
  transition: 'border-color 0.2s',
}

export default function SettingsPage({ user, onSave }: Props) {
  const isMobile = useIsMobile()
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    avatarColor: user.avatarColor,
  })
  const [saved, setSaved] = useState(false)
  const set = <K extends keyof typeof form>(k: K, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setSaved(false)
  }

  const handleSave = () => {
    onSave(form)
    setSaved(true)
  }

  return (
    <main
      style={{
        flex: 1,
        overflow: 'auto',
        padding: isMobile ? '24px 16px' : 40,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth: 580,
      }}
    >
      <div>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28, marginBottom: 4 }}>
          Settings
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Manage your profile and preferences</p>
      </div>

      {/* Avatar */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--card-border)',
          borderRadius: 16,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Profile photo
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              flexShrink: 0,
              background: form.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 800,
              color: 'white',
              fontFamily: 'Syne',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            {form.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, marginBottom: 10, color: 'var(--muted)' }}>
              Choose a color
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {AVATAR_COLORS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => set('avatarColor', c)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: c,
                    border: 'none',
                    outline: form.avatarColor === c ? '2px solid white' : '2px solid transparent',
                    outlineOffset: 2,
                    cursor: 'pointer',
                    transition: 'outline 0.15s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Name & Email */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--card-border)',
          borderRadius: 16,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Account info
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
            Full name
          </label>
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            style={inputSt}
            onFocus={(e) => {
              ;(e.target as HTMLInputElement).style.borderColor = 'var(--accent)'
            }}
            onBlur={(e) => {
              ;(e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
            Email address
          </label>
          <input
            type='email'
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            style={inputSt}
            onFocus={(e) => {
              ;(e.target as HTMLInputElement).style.borderColor = 'var(--accent)'
            }}
            onBlur={(e) => {
              ;(e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={handleSave}
          style={{
            padding: '12px 28px',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            background: 'var(--accent)',
            color: 'white',
            fontFamily: 'Syne',
            boxShadow: '0 0 20px var(--accent-glow)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.transform = 'none'
          }}
        >
          Save changes
        </button>
        {saved && (
          <span
            style={{
              fontSize: 13,
              color: 'var(--accent2)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              animation: 'fadeIn 0.3s ease',
            }}
          >
            ✓ Saved
          </span>
        )}
      </div>
    </main>
  )
}
