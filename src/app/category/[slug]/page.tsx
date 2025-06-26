'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'

interface Category {
  _id: string
  name: string
  slug: string
  description: string
  images?: string[]
  createdAt: string
  shortDescription?: string
}

export default function CategorySlugPage() {
  const router = useRouter()
  const params = useParams()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
    
    const fetchData = async () => {
      try {
        console.log('Fetching category with slug:', slug)
        const response = await axios.get(`/api/category/${slug}`)
        console.log('API response:', response.data)
        
        // Ensure images array exists and has valid URLs
        const categoryData = {
          ...response.data,
          images: response.data.images 
            ? response.data.images.filter((img: string) => img && img.trim() !== '')
            : []
        }
        
        setCategory(categoryData)
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Failed to load category')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params?.slug, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading category...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button 
            onClick={() => router.push('/categories')}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all w-full"
          >
            Browse All Categories
          </button>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-gray-800">Category not found</h2>
          <button 
            onClick={() => router.push('/categories')}
            className="mt-4 px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors w-full"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Hero Video Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/categoryhero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          {category && (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {category.name}
              </h1>
              
              <button 
                onClick={() => {
                  document.getElementById('category-content')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
                className="mt-8 px-8 py-3 bg-white text-teal-600 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Explore Category
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      {category && (
        <div id="category-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Description Section */}
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About {category.name}
              </h2>
              <p className="prose prose-lg max-w-none text-gray-700">
                {category.description}
              </p>
            </div>

            {/* Image Gallery */}
            {category.images && category.images.length > 0 && (
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 px-2">
                  Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <Image
                        src={image}
                        alt={`${category.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          console.error('Failed to load image:', image)
                          const target = e.target as HTMLImageElement
                          target.onerror = null
                          target.src = '/placeholder.jpg'
                          target.className = `${target.className} bg-gray-200`
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}