import { useState } from 'react'

import type { Card, Subscription } from '../data'
import { CATEGORIES, CURRENCIES } from '../data'
import CardNetworkBadge from './CardNetworkBadge'

interface Props {
  cards: Card[]
  onAdd: (sub: Omit<Subscription, 'id'>) => void
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

export default function AddModal({ cards, onAdd, onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    category: 'Entertainment',
    price: '',
    currency: 'USD',
    cycle: 'monthly',
    color: '#6e40c9',
    cardId: cards[0]?.id ?? (null as string | null),
  })
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price) return
    onAdd({
      ...form,
      price: parseFloat(form.price),
      next: Math.floor(Math.random() * 28) + 1,
      active: true,
      icon: form.name.slice(0, 2).toUpperCase(),
    })
    onClose()
  }

  const currencySymbol = CURRENCIES.find((c) => c.code === form.currency)?.symbol || '$'

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
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          background: '#0e0f1e',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          padding: 28,
          width: '100%',
          maxWidth: 400,
          margin: '0 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h3 style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 700 }}>Add Subscription</h3>

        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
            Service name
          </label>
          <input
            type='text'
            placeholder='e.g. Figma'
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            style={inputSt}
          />
        </div>

        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
            Price &amp; currency
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 8 }}>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--muted)',
                  fontSize: 14,
                  pointerEvents: 'none',
                }}
              >
                {currencySymbol}
              </span>
              <input
                type='number'
                placeholder='0.00'
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                style={{ ...inputSt, paddingLeft: 26 }}
              />
            </div>
            <select
              value={form.currency}
              onChange={(e) => set('currency', e.target.value)}
              style={inputSt}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            style={inputSt}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
            Pay with
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {cards.map((card) => {
              const selected = form.cardId === card.id
              return (
                <label
                  key={card.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    background: selected ? card.color + '28' : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${selected ? card.color : 'rgba(255,255,255,0.08)'}`,
                    transition: 'all 0.15s',
                    boxShadow: selected ? `0 0 12px ${card.color}33` : 'none',
                  }}
                >
                  <input
                    type='radio'
                    name='cardId'
                    value={card.id}
                    checked={selected}
                    onChange={() => set('cardId', card.id)}
                    style={{ display: 'none' }}
                  />
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      flexShrink: 0,
                      border: `2px solid ${selected ? card.color : 'rgba(255,255,255,0.2)'}`,
                      background: selected ? card.color : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    {selected && (
                      <div
                        style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: selected ? 600 : 500,
                        color: selected ? 'white' : 'var(--text)',
                      }}
                    >
                      {card.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <CardNetworkBadge type={card.type} size={8} />
                      <span>···· {card.last4}</span>
                    </div>
                  </div>
                  {selected && (
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        flexShrink: 0,
                        background: card.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        color: 'white',
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </div>
                  )}
                </label>
              )
            })}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 10,
                cursor: 'pointer',
                background:
                  form.cardId === null ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                border: `2px solid ${form.cardId === null ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                transition: 'all 0.15s',
              }}
            >
              <input
                type='radio'
                name='cardId'
                value=''
                checked={form.cardId === null}
                onChange={() => set('cardId', null)}
                style={{ display: 'none' }}
              />
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  flexShrink: 0,
                  border: `2px solid ${form.cardId === null ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}`,
                  background: form.cardId === null ? 'rgba(255,255,255,0.15)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {form.cardId === null && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'white' }} />
                )}
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: form.cardId === null ? 'white' : 'var(--muted)',
                  fontWeight: form.cardId === null ? 500 : 400,
                }}
              >
                No card assigned
              </span>
              {form.cardId === null && (
                <div style={{ marginLeft: 'auto', fontSize: 10, color: 'white', fontWeight: 700 }}>
                  ✓
                </div>
              )}
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <button
            type='button'
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 10,
              fontSize: 14,
              background: 'rgba(255,255,255,0.06)',
              color: 'var(--muted)',
            }}
          >
            Cancel
          </button>
          <button
            type='submit'
            style={{
              flex: 2,
              padding: '12px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              background: 'var(--accent)',
              color: 'white',
              fontFamily: 'Syne',
              boxShadow: '0 0 20px var(--accent-glow)',
            }}
          >
            Add Subscription
          </button>
        </div>
      </form>
    </div>
  )
}
