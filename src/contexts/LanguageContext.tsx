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

  // Всегда используем нидерландский язык по умолчанию, игнорируя сохраненный выбор
  useEffect(() => {
    // Всегда устанавливаем нидерландский язык, независимо от сохраненного выбора
      setCurrentLanguage('NL')
      setTranslations(getTranslations('NL'))
      setIsInitialized(true)
    
    // Очищаем сохраненный язык из localStorage, чтобы всегда показывать NL
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(STORAGE_KEY)
    }
    } catch {}
  }, [])

  // Change language handler (не сохраняем в localStorage, чтобы всегда возвращаться к NL)
  const changeLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang)
    setTranslations(getTranslations(lang))
    // Не сохраняем в localStorage, чтобы при следующей загрузке всегда был NL
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

