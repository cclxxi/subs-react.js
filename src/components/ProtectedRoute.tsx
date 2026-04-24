import type { ReactNode } from 'react'

import { Navigate } from 'react-router-dom'

import { isAuthed } from '../auth'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthed() ? <>{children}</> : <Navigate to='/login' replace />
}
