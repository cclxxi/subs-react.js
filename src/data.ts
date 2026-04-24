export type CardType = 'visa' | 'mastercard' | 'amex'

export interface Card {
  id: string
  name: string
  last4: string
  type: CardType
  color: string
}

export interface Subscription {
  id: number
  name: string
  category: string
  color: string
  icon: string
  price: number
  currency: string
  cycle: string
  next: number
  active: boolean
  cardId: string | null
}

export interface User {
  name: string
  email: string
  avatarColor: string
}

export const SAMPLE_CARDS: Card[] = [
  { id: 'card1', name: 'Chase Sapphire', last4: '4832', type: 'visa', color: '#1A56DB' },
  { id: 'card2', name: 'Amex Gold', last4: '7701', type: 'amex', color: '#B07D2A' },
  { id: 'card3', name: 'Apple Card', last4: '2219', type: 'mastercard', color: '#555f6e' },
]

export const SAMPLE_SUBS: Subscription[] = [
  {
    id: 1,
    name: 'Netflix',
    category: 'Entertainment',
    color: '#E50914',
    icon: 'N',
    price: 15.99,
    currency: 'USD',
    cycle: 'monthly',
    next: 3,
    active: true,
    cardId: 'card1',
  },
  {
    id: 2,
    name: 'Spotify',
    category: 'Music',
    color: '#1DB954',
    icon: 'S',
    price: 9.99,
    currency: 'USD',
    cycle: 'monthly',
    next: 7,
    active: true,
    cardId: 'card3',
  },
  {
    id: 3,
    name: 'Adobe CC',
    category: 'Productivity',
    color: '#FF0000',
    icon: 'Ai',
    price: 54.99,
    currency: 'USD',
    cycle: 'monthly',
    next: 14,
    active: true,
    cardId: 'card2',
  },
  {
    id: 4,
    name: 'GitHub Pro',
    category: 'Dev Tools',
    color: '#6e40c9',
    icon: 'GH',
    price: 4.0,
    currency: 'USD',
    cycle: 'monthly',
    next: 21,
    active: true,
    cardId: 'card1',
  },
  {
    id: 5,
    name: 'iCloud+',
    category: 'Storage',
    color: '#0071E3',
    icon: '☁',
    price: 2.99,
    currency: 'USD',
    cycle: 'monthly',
    next: 5,
    active: true,
    cardId: 'card3',
  },
  {
    id: 6,
    name: 'Linear',
    category: 'Dev Tools',
    color: '#5E6AD2',
    icon: 'L',
    price: 8.0,
    currency: 'USD',
    cycle: 'monthly',
    next: 28,
    active: true,
    cardId: 'card1',
  },
  {
    id: 7,
    name: 'NYT Digital',
    category: 'News',
    color: '#000',
    icon: 'NY',
    price: 17.0,
    currency: 'USD',
    cycle: 'monthly',
    next: 10,
    active: true,
    cardId: 'card2',
  },
  {
    id: 8,
    name: 'Notion',
    category: 'Productivity',
    color: '#000',
    icon: 'No',
    price: 16.0,
    currency: 'USD',
    cycle: 'monthly',
    next: 18,
    active: false,
    cardId: null,
  },
]

export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', label: 'Swiss Franc' },
  { code: 'RUB', symbol: '₽', label: 'Russian Ruble' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real' },
]

export const CATEGORIES = [
  'Entertainment',
  'Music',
  'Productivity',
  'Dev Tools',
  'Storage',
  'News',
  'Health',
  'Education',
  'Other',
]

export const CARD_COLORS: Record<string, string> = {
  visa: '#1A56DB',
  amex: '#B07D2A',
  mastercard: '#555f6e',
}

export const CAT_COLORS: Record<string, string> = {
  Entertainment: 'oklch(66% 0.28 295)',
  Music: 'oklch(82% 0.22 145)',
  Productivity: 'oklch(70% 0.22 25)',
  'Dev Tools': 'oklch(72% 0.2 260)',
  Storage: 'oklch(76% 0.18 210)',
  News: 'oklch(74% 0.15 55)',
}

export const fmt = (n: number, currency = 'USD') => {
  const sym = CURRENCIES.find((c) => c.code === currency)?.symbol || '$'
  return `${sym}${n.toFixed(2)}`
}
