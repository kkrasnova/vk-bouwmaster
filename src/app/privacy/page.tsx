"use client"

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Meteors } from '@/components/ui/meteors'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { Parallax } from '@/components/ui/parallax'
import { useTranslations } from '@/hooks/useTranslations'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  const { t } = useTranslations()
  const sectionRef1 = useScrollAnimation()
  const sectionRef2 = useScrollAnimation()
  const sectionRef3 = useScrollAnimation()
  const sectionRef4 = useScrollAnimation()
  const sectionRef5 = useScrollAnimation()
  const sectionRef6 = useScrollAnimation()
  const sectionRef7 = useScrollAnimation()
  const sectionRef8 = useScrollAnimation()

  const dataTypes = [
    { icon: '👤', title: t.privacy?.dataCollection?.personalInfo?.title || 'Personal Information', items: t.privacy?.dataCollection?.personalInfo?.items || ['Name', 'Email address', 'Phone number'] },
    { icon: '📋', title: t.privacy?.dataCollection?.projectInfo?.title || 'Project Information', items: t.privacy?.dataCollection?.projectInfo?.items || ['Request details', 'Project address', 'Work description'] },
    { icon: '💻', title: t.privacy?.dataCollection?.technicalInfo?.title || 'Technical Information', items: t.privacy?.dataCollection?.technicalInfo?.items || ['IP address', 'Browser type', 'Usage data'] }
  ]

  const usageItems = t.privacy?.dataUsage?.items || [
    { icon: '✅', text: 'Providing and improving our services' },
    { icon: '📞', text: 'Contacting you about your project' },
    { icon: '📧', text: 'Sending informational materials and updates' },
    { icon: '🔒', text: 'Ensuring the security of our website' }
  ]

  const rightsItems = t.privacy?.userRights?.items || [
    { icon: '📖', text: 'Access your personal information' },
    { icon: '✏️', text: 'Correct inaccurate information' },
    { icon: '🗑️', text: 'Request deletion of your data' },
    { icon: '🔄', text: 'Withdraw consent to data processing' }
  ]

  return (
    <div className="unified-gradient-bg">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient-bg pt-20 pb-20">
        <div className="absolute inset-0 z-20 opacity-90 pointer-events-none">
          <ShaderAnimation />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-950 to-black"></div>
        
        <Parallax speed={0.3} className="relative z-30 text-center px-4">
          <div>
            <div className="text-center mx-auto mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="hero-title text-6xl sm:text-7xl md:text-6xl lg:text-7xl font-extrabold mb-4 animate-logo-entrance"
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                  {t.privacy?.hero?.title || 'Privacy Policy'}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
              >
                {t.privacy?.hero?.subtitle || 'VK Bouwmaster Privacy Policy'}
              </motion.p>
            </div>
          </div>
        </Parallax>
      </section>

      <section ref={sectionRef1} className="bg-black scroll-fade-in py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="elegant-card p-8 md:p-10 relative">
            <Meteors number={15} />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">📜</span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                    {t.privacy?.introduction?.title || '1. Introduction'}
                  </span>
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed elegant-text">
                {t.privacy?.introduction?.content || 'VK Bouwmaster ("we", "our" or "company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and protect your information when you use our website and services.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef2} className="bg-black scroll-fade-in py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                {t.privacy?.dataCollection?.title || '2. Information We Collect'}
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataTypes.map((type, idx) => (
              <div key={idx} className="elegant-card p-6 relative animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                <Meteors number={10} />
                <div className="relative z-10">
                  <div className="text-5xl mb-4 text-center">{type.icon}</div>
                  <h3 className="text-xl font-bold elegant-title mb-4 text-center">{type.title}</h3>
                  <ul className="space-y-2">
                    {type.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={sectionRef3} className="bg-black scroll-fade-in py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="elegant-card p-8 md:p-10 relative">
            <Meteors number={15} />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🎯</span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                    {t.privacy?.dataUsage?.title || '3. How We Use Your Information'}
                  </span>
                </h2>
              </div>
              <p className="text-lg text-gray-300 mb-6">
                {t.privacy?.dataUsage?.subtitle || 'We use the collected information for:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usageItems.map((item, idx) => (
                  <div key={idx} className="flex items-start p-4 bg-gray-900/50 rounded-lg animate-fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <span className="text-gray-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef4} className="bg-black scroll-fade-in py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="elegant-card p-8 md:p-10 relative">
            <Meteors number={15} />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🛡️</span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                    {t.privacy?.dataProtection?.title || '4. Data Protection'}
                  </span>
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed elegant-text">
                {t.privacy?.dataProtection?.content || 'We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure or destruction.'}
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="text-3xl mb-2">🔐</div>
                  <p className="text-sm text-gray-300">{t.privacy?.dataProtection?.encryption || 'Data encryption'}</p>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="text-3xl mb-2">🔑</div>
                  <p className="text-sm text-gray-300">{t.privacy?.dataProtection?.secureAccess || 'Secure access'}</p>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-sm text-gray-300">{t.privacy?.dataProtection?.regularChecks || 'Regular checks'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef5} className="bg-black scroll-fade-in py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="elegant-card p-8 md:p-10 relative">
            <Meteors number={15} />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🤝</span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                    {t.privacy?.thirdParty?.title || '5. Third-Party Disclosure'}
                  </span>
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed elegant-text">
                {t.privacy?.thirdParty?.content || 'We do not sell, trade, or transfer your personal information to third parties without your consent, except when necessary to provide our services or required by law.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef6} className="bg-black scroll-fade-in py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="elegant-card p-8 md:p-10 relative">
            <Meteors number={15} />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">⚖️</span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                    {t.privacy?.userRights?.title || '6. Your Rights'}
                  </span>
                </h2>
              </div>
              <p className="text-lg text-gray-300 mb-6">
                {t.privacy?.userRights?.subtitle || 'You have the right to:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rightsItems.map((item, idx) => (
                  <div key={idx} className="flex items-start p-4 bg-gray-900/50 rounded-lg animate-fade-in hover-lift" style={{animationDelay: `${idx * 0.1}s`}}>
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <span className="text-gray-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef7} className="bg-black scroll-fade-in py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="elegant-card p-8 md:p-10 relative">
            <Meteors number={15} />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">📞</span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                    {t.privacy?.contact?.title || '7. Contact'}
                  </span>
                </h2>
              </div>
              <p className="text-lg text-gray-300 mb-6">
                {t.privacy?.contact?.subtitle || 'If you have questions about our Privacy Policy, please contact us:'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-500/30 hover-lift">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">📧</span>
                    <h3 className="text-xl font-bold text-white">{t.privacy?.contact?.email?.title || 'Email'}</h3>
                  </div>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vkbouwmaster@gmail.com&su=&body=" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-300 hover:text-blue-200 transition-colors break-all">
                    {t.privacy?.contact?.email?.address || 'vkbouwmaster@gmail.com'}
                  </a>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-500/30 hover-lift">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">📱</span>
                    <h3 className="text-xl font-bold text-white">{t.privacy?.contact?.phone?.title || 'Phone'}</h3>
                  </div>
                  <a href="tel:+380990804115" 
                     className="text-blue-300 hover:text-blue-200 transition-colors">
                    {t.privacy?.contact?.phone?.number || '+380-99-080-4115'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={sectionRef8} className="bg-black scroll-fade-in py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="elegant-card p-8 md:p-10 relative">
            <Meteors number={15} />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">🔄</span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                    {t.privacy?.updates?.title || '8. Privacy Policy Updates'}
                  </span>
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed elegant-text">
                {t.privacy?.updates?.content || 'We may periodically update this Privacy Policy. We will notify you of any changes by posting the new Privacy Policy on this page with an updated date.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm md:text-base">
              {t.privacy?.lastUpdated || 'Last updated: January 2025'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
