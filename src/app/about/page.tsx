"use client"

import { useTranslations } from '@/hooks/useTranslations'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Link from 'next/link'
import { GradientButton } from '@/components/ui/gradient-button'
import { motion } from 'framer-motion'
import { Meteors } from '@/components/ui/meteors'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { Parallax } from '@/components/ui/parallax'

export default function AboutPage() {
  const { t, isInitialized } = useTranslations()
  const storyRef = useScrollAnimation()
  const missionRef = useScrollAnimation()
  const whyChooseRef = useScrollAnimation()
  const certificationsRef = useScrollAnimation()
  const ctaRef = useScrollAnimation()

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
    <div className="unified-gradient-bg">
      {/* Hero Section with Shader Animation */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient-bg pt-20 pb-20">
        {/* Shader Animation now on top with opacity */}
        <div className="absolute inset-0 z-20 opacity-90 pointer-events-none">
          <ShaderAnimation />
        </div>
        
        {/* Dark blue background with gradient fade to black */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-950 via-blue-950/80 to-black"></div>
        
        {/* Gradient fade at bottom to smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-25 pointer-events-none"></div>
        
        <Parallax speed={0.3} className="relative z-30 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 animate-gradient bg-[length:200%_auto]">
                {t.about.hero.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
              {t.about.hero.subtitle}
            </p>
          </motion.div>
        </Parallax>
      </section>

      {/* Story Section */}
      <motion.section 
        ref={storyRef} 
        className="py-20 bg-black scroll-fade-in relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                {t.about.story.title}
              </span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
              >
                {t.about.story.paragraph1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
              >
                {t.about.story.paragraph2}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
              >
                {t.about.story.paragraph3}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        ref={missionRef} 
        className="py-20 bg-gradient-to-b from-black via-gray-900 to-black scroll-fade-in relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                {t.about.mission.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.about.mission.subtitle}</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Качество */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
                  <span className="text-white text-4xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.about.mission.mission.title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.about.mission.mission.description}</p>
              </div>
              <Meteors number={15} />
            </motion.div>
            
            {/* Инновации */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-green-700/30 hover:border-green-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                  <span className="text-white text-4xl">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.about.mission.quality.title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.about.mission.quality.description}</p>
              </div>
              <Meteors number={15} />
            </motion.div>
            
            {/* Удовлетворенность */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-pink-700/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-rose-600/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/50">
                  <span className="text-white text-4xl">❤️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t.about.mission.customer.title}</h3>
                <p className="text-gray-300 leading-relaxed">{t.about.mission.customer.description}</p>
              </div>
              <Meteors number={15} />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section 
        ref={whyChooseRef} 
        className="py-20 bg-black scroll-fade-in relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                {t.about.whyChoose.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.about.whyChoose.subtitle}</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">{t.about.whyChoose.award.title}</h3>
              <p className="text-gray-300 text-center text-sm leading-relaxed">{t.about.whyChoose.award.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">{t.about.whyChoose.onTime.title}</h3>
              <p className="text-gray-300 text-center text-sm leading-relaxed">{t.about.whyChoose.onTime.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 text-center">{t.about.whyChoose.fair.title}</h3>
              <p className="text-gray-300 text-center text-sm leading-relaxed">{t.about.whyChoose.fair.description}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section 
        ref={certificationsRef} 
        className="py-20 bg-gradient-to-b from-black via-gray-900 to-black scroll-fade-in relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                {t.about.certifications.title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.about.certifications.subtitle}</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
                <span className="text-white text-4xl">📜</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{t.about.certifications.licensed.title}</h3>
              <p className="text-gray-300 text-center leading-relaxed">{t.about.certifications.licensed.description}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl border border-green-700/30 hover:border-green-500/50 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50">
                <span className="text-white text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">{t.about.certifications.quality.title}</h3>
              <p className="text-gray-300 text-center leading-relaxed">{t.about.certifications.quality.description}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef} 
        className="relative py-20 bg-black overflow-hidden scroll-fade-in"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          {/* Dark gradient overlay - более прозрачный, чтобы лучи были видны */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
          
          {/* Main Shader Animation - яркие лучи */}
          <div className="absolute inset-0 opacity-100">
            <ShaderAnimation />
          </div>
          
          {/* Subtle accent gradients for depth - уменьшены, чтобы не мешали лучам */}
          <motion.div
            className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Moving Particles Effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Meteors Effect */}
        <Meteors number={30} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white relative inline-block"
              animate={{
                textShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 30px rgba(59, 130, 246, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {t.about.cta.title}
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.about.cta.subtitle}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GradientButton asChild variant="variant" className="w-auto min-w-[220px] text-base px-8 py-3 relative overflow-hidden group">
                  <Link href="/contact" className="relative z-10">
                    <span className="relative z-10">{t.about.cta.cta1}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </Link>
                </GradientButton>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GradientButton asChild variant="variant" className="w-auto min-w-[220px] text-base px-8 py-3 relative overflow-hidden group">
                  <Link href="/portfolio" className="relative z-10">
                    <span className="relative z-10">{t.about.cta.cta2}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </Link>
                </GradientButton>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}