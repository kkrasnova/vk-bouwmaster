"use client"

import { GradientButton } from '@/components/ui/gradient-button'
import Link from 'next/link'

export default function TestButtonsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Gradient Button Test</h1>
      
      <div className="flex flex-col gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl text-white text-center">Default Variant</h2>
          <GradientButton>Get Started</GradientButton>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-white text-center">Variant Style</h2>
          <GradientButton variant="variant">Get Started</GradientButton>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-white text-center">With Links (Russian)</h2>
          <div className="flex gap-4">
            <GradientButton asChild>
              <Link href="/contact">
                Получить Бесплатную Смету
              </Link>
            </GradientButton>
            <GradientButton asChild variant="variant">
              <Link href="/portfolio">
                Посмотреть Наши Работы
              </Link>
            </GradientButton>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Link href="/pricing" className="text-blue-400 hover:text-blue-300 underline">
          Вернуться на страницу Pricing
        </Link>
      </div>
    </div>
  )
}

