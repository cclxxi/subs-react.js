import type { Subscription } from '../data'
import { CAT_COLORS, fmt } from '../data'

interface Props {
  subs: Subscription[]
}

export default function DonutChart({ subs }: Props) {
  const active = subs.filter((s) => s.active)
  const total = active.reduce((a, s) => a + s.price, 0)

  const cats: Record<string, number> = {}
  active.forEach((s) => {
    cats[s.category] = (cats[s.category] || 0) + s.price
  })

  const r = 70,
    cx = 90,
    cy = 90,
    strokeW = 22
  const circumference = 2 * Math.PI * r
  let offset = 0

  const slices = Object.entries(cats).map(([cat, val]) => {
    const dash = (val / total) * circumference
    const gap = circumference - dash
    const slice = { cat, val, dash, gap, offset, color: CAT_COLORS[cat] || 'oklch(70% 0.2 320)' }
    offset += dash
    return slice
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
      <svg width='180' height='180' style={{ flexShrink: 0 }}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill='none'
          stroke='rgba(255,255,255,0.05)'
          strokeWidth={strokeW}
        />
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill='none'
            stroke={s.color}
            strokeWidth={strokeW}
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={-(s.offset - circumference / 4)}
            style={{ transition: 'all 0.5s ease', filter: `drop-shadow(0 0 6px ${s.color}60)` }}
          />
        ))}
        <text
          x={cx}
          y={cy - 6}
          textAnchor='middle'
          fill='white'
          fontSize='22'
          fontWeight='700'
          fontFamily='Syne'
        >
          {fmt(total)}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor='middle'
          fill='rgba(255,255,255,0.4)'
          fontSize='10'
          fontFamily='DM Sans'
        >
          per month
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: s.color,
                boxShadow: `0 0 6px ${s.color}`,
                flexShrink: 0,
              }}
            />
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>{s.cat}</span>
            <span
              style={{ color: 'var(--text)', fontSize: 12, marginLeft: 'auto', paddingLeft: 16 }}
            >
              {fmt(s.val)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
