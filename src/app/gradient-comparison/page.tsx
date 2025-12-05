"use client"

import { StatsCard } from '@/components/ui/stats-card'
import Link from 'next/link'

export default function GradientComparisonPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              ✨ Градиентные Фоны Stats Cards
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Теперь с красивыми анимированными градиентами вместо чёрного фона
            </p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </section>

      {/* All 4 Gradient Variants */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            🎨 Все варианты градиентов
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Наведите на карточки, чтобы увидеть эффекты
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              value="500+"
              label="Gradient 1"
              description="Pink → Purple → Indigo"
              variant="gradient-1"
              icon={<span className="text-2xl text-white">💗</span>}
            />
            
            <StatsCard
              value="98%"
              label="Gradient 2"
              description="Cyan → Blue → Purple"
              variant="gradient-2"
              icon={<span className="text-2xl text-white">🩵</span>}
            />
            
            <StatsCard
              value="24/7"
              label="Gradient 3"
              description="Orange → Red → Pink"
              variant="gradient-3"
              icon={<span className="text-2xl text-white">🧡</span>}
            />
            
            <StatsCard
              value="15+"
              label="Gradient 4"
              description="Green → Teal → Cyan"
              variant="gradient-4"
              icon={<span className="text-2xl text-white">💚</span>}
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            🌟 Что нового в фонах
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-indigo-900/20 backdrop-blur rounded-2xl p-6 border border-pink-500/30">
              <div className="text-4xl mb-3 text-center">🎭</div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Многослойные градиенты</h3>
              <p className="text-gray-400 text-sm text-center">
                3 слоя градиентов создают глубину и объем
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20 backdrop-blur rounded-2xl p-6 border border-cyan-500/30">
              <div className="text-4xl mb-3 text-center">✨</div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Mesh Animation</h3>
              <p className="text-gray-400 text-sm text-center">
                Плавная анимация градиента создает живой эффект
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20 backdrop-blur rounded-2xl p-6 border border-orange-500/30">
              <div className="text-4xl mb-3 text-center">💫</div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Градиентные сферы</h3>
              <p className="text-gray-400 text-sm text-center">
                Размытые цветные сферы для дополнительного эффекта
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Effects List */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              🎨 Слои градиентов в каждой карточке
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <strong className="text-white">Base Mesh Gradient</strong>
                  <p className="text-gray-400">Темный градиент gray-900 → gray-950 → black с анимацией</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <strong className="text-white">Colored Overlay (8%)</strong>
                  <p className="text-gray-400">Цветной градиент (тема карточки), увеличивается до 15% при hover</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <strong className="text-white">Secondary Layer (5%)</strong>
                  <p className="text-gray-400">Дополнительный градиент в обратном направлении</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">4️⃣</span>
                <div>
                  <strong className="text-white">Radial Glow</strong>
                  <p className="text-gray-400">Появляется при hover с эффектом размытия</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">5️⃣</span>
                <div>
                  <strong className="text-white">Top-Right Orb</strong>
                  <p className="text-gray-400">Большая размытая сфера сверху справа (25% → 50%)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">6️⃣</span>
                <div>
                  <strong className="text-white">Bottom-Left Orb</strong>
                  <p className="text-gray-400">Большая размытая сфера снизу слева (25% → 50%)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">7️⃣</span>
                <div>
                  <strong className="text-white">Center Glow</strong>
                  <p className="text-gray-400">Центральное свечение (15% → 30%)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">8️⃣</span>
                <div>
                  <strong className="text-white">Floating Particles</strong>
                  <p className="text-gray-400">3 маленькие плавающие точки с цветом темы</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Example */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            📏 Крупный план
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatsCard
              value="1000+"
              label="Проектов завершено"
              description="За последние 5 лет работы"
              variant="gradient-1"
              icon={<span className="text-3xl text-white">🏗️</span>}
              className="h-64"
            />
            
            <StatsCard
              value="99.9%"
              label="Успешность"
              description="Довольных клиентов по всему миру"
              variant="gradient-3"
              icon={<span className="text-3xl text-white">⭐</span>}
              className="h-64"
            />
          </div>
        </div>
      </section>

      <div className="h-32"></div>
    </div>
  )
}

