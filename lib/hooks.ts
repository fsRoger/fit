'use client'

import { useState, useCallback, useEffect } from 'react'

export function useLocalState<T>(key: string, initial: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initial)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        setState(JSON.parse(stored))
      }
    } catch {}
    setHydrated(true)
  }, [key])

  const set = useCallback((val: T | ((prev: T) => T)) => {
    setState((prev) => {
      const next = typeof val === 'function' ? (val as (prev: T) => T)(prev) : val
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [key])

  return [state, set]
}

export function today(): string {
  return new Date().toISOString().split('T')[0]
}

export function fmtDate(d: string): string {
  const [, m, day] = d.split('-')
  return `${day}/${m}`
}
