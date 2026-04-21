'use client'

import { useState, useEffect } from 'react'

type Breakpoint = 'mobile' | 'tablet' | 'desktop'

interface BreakpointState {
  breakpoint: Breakpoint
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTabletOrDesktop: boolean
}

export function useBreakpoint(): BreakpointState {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('mobile')

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1024) setBreakpoint('desktop')
      else if (w >= 768) setBreakpoint('tablet')
      else setBreakpoint('mobile')
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    isTabletOrDesktop: breakpoint === 'tablet' || breakpoint === 'desktop',
  }
}
