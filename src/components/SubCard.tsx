import { useState } from 'react'

import type { Card, Subscription } from '../data'
import { fmt } from '../data'
import CardNetworkBadge from './CardNetworkBadge'

interface Props {
  sub: Subscription
  cards: Card[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function SubCard({ sub, cards, onToggle, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const urgency = sub.next <= 3 ? '#ff6b6b' : sub.next <= 7 ? 'oklch(76% 0.22 55)' : 'var(--muted)'
  const card = cards.find((c) => c.id === sub.cardId) || null

  return (
    <div
      style={{
        borderRadius: 12,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        opacity: sub.active ? 1 : 0.5,
        overflow: 'hidden',
      }}
    >
      {/* Main row */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px',
          cursor: 'pointer',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            flexShrink: 0,
            background: sub.color + '22',
            border: `1px solid ${sub.color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 700,
            color: sub.color,
            fontFamily: 'Syne',
          }}
        >
          {sub.icon}
        </div>

        {/* Name + category */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              fontFamily: 'Syne',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {sub.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{sub.category}</div>
        </div>

        {/* Price + renewal */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'Syne' }}>
            {fmt(sub.price, sub.currency)}
          </div>
          <div style={{ fontSize: 11, color: urgency, fontWeight: 500 }}>{sub.next}d</div>
        </div>

        {/* Chevron */}
        <div
          style={{
            color: 'var(--muted)',
            fontSize: 12,
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        >
          ▾
        </div>
      </div>

      {/* Expanded actions */}
      {open && (
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          {card ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '3px 9px',
                borderRadius: 99,
                background: card.color + '1a',
                border: `1px solid ${card.color}33`,
              }}
            >
              <CardNetworkBadge type={card.type} size={8} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
                ···· {card.last4}
              </span>
            </div>
          ) : (
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>No card</span>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onToggle(sub.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--muted)',
              }}
            >
              {sub.active ? '⏸ Pause' : '▶ Resume'}
            </button>
            <button
              onClick={() => onDelete(sub.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                background: 'rgba(255,60,60,0.12)',
                color: '#ff7070',
              }}
            >
              ✕ Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
