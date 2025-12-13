"use client"

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { VKBouwmasterLogo } from '@/components/ui/logo'
import { useTranslations } from '@/hooks/useTranslations'
import { GradientButton } from '@/components/ui/gradient-button'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pagesScrollRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const rightControlsRef = useRef<HTMLDivElement>(null)
  const [maxNavWidth, setMaxNavWidth] = useState<number>(0)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState<string>('80px')
  const langMenuRef = useRef<HTMLDivElement>(null)
  
  const { t, isInitialized, currentLanguage, changeLanguage } = useTranslations()
  const languages = ['RU','UA','EN','NL','DE','FR','ES','IT','PT','PL','CZ','HU','RO','BG','HR','SK','SL','ET','LV','LT','FI','SV','DA','NO','GR'] as const
  const flagByLang: Record<string, string> = {
    RU: '🇷🇺', EN: '🇬🇧', NL: '🇳🇱', DE: '🇩🇪', FR: '🇫🇷', ES: '🇪🇸', IT: '🇮🇹', PT: '🇵🇹', PL: '🇵🇱', CZ: '🇨🇿', BG: '🇧🇬', RO: '🇷🇴', HU: '🇭🇺', UA: '🇺🇦', FI: '🇫🇮', SV: '🇸🇪', DA: '🇩🇰', NO: '🇳🇴', GR: '🇬🇷', HR: '🇭🇷', SK: '🇸🇰', SL: '🇸🇮', ET: '🇪🇪', LV: '🇱🇻', LT: '🇱🇹'
  }
  useEffect(() => {
    if (pagesScrollRef.current) {
      pagesScrollRef.current.scrollLeft = 0
    }
    const measure = () => {
      if (typeof window === 'undefined') return
      if (!headerRef.current || !logoRef.current || !rightControlsRef.current) return
      
      const logoRect = logoRef.current.getBoundingClientRect()
      const rightControlsRect = rightControlsRef.current.getBoundingClientRect()
      
      const headerWidth = window.innerWidth // используем ширину окна вместо headerRect для точности
      const logoWidth = logoRect.width
      const rightControlsWidth = rightControlsRect.width
      
      let padding = 16 // px-2 = 8px * 2
      if (window.innerWidth >= 640) padding = 32 // sm:px-4 = 16px * 2
      if (window.innerWidth >= 1024) padding = 48 // lg:px-6 = 24px * 2
      if (window.innerWidth >= 1280) padding = 64 // xl:px-8 = 32px * 2
      
      const scrollButtonsWidth = window.innerWidth >= 1280 ? 48 : 0 // кнопки скролла появляются на xl
      
      const safeMargin = 20
      const availableWidth = headerWidth - logoWidth - rightControlsWidth - padding - scrollButtonsWidth - safeMargin
      
      setMaxNavWidth(Math.max(200, availableWidth))
    }
    
    const updateHeaderHeight = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setHeaderHeight('64px')
        } else if (window.innerWidth < 1024) {
          setHeaderHeight('72px')
        } else {
          setHeaderHeight('96px')
        }
      }
    }
    
    const timeoutId = setTimeout(() => {
      measure()
      updateHeaderHeight()
    }, 0)
    
    window.addEventListener('resize', () => {
      measure()
      updateHeaderHeight()
    })
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', measure)
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [isInitialized])

  useEffect(() => {
    if (!isInitialized) return
    const timeoutId = setTimeout(() => {
      if (typeof window === 'undefined') return
      if (!headerRef.current || !logoRef.current || !rightControlsRef.current) return
      
      const logoRect = logoRef.current.getBoundingClientRect()
      const rightControlsRect = rightControlsRef.current.getBoundingClientRect()
      
      const headerWidth = window.innerWidth
      const logoWidth = logoRect.width
      const rightControlsWidth = rightControlsRect.width
      
      let padding = 16
      if (window.innerWidth >= 640) padding = 32
      if (window.innerWidth >= 1024) padding = 48
      if (window.innerWidth >= 1280) padding = 64
      
      const scrollButtonsWidth = window.innerWidth >= 1280 ? 48 : 0
      const safeMargin = 20
      const availableWidth = headerWidth - logoWidth - rightControlsWidth - padding - scrollButtonsWidth - safeMargin
      
      setMaxNavWidth(Math.max(200, availableWidth))
    }, 100)
    
    return () => clearTimeout(timeoutId)
  }, [currentLanguage, isInitialized])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!langMenuRef.current) return
      if (e.target instanceof Node && !langMenuRef.current.contains(e.target)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])
  
  const navItems = [
    { href: '/', label: t.navigation.home },
    { href: '/about', label: t.navigation.about },
    { href: '/services', label: t.navigation.services },
    { href: '/portfolio', label: t.navigation.portfolio },
    { href: '/reviews', label: (t.navigation as any).reviews || t.reviews?.hero?.title || 'Reviews' },
    { href: '/contact', label: t.navigation.contact },
  ]



  if (!isInitialized) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-700 shadow-lg" style={{ height: '64px', minHeight: '64px', maxHeight: '64px' }}>
        <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center scale-90 sm:scale-100">
              <VKBouwmasterLogo />
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-700 shadow-lg" 
      style={{ height: headerHeight, minHeight: headerHeight, maxHeight: headerHeight }}
    >
      <div className="w-full px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 h-full">
        <div className="flex justify-between items-center h-full" style={{ height: '100%', minHeight: '100%', maxHeight: '100%' }}>
          <Link href="/" ref={logoRef} className="flex items-center flex-shrink-0 scale-90 sm:scale-100">
            <VKBouwmasterLogo />
          </Link>

          <nav 
            className="hidden lg:flex flex-1 px-2 items-center justify-center gap-0 h-full" 
            style={{ 
              flexShrink: 1, 
              minWidth: 0,
              maxWidth: maxNavWidth > 0 ? `${maxNavWidth}px` : '100%',
              overflow: 'hidden'
            }}
          >
            <button
              aria-label={t.navigation.scrollLeft}
              onClick={() => pagesScrollRef.current?.scrollBy({ left: -260, behavior: 'smooth' })}
              className="hidden xl:flex items-center justify-center w-6 h-6 rounded-full bg-gray-800/70 hover:bg-gray-700 text-white flex-shrink-0"
              type="button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div
              ref={panelRef}
              className="relative mx-auto overflow-hidden flex-1"
              style={{ 
                width: '100%',
                maxWidth: '100%',
                height: '100%',
                minHeight: '100%',
                maxHeight: '100%',
                flexShrink: 1,
                minWidth: 0
              }}
            >
              <div className="pointer-events-none absolute left-0 top-0 h-full w-0" />
              <div className="pointer-events-none absolute right-0 top-0 h-full w-0" />
              <div
                className="flex gap-6 overflow-x-auto whitespace-nowrap scroll-smooth px-0 [scrollbar-width:none] [-ms-overflow-style:none] h-full items-center"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  width: '100%',
                  height: '100%'
                }}
                ref={pagesScrollRef}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 font-semibold relative group text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 text-sm md:text-base lg:text-lg flex-shrink-0"
                    style={{ 
                      minWidth: 'fit-content',
                      width: 'auto',
                      height: 'auto',
                      flexShrink: 0,
                      display: 'inline-block',
                      lineHeight: '1.5',
                      boxSizing: 'border-box'
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <button
              aria-label={t.navigation.scrollRight}
              onClick={() => pagesScrollRef.current?.scrollBy({ left: 260, behavior: 'smooth' })}
              className="hidden xl:flex items-center justify-center w-6 h-6 rounded-full bg-gray-800/70 hover:bg-gray-700 text-white flex-shrink-0"
              type="button"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </nav>

          <div ref={rightControlsRef} className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 flex-shrink-0 h-full">
            <div className="relative" ref={langMenuRef}>
              <GradientButton
                aria-label={t.navigation.switchLanguage}
                onClick={() => setIsLangOpen((v) => !v)}
                type="button"
                title={t.navigation.language}
                className="min-w-0 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full"
              >
                <span className="mr-0.5 sm:mr-1 text-sm sm:text-base">{flagByLang[currentLanguage] || '🏳️'}</span>
                <span className="hidden sm:inline">{currentLanguage}</span>
                <span className="sm:hidden text-xs">{currentLanguage.slice(0, 2)}</span>
                <svg className="ml-0.5 sm:ml-1 w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </GradientButton>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 max-h-64 rounded-md border border-gray-700 bg-gray-900 shadow-lg z-50 overflow-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { changeLanguage(lang); setIsLangOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-sm ${lang === currentLanguage ? 'text-white bg-gray-800' : 'text-gray-200 hover:text-white hover:bg-gray-800'}`}
                      type="button"
                    >
                      <span className="mr-2">{flagByLang[lang] || '🏳️'}</span>{lang}
                      {lang === currentLanguage && <span className="float-right">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/admin"
              className="hidden lg:flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors flex-shrink-0"
              title={t.navigation.adminPanelTitle}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </Link>
            
            <div className="hidden md:flex">
              <GradientButton asChild className="min-w-0 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full whitespace-nowrap">
                <Link href="/contact">{t.navigation.getQuote}</Link>
              </GradientButton>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-800 transition-colors flex-shrink-0"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>


        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 sm:px-4 pt-2 pb-3 space-y-1 bg-black border-t border-gray-700 max-h-[calc(100vh-80px)] overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2.5 sm:py-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 text-base sm:text-lg hover:bg-gray-800/50 rounded-md transition-colors break-words"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                href="/admin"
                className="block px-3 py-2.5 sm:py-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 text-base sm:text-lg hover:bg-gray-800/50 rounded-md transition-colors break-words"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.navigation.adminPanel}
              </Link>
              
              <div className="pt-3 border-t border-gray-700 px-2">
                <GradientButton asChild className="w-full px-4 py-3 rounded-md text-sm sm:text-base">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    {t.navigation.getQuote}
                  </Link>
                </GradientButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
