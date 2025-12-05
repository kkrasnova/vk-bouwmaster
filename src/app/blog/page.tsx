"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from '@/hooks/useTranslations'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { Meteors } from '@/components/ui/meteors'
import { GradientButton } from '@/components/ui/gradient-button'
import { Parallax } from '@/components/ui/parallax'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogPostTranslations {
  title: string
  excerpt: string
  content?: string
  category: string
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  readTime: string
  slug: string
  content?: string
  translations?: Record<string, BlogPostTranslations>
}

export default function BlogPage() {
  const { t, isInitialized, currentLanguage } = useTranslations()
  const blogRef = useScrollAnimation()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Функция для получения переведенного контента поста
  const getTranslatedPost = (post: BlogPost): BlogPost => {
    const lang = currentLanguage === 'UA' ? 'UA' : currentLanguage
    const translations = post.translations?.[lang]
    
    if (!translations) {
      // Если переводов нет, используем оригинал (русский)
      return post
    }

    return {
      ...post,
      title: translations.title || post.title,
      excerpt: translations.excerpt || post.excerpt,
      content: translations.content || post.content,
      category: translations.category || post.category
    }
  }

  useEffect(() => {
    loadBlogPosts()
    const interval = setInterval(loadBlogPosts, 15000)
    return () => clearInterval(interval)
  }, [])

  // Обновляем переводы при изменении языка
  useEffect(() => {
    // Переводы уже применяются через getTranslatedPost, просто перерендерим
  }, [currentLanguage])

  const loadBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Получаем переведенные посты
  const translatedPosts = blogPosts.map(getTranslatedPost)
  
  const categories = ['All', ...Array.from(new Set(translatedPosts.map(post => post.category).filter(Boolean)))]

  const filteredPosts = selectedCategory === 'All' 
    ? translatedPosts 
    : translatedPosts.filter(post => post.category === selectedCategory)

  const featuredPost = translatedPosts.length > 0 ? translatedPosts[0] : null
  const regularPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts

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
                {t.blog?.hero?.title || 'Блог'}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
              {t.blog?.hero?.subtitle || 'Полезные статьи и советы по ремонту и строительству'}
            </p>
          </motion.div>
        </Parallax>
      </section>

      {/* Categories Filter */}
      {categories.length > 1 && (
        <motion.section 
          className="relative py-8 bg-black z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <motion.section 
          ref={blogRef}
          className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black z-10"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/30 to-black z-0"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {t.blog?.featured || 'Рекомендуемое'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6 text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime || '5 мин'}</span>
                  </div>
                  {featuredPost.category && (
                    <>
                      <span>•</span>
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">
                        {featuredPost.category}
                      </span>
                    </>
                  )}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <GradientButton asChild variant="variant" className="w-auto">
                  <Link href={`/blog/${featuredPost.slug || featuredPost.id}`}>
                    {t.blog?.readMore || 'Читать далее'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </GradientButton>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden border border-blue-700/30 shadow-2xl">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Blog Posts Grid */}
      <motion.section 
        className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                {t.blog?.latest?.title || 'Последние статьи'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.blog?.latest?.subtitle || 'Полезные советы и интересные статьи'}
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : regularPosts.length === 0 ? (
            <div className="text-center py-16 border-2 border-dashed border-gray-700 rounded-lg bg-gray-900/30">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-300 text-xl font-medium mb-2">Пока нет статей</p>
              <p className="text-gray-500 text-sm">Добавьте статьи через админ-панель</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug || post.id}`}>
                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 h-full flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="relative z-10">
                        <div className="relative w-full h-64 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                              {post.category || 'Статья'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{post.date}</span>
                            </div>
                            {post.readTime && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{post.readTime}</span>
                                </div>
                              </>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-300 mb-6 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                            {t.blog?.readMore || 'Читать далее'}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </div>
                        </div>
                      </div>
                      
                      <Meteors number={8} />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 overflow-hidden z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 opacity-20">
          <ShaderAnimation />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t.blog?.newsletter?.title || 'Хотите узнать больше?'}
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t.blog?.newsletter?.subtitle || 'Свяжитесь со мной для консультации по вашему проекту'}
            </p>
            <GradientButton asChild variant="variant" className="w-auto min-w-[220px] text-base px-8 py-3">
              <Link href="/contact">
                {t.blog?.newsletter?.cta || 'Связаться со мной'}
              </Link>
            </GradientButton>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
