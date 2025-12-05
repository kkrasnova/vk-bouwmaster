"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from 'framer-motion'
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { Parallax } from "@/components/ui/parallax";
import { useTranslations } from "@/hooks/useTranslations";
import { GradientButton } from "@/components/ui/gradient-button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Meteors } from "@/components/ui/meteors";
import { SimpleWorksGridSection } from "@/components/simple-works-grid-section";
import { RetroTestimonialDemo } from "@/components/ui/retro-testimonial-demo";
import type { Language } from '@/lib/translations';

export default function Home() {
  const { t } = useTranslations()
  const aboutRef = useScrollAnimation()
  const servicesRef = useScrollAnimation()
  
  return (
    <div className="unified-gradient-bg">
      {/* Hero Section with Shader Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient-bg pt-16 sm:pt-20 md:pt-24 pb-20">
        {/* Shader Animation now on top with opacity */}
        <div className="absolute inset-0 z-20 opacity-90 pointer-events-none">
          <ShaderAnimation />
        </div>
        
        {/* Dark blue background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-950 to-black"></div>
        
        <Parallax speed={0.3} className="relative z-30 text-center px-4">
          <div>
            <div className="text-center mx-auto mb-6">
                <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 animate-logo-entrance px-2">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 break-words">
                    VK BOUWMASTER
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
                  {t.home.hero.subtitle}
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-8 justify-center items-center mt-8 px-4">
              <GradientButton asChild variant="variant" className="w-full sm:w-64 md:w-72 lg:w-80 max-w-sm">
                <Link href="/contact">{t.home.hero.cta1}</Link>
              </GradientButton>
              <GradientButton asChild variant="variant" className="w-full sm:w-64 md:w-72 lg:w-80 max-w-sm">
                <Link href="/portfolio">{t.home.hero.cta2}</Link>
              </GradientButton>
            </div>
          </div>
        </Parallax>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="bg-black scroll-fade-in py-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight font-bold section-title">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">{t.home.about.title}</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start md:items-center">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 sm:p-8 shadow-xl border border-gray-700 animate-slide-up">
              <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6" dangerouslySetInnerHTML={{ __html: t.home.about.description1 }} />
              <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t.home.about.description2 }} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative overflow-hidden rounded-xl shadow-lg p-4 sm:p-6 hover-lift animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-cyan-300 opacity-10"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-glow animate-float">
                    <span className="text-xl sm:text-2xl">🏗️</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 mb-2 break-words">{t.home.about.projectsCount}</h3>
                  <p className="text-xs sm:text-sm text-center text-gray-300 break-words">{t.home.about.projectsLabel}</p>
                </div>
                <Meteors number={20} />
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg p-4 sm:p-6 hover-lift animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-cyan-300 opacity-10"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-glow animate-float">
                    <span className="text-xl sm:text-2xl">📅</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 mb-2 break-words">{t.home.about.yearsCount}</h3>
                  <p className="text-xs sm:text-sm text-center text-gray-300 break-words">{t.home.about.yearsLabel}</p>
                </div>
                <Meteors number={20} />
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg p-4 sm:p-6 hover-lift animate-slide-up" style={{animationDelay: '0.3s'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-cyan-300 opacity-10"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-glow animate-float">
                    <span className="text-xl sm:text-2xl">⭐</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 mb-2 break-words">{t.home.about.satisfactionPercent}</h3>
                  <p className="text-xs sm:text-sm text-center text-gray-300 break-words">{t.home.about.satisfactionLabel}</p>
                </div>
                <Meteors number={20} />
              </div>
              
              <div className="relative overflow-hidden rounded-xl shadow-lg p-4 sm:p-6 hover-lift animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-cyan-300 opacity-10"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-dark rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-glow animate-float">
                    <span className="text-xl sm:text-2xl">💬</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 mb-2 break-words">24/7</h3>
                  <p className="text-xs sm:text-sm text-center text-gray-300 break-words">{t.home.about.supportLabel}</p>
                </div>
                <Meteors number={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Photos Grid Section (moved after About) */}
      <SimpleWorksGridSection />

      {/* Services Section */}
      <section ref={servicesRef} className="bg-black py-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl leading-tight font-bold section-title">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">{t.home.services.title}</span>
            </h2>
            <p className="text-base md:text-xl elegant-text max-w-3xl mx-auto">
              {t.home.services?.subtitle || 'Я предлагаю услуги по ремонту для преобразования вашего дома или бизнеса'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t.home.services?.flooring?.title || 'Flooring Installation',
                description: t.home.services?.flooring?.description || 'Professional flooring installation and repair services for all types of flooring materials.',
                href: '/services/flooring-installation',
                icon: '🏠',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                title: t.home.services?.painting?.title || 'Painting Services',
                description: t.home.services?.painting?.description || 'Interior and exterior painting services with premium quality paints and finishes.',
                href: '/services/painting',
                icon: '🎨',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: t.home.services?.plumbing?.title || 'Plumbing Repairs',
                description: t.home.services?.plumbing?.description || 'Complete plumbing repair and installation services for residential and commercial properties.',
                href: '/services/plumbing-repairs',
                icon: '🔧',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                title: t.home.services?.roofing?.title || 'Roof Repairs',
                description: t.home.services?.roofing?.description || 'Expert roof repair and maintenance services to protect your property.',
                href: '/services/roof-repairs',
                icon: '🏠',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                title: t.home.services?.garden?.title || 'Garden Design',
                description: t.home.services?.garden?.description || 'Beautiful garden design and landscaping services to enhance your outdoor space.',
                href: '/services/garden-design-landscaping',
                icon: '🌿',
                gradient: 'from-green-400 to-green-600'
              },
              {
                title: t.home.services?.tile?.title || 'Tile Installation',
                description: t.home.services?.tile?.description || 'Professional tile removal and installation services for kitchens, bathrooms, and more.',
                href: '/services/tile-removal-installation',
                icon: '🧱',
                gradient: 'from-orange-400 to-orange-600'
              },
              {
                title: t.home.services?.paving?.title || 'Paving Stone Installation',
                description: t.home.services?.paving?.description || 'Professional paving stone installation for driveways, walkways, patios, and outdoor areas.',
                href: '/services/paving-stone-installation',
                icon: '🪨',
                gradient: 'from-gray-500 to-gray-700'
              },
              {
                title: t.home.services?.hedge?.title || 'Hedge Trimming',
                description: t.home.services?.hedge?.description || 'Professional hedge trimming and maintenance services to keep your garden looking neat and beautiful.',
                href: '/services/hedge-trimming',
                icon: '✂️',
                gradient: 'from-green-500 to-green-700'
              },
              {
                title: t.home.services?.ceiling?.title || 'Ceilings & Walls',
                description: t.home.services?.ceiling?.description || 'Professional ceiling and wall installation, repair, and finishing services for interior spaces.',
                href: '/services/ceiling-walls',
                icon: '🏗️',
                gradient: 'from-indigo-500 to-purple-500'
              },
              {
                title: t.home.services?.drywall?.title || 'Drywall Work',
                description: t.home.services?.drywall?.description || 'Professional drywall installation, repair, and finishing services for walls and ceilings.',
                href: '/services/drywall-work',
                icon: '📐',
                gradient: 'from-teal-500 to-cyan-500'
              }
            ].map((service, index) => (
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
                  className="block relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${service.gradient} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-xl sm:text-2xl">{service.icon}</span>
                    </div>
                    
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors leading-tight break-words" style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none', whiteSpace: 'normal' }}>
                      {service.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="text-sm sm:text-base text-blue-400 hover:text-blue-300 font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center">
                      {t.common.learnMore} 
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                  
                  <Meteors number={10} />
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 sm:mt-16 px-4">
            <GradientButton asChild variant="variant" className="w-full sm:w-64 md:w-72 lg:w-80 max-w-sm">
              <Link href="/contact">{t.home.hero.cta1}</Link>
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-black py-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight font-bold section-title">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">{t.home.testimonials.title}</span>
            </h2>
          </div>
          <RetroTestimonialDemo />
        </div>
      </section>
    </div>
  );
}