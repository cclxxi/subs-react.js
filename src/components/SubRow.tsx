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

export default function SubRow({ sub, cards, onToggle, onDelete }: Props) {
  const [hovered, setHovered] = useState(false)
  const urgency = sub.next <= 3 ? '#ff6b6b' : sub.next <= 7 ? 'oklch(76% 0.22 55)' : 'var(--muted)'
  const card = cards.find((c) => c.id === sub.cardId) || null

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr 140px 80px 60px 64px',
        alignItems: 'center',
        padding: '10px 16px',
        borderRadius: 10,
        background: hovered ? 'rgba(255,255,255,0.05)' : 'transparent',
        transition: 'background 0.15s',
        opacity: sub.active ? 1 : 0.4,
        cursor: 'default',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: sub.color + '22',
          border: `1px solid ${sub.color}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 9,
          fontWeight: 700,
          color: sub.color,
          fontFamily: 'Syne',
          flexShrink: 0,
        }}
      >
        {sub.icon}
      </div>

      {/* Name + category */}
      <div style={{ paddingRight: 12, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
            fontFamily: 'Syne',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {sub.name}
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 11 }}>{sub.category}</div>
      </div>

      {/* Card pill */}
      <div>
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
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
              ···· {card.last4}
            </span>
          </div>
        ) : (
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)' }}>—</span>
        )}
      </div>

      {/* Price */}
      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
          fontFamily: 'Syne',
          textAlign: 'right',
          paddingRight: 12,
        }}
      >
        {fmt(sub.price, sub.currency)}
      </div>

      {/* Days */}
      <div style={{ textAlign: 'right', paddingRight: 12 }}>
        <span style={{ fontSize: 11, color: urgency, fontWeight: 500 }}>{sub.next}d</span>
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          justifyContent: 'flex-end',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.15s',
          pointerEvents: hovered ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => onToggle(sub.id)}
          title={sub.active ? 'Pause' : 'Resume'}
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.08)',
            color: 'var(--muted)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLElement).style.background = 'rgba(255,255,255,0.16)'
            ;(e.target as HTMLElement).style.color = 'white'
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLElement).style.background = 'rgba(255,255,255,0.08)'
            ;(e.target as HTMLElement).style.color = 'var(--muted)'
          }}
        >
          {sub.active ? '⏸' : '▶'}
        </button>
        <button
          onClick={() => onDelete(sub.id)}
          title='Remove'
          style={{
            width: 26,
            height: 26,
            borderRadius: 7,
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,60,60,0.1)',
            color: '#ff7070',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLElement).style.background = 'rgba(255,60,60,0.25)'
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLElement).style.background = 'rgba(255,60,60,0.1)'
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
