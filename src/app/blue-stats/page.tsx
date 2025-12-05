"use client"

import { StatsCard } from '@/components/ui/stats-card'
import Link from 'next/link'

export default function BlueStatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-slate-950">
      {/* Hero Section */}
      <section className="py-12 sm:py-10 xs:py-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 cq-container">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="universal-title title-balance title-trim font-bold text-transparent bg-clip-text tiffany-gradient-text mb-2 sm:mb-3">
              🌊 Синий Градиент - Stats Cards
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-cyan-300 mb-4 sm:mb-6">
              Черный с темно-синим и голубым градиентом
            </p>
            <Link href="/" className="text-cyan-400 hover:text-cyan-300 underline text-xs sm:text-sm">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-8 sm:py-6 xs:py-4">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text tiffany-gradient-text text-center mb-4 sm:mb-6">
            🎨 Цветовая палитра
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3">
            <div className="text-center">
              <div className="h-16 bg-black rounded-lg mb-1 border border-blue-500"></div>
              <p className="text-xs text-gray-300">Black</p>
              <p className="text-[10px] text-gray-500">#000000</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-blue-950 rounded-lg mb-1 border border-blue-500"></div>
              <p className="text-xs text-gray-300">Blue-950</p>
              <p className="text-[10px] text-gray-500">Темно-синий</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-slate-950 rounded-lg mb-1 border border-blue-500"></div>
              <p className="text-xs text-gray-300">Slate-950</p>
              <p className="text-[10px] text-gray-500">Темный</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-blue-600 rounded-lg mb-1 border border-cyan-400"></div>
              <p className="text-xs text-gray-300">Blue-600</p>
              <p className="text-[10px] text-gray-500">Синий акцент</p>
            </div>
            <div className="text-center">
              <div className="h-16 bg-cyan-500 rounded-lg mb-1 border border-cyan-300"></div>
              <p className="text-xs text-gray-300">Cyan-500</p>
              <p className="text-[10px] text-gray-500">Голубой</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Stats Grid */}
      <section className="pt-0 pb-8 sm:pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text tiffany-gradient-text text-center mb-4 sm:mb-6 md:mb-8">
            ✨ Все варианты с синим фоном
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8 md:mb-10">
            <StatsCard
              value="200+"
              label="Проекты"
              description="Успешно завершено"
              variant="gradient-1"
              delay="0.1s"
              icon={<span>🏗️</span>}
            />
            
            <StatsCard
              value="100%"
              label="Удовлетворенность"
              description="Довольных клиентов"
              variant="gradient-2"
              delay="0.2s"
              icon={<span>⭐</span>}
            />
            
            <StatsCard
              value="24/7"
              label="Поддержка"
              description="Круглосуточно"
              variant="gradient-3"
              delay="0.3s"
              icon={<span>💬</span>}
            />
            
            <StatsCard
              value="10+"
              label="Лет Опыта"
              description="На рынке"
              variant="gradient-4"
              delay="0.4s"
              icon={<span>📅</span>}
            />
          </div>
        </div>
      </section>

      {/* Feature Breakdown */}
      <section className="py-10 sm:py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text tiffany-gradient-text text-center mb-4 sm:mb-6 md:mb-8">
            🌟 Слои градиентов
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-black via-blue-950 to-slate-950 rounded-xl p-4 border border-blue-500/30">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="text-sm font-bold text-white mb-1">Базовый слой</h3>
              <p className="text-xs text-cyan-200">Black → Blue-950 → Slate-950</p>
              <p className="text-[10px] text-gray-400 mt-1">Основной темный градиент с синим оттенком</p>
            </div>

            <div className="bg-gradient-to-tr from-blue-900/20 via-cyan-900/10 to-transparent backdrop-blur rounded-xl p-4 border border-cyan-500/30">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="text-sm font-bold text-white mb-1">Синий оверлей</h3>
              <p className="text-xs text-cyan-200">Blue-900 → Cyan-900 (60%)</p>
              <p className="text-[10px] text-gray-400 mt-1">Добавляет синий оттенок фону</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-600/10 rounded-xl p-4 border border-pink-500/30">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="text-sm font-bold text-white mb-1">Цветной слой</h3>
              <p className="text-xs text-cyan-200">Variant color (8-15%)</p>
              <p className="text-[10px] text-gray-400 mt-1">Уникальный цвет каждой карточки</p>
            </div>

            <div className="bg-gradient-to-tl from-cyan-950/40 via-blue-950/20 to-transparent rounded-xl p-4 border border-cyan-500/30">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="text-sm font-bold text-white mb-1">Вторичный слой</h3>
              <p className="text-xs text-cyan-200">Cyan-950 → Blue-950 (50-70%)</p>
              <p className="text-[10px] text-gray-400 mt-1">Усиливается при наведении</p>
            </div>

            <div className="relative overflow-hidden bg-black/50 backdrop-blur rounded-xl p-4 border border-blue-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/20 blur-2xl"></div>
              <div className="relative text-2xl mb-2">5️⃣</div>
              <h3 className="relative text-sm font-bold text-white mb-1">Градиентные сферы</h3>
              <p className="relative text-xs text-cyan-200">Blue-600 + Cyan-500</p>
              <p className="relative text-[10px] text-gray-400 mt-1">Размытые сферы по углам</p>
            </div>

            <div className="relative overflow-hidden bg-black/50 backdrop-blur rounded-xl p-4 border border-cyan-500/30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-blue-500 via-cyan-400 blur-xl opacity-30"></div>
              <div className="relative text-2xl mb-2">6️⃣</div>
              <h3 className="relative text-sm font-bold text-white mb-1">Центральное свечение</h3>
              <p className="relative text-xs text-cyan-200">Blue-500 → Cyan-400</p>
              <p className="relative text-[10px] text-gray-400 mt-1">Усиливается при hover</p>
            </div>
          </div>
        </div>
      </section>

      {/* Large Examples */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text tiffany-gradient-text text-center mb-4 sm:mb-6 md:mb-8">
            📏 Крупный план
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
            <StatsCard
              value="1234"
              label="Активных проектов"
              description="В работе прямо сейчас"
              variant="gradient-1"
              icon={<span className="text-2xl text-white">🚀</span>}
              className="min-h-[180px]"
            />
            
            <StatsCard
              value="99.9%"
              label="Время работы"
              description="Uptime за последний год"
              variant="gradient-2"
              icon={<span className="text-2xl text-white">⚡</span>}
              className="min-h-[180px]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <StatsCard
              value="50K+"
              label="Счастливых клиентов"
              description="По всему миру"
              variant="gradient-3"
              icon={<span className="text-2xl text-white">😊</span>}
              className="min-h-[180px]"
            />
            
            <StatsCard
              value="24/7"
              label="Техподдержка"
              description="Всегда на связи"
              variant="gradient-4"
              icon={<span className="text-2xl text-white">🎧</span>}
              className="min-h-[180px]"
            />
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          <div className="bg-gradient-to-r from-blue-900/30 via-cyan-900/30 to-blue-900/30 backdrop-blur rounded-xl p-3 sm:p-4 md:p-6 border border-cyan-500/40">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 text-center">
              💡 Почему синий градиент?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs">
              <div className="text-center">
                <div className="text-2xl mb-2">🎨</div>
                <strong className="text-cyan-300 block mb-1 text-xs">Современный дизайн</strong>
                <p className="text-gray-300 text-[10px]">Синий градиент выглядит профессионально и современно</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">👁️</div>
                <strong className="text-cyan-300 block mb-1 text-xs">Лучшая читаемость</strong>
                <p className="text-gray-300 text-[10px]">Легкий синий оттенок делает текст более читаемым</p>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-2">✨</div>
                <strong className="text-cyan-300 block mb-1 text-xs">Глубина</strong>
                <p className="text-gray-300 text-[10px]">Синие тона создают ощущение глубины и пространства</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16"></div>
    </div>
  )
}

