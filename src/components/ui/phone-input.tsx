"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'

interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
}

const countries: Country[] = [
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
  { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
  { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪' },
  { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻' },
  { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  defaultCountry?: string
}

export function PhoneInput({ value, onChange, placeholder, className = '', defaultCountry = 'NL' }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Parse initial value to determine country and phone number
  const parseInitialValue = (val: string) => {
    if (!val) {
      const defaultCountryObj = countries.find(c => c.code === defaultCountry) || countries[0]
      return { country: defaultCountryObj, phoneNumber: '' }
    }
    
    const matchingCountry = countries.find(country => 
      val.startsWith(country.dialCode)
    )
    
    if (matchingCountry) {
      const numberPart = val.substring(matchingCountry.dialCode.length).trim()
      return { country: matchingCountry, phoneNumber: numberPart.replace(/\D/g, '') }
    }
    
    const defaultCountryObj = countries.find(c => c.code === defaultCountry) || countries[0]
    return { country: defaultCountryObj, phoneNumber: val.replace(/\D/g, '') }
  }
  
  const initial = parseInitialValue(value)
  const [selectedCountry, setSelectedCountry] = useState<Country>(initial.country)
  const [phoneNumber, setPhoneNumber] = useState(initial.phoneNumber)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isInternalUpdateRef = useRef(false)
  const lastValueRef = useRef(value)
  const isMountedRef = useRef(false)

  // Sync with external value changes (only if changed externally)
  useEffect(() => {
    // Skip on initial mount - we already initialized from value
    if (!isMountedRef.current) {
      isMountedRef.current = true
      lastValueRef.current = value
      return
    }

    // Only sync if value changed from outside
    if (value !== lastValueRef.current) {
      const currentFormatted = phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : ''
      
      // If external value doesn't match our internal state, update from external
      if (value !== currentFormatted) {
        isInternalUpdateRef.current = true
        const parsed = parseInitialValue(value)
        setSelectedCountry(parsed.country)
        setPhoneNumber(parsed.phoneNumber)
        lastValueRef.current = value
        isInternalUpdateRef.current = false
      } else {
        lastValueRef.current = value
      }
    }
  }, [value])

  // Keep value ref updated
  useEffect(() => {
    lastValueRef.current = value
  }, [value])

  // Update parent when internal state changes
  useEffect(() => {
    if (!isMountedRef.current || isInternalUpdateRef.current) {
      return
    }
    
    const fullNumber = phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : ''
    
    // Only call onChange if value actually changed and it's different from prop value
    if (fullNumber !== lastValueRef.current) {
      lastValueRef.current = fullNumber
      onChange(fullNumber)
    }
  }, [selectedCountry, phoneNumber, onChange])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '') // Only numbers
    setPhoneNumber(input)
  }

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        {/* Country Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-3 bg-black/50 border border-gray-700 rounded-l-xl hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white"
            aria-label="Select country"
          >
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-sm font-medium">{selectedCountry.dialCode}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute top-full left-0 mt-1 w-64 max-h-80 overflow-hidden bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 flex flex-col">
                {/* Search Input */}
                <div className="p-2 border-b border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search country..."
                      className="w-full pl-10 pr-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
                
                {/* Countries List */}
                <div className="overflow-y-auto flex-1 p-2">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left ${
                        selectedCountry.code === country.code ? 'bg-blue-600/20 border border-blue-500/50' : ''
                      }`}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="flex-1 text-white">{country.name}</span>
                      <span className="text-gray-400 text-sm">{country.dialCode}</span>
                    </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-400 text-sm">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder || '6 1234 5678'}
          className="flex-1 px-4 py-3 bg-black/50 border border-gray-700 border-l-0 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-gray-500 text-white"
        />
      </div>
    </div>
  )
}

