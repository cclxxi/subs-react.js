import type { CardType } from '../data'

interface Props {
  type: CardType
  size?: number
}

export default function CardNetworkBadge({ type, size = 14 }: Props) {
  if (type === 'visa') {
    return (
      <svg width={size * 2.6} height={size} viewBox='0 0 46 16' fill='none'>
        <text
          x='1'
          y='13'
          fontFamily='serif'
          fontWeight='900'
          fontStyle='italic'
          fontSize='14'
          fill='white'
          letterSpacing='1'
        >
          VISA
        </text>
      </svg>
    )
  }
  if (type === 'amex') {
    return (
      <svg width={size * 2.6} height={size} viewBox='0 0 46 16' fill='none'>
        <rect x='0' y='1' width='44' height='14' rx='3' fill='#2557D6' />
        <text
          x='22'
          y='12'
          fontFamily='Syne,sans-serif'
          fontWeight='800'
          fontSize='9'
          fill='white'
          textAnchor='middle'
          letterSpacing='0.8'
        >
          AMEX
        </text>
      </svg>
    )
  }
  return (
    <svg width={size * 1.8} height={size} viewBox='0 0 30 18'>
      <circle cx='10' cy='9' r='9' fill='#EB001B' />
      <circle cx='20' cy='9' r='9' fill='#F79E1B' />
      <path d='M15 3.27a9 9 0 0 1 0 11.46A9 9 0 0 1 15 3.27z' fill='#FF5F00' />
    </svg>
  )
}
