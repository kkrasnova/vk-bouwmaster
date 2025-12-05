"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from '@/hooks/useTranslations'
import { motion } from 'framer-motion'
import { ShaderAnimation } from '@/components/ui/shader-animation'
import { GradientButton } from '@/components/ui/gradient-button'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'

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

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { t, isInitialized, currentLanguage } = useTranslations()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

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
    loadBlogPost()
  }, [params.slug])

  const loadBlogPost = async () => {
    try {
      const response = await fetch('/api/blog')
      if (response.ok) {
        const data = await response.json()
        const posts = Array.isArray(data) ? data : []
        setAllPosts(posts)
        
        const foundPost = posts.find((p: BlogPost) => 
          p.slug === params.slug || p.id === params.slug
        )
        
        if (foundPost) {
          setPost(getTranslatedPost(foundPost))
        } else {
          // Если пост не найден, перенаправляем на главную страницу блога
          router.push('/blog')
        }
      }
    } catch (error) {
      console.error('Error loading blog post:', error)
    } finally {
      setLoading(false)
    }
  }

  // Обновляем переводы при изменении языка
  useEffect(() => {
    if (post && allPosts.length > 0) {
      const originalPost = allPosts.find(p => p.id === post.id)
      if (originalPost) {
        setPost(getTranslatedPost(originalPost))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage])

  const currentIndex = post ? allPosts.findIndex(p => p.id === post.id) : -1
  const translatedAllPosts = allPosts.map(getTranslatedPost)
  const prevPost = currentIndex > 0 ? translatedAllPosts[currentIndex - 1] : null
  const nextPost = currentIndex >= 0 && currentIndex < translatedAllPosts.length - 1 ? translatedAllPosts[currentIndex + 1] : null

  if (!isInitialized || loading) {
    return (
      <div className="unified-gradient-bg min-h-screen">
        <section className="text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </section>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="unified-gradient-bg min-h-screen">
        <section className="text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Статья не найдена</h1>
            <GradientButton asChild className="mt-8">
              <Link href="/blog">Вернуться к блогу</Link>
            </GradientButton>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="unified-gradient-bg relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden hero-gradient-bg pt-20 pb-12 z-10">
        <div className="absolute inset-0 z-20 opacity-80 pointer-events-none">
          <ShaderAnimation />
        </div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-950 via-blue-950/80 to-black"></div>
        
        <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/blog">
              <GradientButton variant="variant" className="mb-8 w-auto">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Вернуться к блогу
              </GradientButton>
            </Link>
            
            {post.category && (
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300">
                {post.title}
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-gray-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              {post.readTime && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.readTime}</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <motion.section 
          className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-blue-700/30 shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.section>
      )}

      {/* Content */}
      <motion.section 
        className="relative py-16 bg-gradient-to-b from-black via-gray-900 to-black z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-xl text-gray-300 mb-8 leading-relaxed font-medium">
              {post.excerpt}
            </div>
            
            {post.content ? (
              <div 
                className="text-gray-300 leading-relaxed text-lg space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="text-gray-300 leading-relaxed text-lg space-y-6">
                <p>
                  {post.excerpt}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Navigation */}
      <motion.section 
        className="relative py-12 bg-gradient-to-b from-black via-gray-900 to-black z-10 border-t border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug || prevPost.id}`}>
                <div className="group p-6 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer">
                  <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Предыдущая статья</span>
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-2">
                    {prevPost.title}
                  </h3>
                </div>
              </Link>
            ) : (
              <div></div>
            )}
            
            {nextPost && (
              <Link href={`/blog/${nextPost.slug || nextPost.id}`}>
                <div className="group p-6 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer text-right">
                  <div className="flex items-center justify-end gap-2 text-blue-400 text-sm mb-2">
                    <span>Следующая статья</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors line-clamp-2">
                    {nextPost.title}
                  </h3>
                </div>
              </Link>
            )}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 overflow-hidden z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
              Нужна помощь с проектом?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Свяжитесь со мной для консультации по вашему проекту
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton asChild variant="variant" className="w-auto min-w-[220px] text-base px-8 py-3">
                <Link href="/contact">
                  Связаться со мной
                </Link>
              </GradientButton>
              <GradientButton asChild variant="variant" className="w-auto min-w-[220px] text-base px-8 py-3">
                <Link href="/blog">
                  Все статьи
                </Link>
              </GradientButton>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

