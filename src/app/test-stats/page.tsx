"use client"

import { StatsCard } from '@/components/ui/stats-card'
import Link from 'next/link'

export default function TestStatsPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Animated Stats Cards Demo
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Прокрутите вниз, чтобы увидеть анимацию появления
            </p>
            <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </section>

      <div className="h-96"></div>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Компактная версия (Hero Section)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatsCard
              value="200+"
              label="Проекты"
              variant="gradient-1"
              delay="0.1s"
              icon={<span className="text-2xl">🏗️</span>}
            />
            <StatsCard
              value="10+"
              label="Лет"
              variant="gradient-2"
              delay="0.2s"
              icon={<span className="text-2xl">📅</span>}
            />
            <StatsCard
              value="100%"
              label="Удовлетворенность"
              variant="gradient-3"
              delay="0.3s"
              icon={<span className="text-2xl">⭐</span>}
            />
            <StatsCard
              value="24/7"
              label="Поддержка"
              variant="gradient-4"
              delay="0.4s"
              icon={<span className="text-2xl">💬</span>}
            />
          </div>
        </div>
      </section>

      <div className="h-96"></div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Полная версия (Stats Section)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              value="500+"
              label="Проекты"
              description="Успешно завершенных проектов"
              variant="gradient-1"
              delay="0.1s"
              icon={<span className="text-2xl text-white">🏗️</span>}
            />
            
            <StatsCard
              value="98%"
              label="Удовлетворенность"
              description="Довольных клиентов"
              variant="gradient-2"
              delay="0.2s"
              icon={<span className="text-2xl text-white">⭐</span>}
            />
            
            <StatsCard
              value="24/7"
              label="Поддержка"
              description="Круглосуточная поддержка"
              variant="gradient-3"
              delay="0.3s"
              icon={<span className="text-2xl text-white">💬</span>}
            />
            
            <StatsCard
              value="15+"
              label="Лет Опыта"
              description="Профессиональной работы"
              variant="gradient-4"
              delay="0.4s"
              icon={<span className="text-2xl text-white">📅</span>}
            />
          </div>
        </div>
      </section>

      <div className="h-96"></div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Все варианты градиентов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard
              value="1000+"
              label="Gradient 1"
              description="Pink → Purple → Indigo"
              variant="gradient-1"
              icon={<span className="text-2xl text-white">🎨</span>}
            />
            
            <StatsCard
              value="2000+"
              label="Gradient 2"
              description="Cyan → Blue → Purple"
              variant="gradient-2"
              icon={<span className="text-2xl text-white">🎨</span>}
            />
            
            <StatsCard
              value="3000+"
              label="Gradient 3"
              description="Orange → Red → Pink"
              variant="gradient-3"
              icon={<span className="text-2xl text-white">🎨</span>}
            />
            
            <StatsCard
              value="4000+"
              label="Gradient 4"
              description="Green → Teal → Cyan"
              variant="gradient-4"
              icon={<span className="text-2xl text-white">🎨</span>}
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">✨ Анимации</h3>
              <ul className="text-left text-gray-300 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <strong className="text-white">Counter Animation</strong>
                    <p className="text-gray-400">Числа считаются от 0 до целевого значения за 2 секунды</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📜</span>
                  <div>
                    <strong className="text-white">Scroll Reveal</strong>
                    <p className="text-gray-400">Появление снизу вверх при прокрутке с задержкой</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🌊</span>
                  <div>
                    <strong className="text-white">Staggered Animation</strong>
                    <p className="text-gray-400">Каждый элемент появляется последовательно с задержкой</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <strong className="text-white">Shimmer Effect</strong>
                    <p className="text-gray-400">Эффект блеска при наведении</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎈</span>
                  <div>
                    <strong className="text-white">Floating Particles</strong>
                    <p className="text-gray-400">3 плавающие частицы внутри каждой карточки</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">🎨 Hover эффекты</h3>
              <ul className="text-left text-gray-300 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📏</span>
                  <div>
                    <strong className="text-white">Scale Transform</strong>
                    <p className="text-gray-400">Увеличение размера на 5% (scale 1.05)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💫</span>
                  <div>
                    <strong className="text-white">Pulse Glow</strong>
                    <p className="text-gray-400">Пульсирующее свечение вокруг карточки</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <strong className="text-white">Icon Rotation</strong>
                    <p className="text-gray-400">Иконка поворачивается на 6 градусов</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🌈</span>
                  <div>
                    <strong className="text-white">Gradient Intensify</strong>
                    <p className="text-gray-400">Усиление градиентного фона</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <strong className="text-white">Number Scale</strong>
                    <p className="text-gray-400">Число увеличивается на 10%</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-orange-900/30 backdrop-blur rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">⚡ Технические детали</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-3xl mb-2">🎭</div>
                <strong className="text-white block mb-1">Glass Morphism</strong>
                <p className="text-gray-400">backdrop-blur + полупрозрачность</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📐</div>
                <strong className="text-white block mb-1">Intersection Observer</strong>
                <p className="text-gray-400">threshold: 0.2, rootMargin: -50px</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚙️</div>
                <strong className="text-white block mb-1">CSS Custom Properties</strong>
                <p className="text-gray-400">Динамические градиенты</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-32"></div>
    </div>
  )
}

