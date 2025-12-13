"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { getTranslations, type Language, type Translations } from '@/lib/translations'

const STORAGE_KEY = 'language'

interface LanguageContextType {
  t: Translations
  currentLanguage: Language
  changeLanguage: (lang: Language) => void
  resetLanguage: () => void
  isInitialized: boolean
  wasAutoDetected: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('NL')
  const [translations, setTranslations] = useState<Translations>(() => getTranslations('NL'))
  const [isInitialized, setIsInitialized] = useState(false)
  const [wasAutoDetected, setWasAutoDetected] = useState(false)

  useEffect(() => {
      setCurrentLanguage('NL')
      setTranslations(getTranslations('NL'))
      setIsInitialized(true)
    
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY)
    }
    } catch {}
  }, [])

  const changeLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang)
    setTranslations(getTranslations(lang))
  }, [])

  const resetLanguage = useCallback(() => {
    changeLanguage('NL')
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch {}
  }, [changeLanguage])

  return (
    <LanguageContext.Provider
      value={{
        t: translations,
        currentLanguage,
        changeLanguage,
        resetLanguage,
        isInitialized,
        wasAutoDetected,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useTranslations must be used within a LanguageProvider')
  }
  return context
}

