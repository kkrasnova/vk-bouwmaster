"use client"

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { GradientButton } from '@/components/ui/gradient-button';
import { useTranslations } from '@/hooks/useTranslations';
import type { Language } from '@/lib/translations';

export default function AdminLoginPage() {
  const { t, currentLanguage, changeLanguage } = useTranslations();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const languages = ['RU','UA','EN','NL','DE','FR','ES','IT','PT','PL','CZ','HU','RO','BG','HR','SK','SL','ET','LV','LT','FI','SV','DA','NO','GR'] as const;
  const flagByLang: Record<string, string> = {
    RU: '🇷🇺', EN: '🇬🇧', NL: '🇳🇱', DE: '🇩🇪', FR: '🇫🇷', ES: '🇪🇸', IT: '🇮🇹', PT: '🇵🇹', PL: '🇵🇱', CZ: '🇨🇿', BG: '🇧🇬', RO: '🇷🇴', HU: '🇭🇺', UA: '🇺🇦', FI: '🇫🇮', SV: '🇸🇪', DA: '🇩🇰', NO: '🇳🇴', GR: '🇬🇷', HR: '🇭🇷', SK: '🇸🇰', SL: '🇸🇮', ET: '🇪🇪', LV: '🇱🇻', LT: '🇱🇹'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('adminAuth', 'true');
        router.push('/admin');
      } else {
        router.push('/admin/access-denied');
      }
    } catch {
      setError(t.admin?.login?.connectionError || 'Connection error with server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative">
      <div className="absolute top-4 left-4">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t.admin?.login?.goHome || t.admin?.accessDenied?.goHome || 'Go Home'}
        </Link>
      </div>

      <div className="absolute top-4 right-4" ref={langMenuRef}>
        <GradientButton
          aria-label={t.navigation?.switchLanguage || 'Switch language'}
          onClick={() => setIsLangOpen((v) => !v)}
          type="button"
          title={t.navigation?.language || 'Language'}
          className="min-w-0 px-4 py-2 text-xs sm:text-sm rounded-full"
        >
          <span className="mr-1">{flagByLang[currentLanguage] || '🏳️'}</span>{currentLanguage}
          <svg className="ml-1 w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
          </svg>
        </GradientButton>
        {isLangOpen && (
          <div className="absolute right-0 mt-2 w-32 max-h-96 rounded-md border border-gray-700 bg-gray-900 shadow-lg z-50 overflow-auto">
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

      <div className="w-full max-w-xl p-8">
        <div className="elegant-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold elegant-title mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                {t.admin?.login?.title || 'Admin Panel'}
              </span>
            </h1>
            <p className="elegant-text text-gray-400">{t.admin?.login?.subtitle || 'Sign in to manage content'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium elegant-text mb-2">
                {t.admin?.login?.email || 'Email'}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder={t.admin?.login?.emailPlaceholder || 'Enter your email'}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium elegant-text mb-2">
                {t.admin?.login?.password || 'Password'}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder={t.admin?.login?.passwordPlaceholder || '••••••••'}
              />
            </div>

            <GradientButton
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg font-semibold"
            >
              {loading ? (t.admin?.login?.loggingIn || 'Signing in...') : (t.admin?.login?.loginButton || 'Sign In')}
            </GradientButton>
          </form>
        </div>
      </div>
    </div>
  );
}

