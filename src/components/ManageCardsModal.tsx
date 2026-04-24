import { useState } from 'react'

import type { Card, CardType } from '../data'
import { CARD_COLORS } from '../data'
import CardNetworkBadge from './CardNetworkBadge'

interface Props {
  cards: Card[]
  onAdd: (card: Card) => void
  onDelete: (id: string) => void
  onClose: () => void
}

const inputSt: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 10,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text)',
  fontSize: 14,
  outline: 'none',
}

export default function ManageCardsModal({ cards, onAdd, onDelete, onClose }: Props) {
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', last4: '', type: 'visa' as CardType })
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }))

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || form.last4.length !== 4) return
    onAdd({
      id: 'card' + Date.now(),
      name: form.name,
      last4: form.last4,
      type: form.type,
      color: CARD_COLORS[form.type],
    })
    setForm({ name: '', last4: '', type: 'visa' })
    setAdding(false)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0e0f1e',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: 28,
          width: '100%',
          maxWidth: 440,
          margin: '0 16px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700 }}>Payment Cards</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', color: 'var(--muted)', fontSize: 18 }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 12,
                background: card.color + '15',
                border: `1px solid ${card.color}33`,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 34,
                  borderRadius: 6,
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${card.color}cc, ${card.color}66)`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '5px 7px',
                  boxShadow: `0 4px 12px ${card.color}44`,
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 11,
                    borderRadius: 2,
                    background: 'rgba(255,255,255,0.4)',
                  }}
                />
                <div
                  style={{
                    fontSize: 6,
                    fontFamily: 'monospace',
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: '0.5px',
                  }}
                >
                  ···· {card.last4}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Syne' }}>{card.name}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    marginTop: 2,
                  }}
                >
                  <CardNetworkBadge type={card.type} size={9} />
                  <span style={{ textTransform: 'capitalize' }}>
                    {card.type} ···· {card.last4}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDelete(card.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 7,
                  fontSize: 11,
                  background: 'rgba(255,60,60,0.1)',
                  color: '#ff7070',
                  flexShrink: 0,
                }}
              >
                Remove
              </button>
            </div>
          ))}
          {cards.length === 0 && (
            <div style={{ textAlign: 'center', padding: 24, color: 'var(--muted)', fontSize: 14 }}>
              No cards yet
            </div>
          )}
        </div>

        {adding ? (
          <form
            onSubmit={handleAdd}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              padding: 16,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Syne', marginBottom: 2 }}>
              New card
            </div>
            <div>
              <label
                style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}
              >
                Card nickname
              </label>
              <input
                placeholder='e.g. Chase Sapphire'
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                style={inputSt}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label
                  style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}
                >
                  Last 4 digits
                </label>
                <input
                  placeholder='1234'
                  maxLength={4}
                  value={form.last4}
                  onChange={(e) => set('last4', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  style={{ ...inputSt, letterSpacing: '0.2em', fontFamily: 'monospace' }}
                />
              </div>
              <div>
                <label
                  style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}
                >
                  Network
                </label>
                <select
                  value={form.type}
                  onChange={(e) => set('type', e.target.value as CardType)}
                  style={inputSt}
                >
                  <option value='visa'>Visa</option>
                  <option value='mastercard'>Mastercard</option>
                  <option value='amex'>Amex</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type='button'
                onClick={() => setAdding(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  fontSize: 13,
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--muted)',
                }}
              >
                Cancel
              </button>
              <button
                type='submit'
                style={{
                  flex: 2,
                  padding: '10px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  background: 'var(--accent)',
                  color: 'white',
                  fontFamily: 'Syne',
                }}
              >
                Save card
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setAdding(true)}
            style={{
              padding: '12px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--muted)',
              border: '1px dashed rgba(255,255,255,0.15)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'
              ;(e.currentTarget as HTMLElement).style.color = 'white'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--muted)'
            }}
          >
            + Add new card
          </button>
        )}
      </div>
    </div>
  )
}
