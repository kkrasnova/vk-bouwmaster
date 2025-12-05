"use client"

import Link from "next/link"
import { useTranslations } from '@/hooks/useTranslations'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { Meteors } from '@/components/ui/meteors'
import { GradientButton } from '@/components/ui/gradient-button'
import { Parallax } from '@/components/ui/parallax'

export default function ServicesPage() {
  const { t, isInitialized } = useTranslations()
  const servicesRef = useScrollAnimation()

  const services = [
    {
      title: t.home?.services?.flooring?.title || "Укладка пола",
      description: t.home?.services?.flooring?.description || "Профессиональная укладка и ремонт полов всех типов",
      href: "/services/flooring-installation",
      icon: "🏠",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: t.home?.services?.painting?.title || "Покраска",
      description: t.home?.services?.painting?.description || "Покраска интерьеров и фасадов премиум-материалами",
      href: "/services/painting",
      icon: "🎨",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: t.home?.services?.plumbing?.title || "Сантехника",
      description: t.home?.services?.plumbing?.description || "Полный спектр сантехнических работ и установок",
      href: "/services/plumbing-repairs",
      icon: "🔧",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: t.home?.services?.roofing?.title || "Ремонт крыши",
      description: t.home?.services?.roofing?.description || "Профессиональный ремонт и обслуживание крыш",
      href: "/services/roof-repairs",
      icon: "🏠",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: t.home?.services?.garden?.title || "Ландшафтный дизайн",
      description: t.home?.services?.garden?.description || "Красивый дизайн сада и благоустройство территории",
      href: "/services/garden-design-landscaping",
      icon: "🌿",
      gradient: "from-green-400 to-green-600"
    },
    {
      title: t.home?.services?.tile?.title || "Плитка",
      description: t.home?.services?.tile?.description || "Профессиональная укладка плитки для кухонь, ванных и других помещений",
      href: "/services/tile-removal-installation",
      icon: "🧱",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      title: t.home?.services?.paving?.title || "Укладка тротуарной плитки",
      description: t.home?.services?.paving?.description || "Профессиональная укладка тротуарной плитки для дорожек, патио и открытых площадок",
      href: "/services/paving-stone-installation",
      icon: "🪨",
      gradient: "from-gray-500 to-gray-700"
    },
    {
      title: t.home?.services?.hedge?.title || "Стрижка живой изгороди",
      description: t.home?.services?.hedge?.description || "Профессиональная стрижка и уход за живой изгородью для поддержания аккуратного и красивого вида сада",
      href: "/services/hedge-trimming",
      icon: "✂️",
      gradient: "from-green-500 to-green-700"
    },
    {
      title: t.home?.services?.ceiling?.title || "Потолки и стены",
      description: t.home?.services?.ceiling?.description || "Профессиональная установка, ремонт и отделка потолков и стен для внутренних помещений",
      href: "/services/ceiling-walls",
      icon: "🏗️",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      title: t.home?.services?.drywall?.title || "Работы с гипсокартоном",
      description: t.home?.services?.drywall?.description || "Профессиональная установка, ремонт и отделка гипсокартона для стен и потолков",
      href: "/services/drywall-work",
      icon: "📐",
      gradient: "from-teal-500 to-cyan-500"
    }
  ]

  if (!isInitialized) {
    return (
      <div className="unified-gradient-bg">
        <section className="text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="unified-gradient-bg relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient-bg pt-20 pb-20 z-10">
        {/* Shader Animation только в hero секции */}
        <div className="absolute inset-0 z-20 opacity-90 pointer-events-none">
          <ShaderAnimation />
        </div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-950 via-blue-950/80 to-black"></div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-25 pointer-events-none"></div>
        
        <Parallax speed={0.3} className="relative z-30 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 animate-gradient bg-[length:200%_auto]">
                {t.services?.hero?.title || 'Our Services'}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
              {t.services?.hero?.subtitle || 'Comprehensive renovation and construction services to transform your space'}
            </p>
          </motion.div>
        </Parallax>
      </section>

      {/* Services Grid Section */}
      <motion.section 
        ref={servicesRef} 
        className="relative pt-8 pb-20 bg-gradient-to-b from-black via-gray-900 to-black z-10"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Переходная анимация сверху */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/30 to-black z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        ></motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <Link
                  href={service.href}
                  className="block relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="text-blue-400 hover:text-blue-300 font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                      {t.common?.learnMore || 'Узнать больше'} 
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                  
                  <Meteors number={10} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <GradientButton asChild variant="variant" className="w-auto min-w-[220px] text-base px-8 py-3">
              <Link href="/contact">
                {t.home?.hero?.cta1 || 'Связаться со мной'}
              </Link>
            </GradientButton>
          </motion.div>
        </div>
      </motion.section>

    </div>
  )
}
