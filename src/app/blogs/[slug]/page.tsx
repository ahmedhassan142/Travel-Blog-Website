'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'

interface Blog {
  _id: string
  title: string
  slug: string
  content: string
  author: string
  createdAt: string
  image?: string
  isFeatured?: boolean
  views?: number
}

export default function BlogPage() {
  const router = useRouter()
  const params = useParams()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/blogs/${slug}`)
        if (!response.data) throw new Error('Blog data not found')
        setBlog(response.data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params?.slug, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded-full w-1/2 mx-auto"></div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl transform hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button 
            onClick={() => router.refresh()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800">Blog post not found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Blog Header with 3D effect */}
        <div className="text-center mb-16">
          <div className="inline-block transform hover:-translate-y-1 transition-transform duration-300">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              {blog.title}
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 mb-8">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {blog.author}
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {blog.views && (
              <>
                <span className="hidden sm:block">•</span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {blog.views} views
                </span>
              </>
            )}
          </div>
        </div>

        {/* Featured Image with 3D hover effect */}
        {blog.image && (
          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-500">
            <div className="relative w-full h-96">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>
        )}

        {/* Blog Content with modern typography */}
        <div className="prose prose-lg md:prose-xl max-w-none mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-lg">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Featured Badge with animation */}
        {blog.isFeatured && (
          <div className="mt-12 text-center">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-full shadow-lg animate-bounce">
              ✨ Featured Post ✨
            </span>
          </div>
        )}
      </div>
    </div>
  )
}