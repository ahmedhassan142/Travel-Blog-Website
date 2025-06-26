'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'

interface Destination {
  _id: string
  name: string
  slug: string
  images: string[]
  description?: string
  createdAt: string
  location?: string
  shortDescription?: string
}

export default function DestinationPage() {
  const router = useRouter()
  const params = useParams()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/destinations/${slug}`)
        
        // Handle both response structures
        const destinationData = response.data.data || response.data
        if (!destinationData) {
          throw new Error('Destination data not found in response')
        }
        
        // Ensure images array exists
        const processedData = {
          ...destinationData,
          images: destinationData.images || []
        }
        
        setDestination(processedData)
      } catch (err) {
        console.error('Fetch error:', err)
        setError('Failed to load destination')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params?.slug, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading destination...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <button 
            onClick={() => router.push('/destinations')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all w-full"
          >
            Browse All Destinations
          </button>
        </div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-gray-800">Destination not found</h2>
          <button 
            onClick={() => router.push('/destinations')}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors w-full"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Video Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/destinationhero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {destination.name}
          </h1>
          
          {destination.shortDescription && (
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl drop-shadow-md">
              {destination.shortDescription}
            </p>
          )}
          
          {destination.location && (
            <div className="flex items-center justify-center space-x-2 bg-black bg-opacity-50 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white">{destination.location}</span>
            </div>
          )}
          
          <button 
            onClick={() => {
              document.getElementById('destination-content')?.scrollIntoView({ 
                behavior: 'smooth' 
              })
            }}
            className="mt-8 px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center"
          >
            Explore More
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="destination-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Description Section */}
          {destination.description && (
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About {destination.name}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {destination.description}
              </div>
            </div>
          )}

          {/* Image Gallery */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 px-2">
              Photo Gallery
            </h3>
           {/* In your gallery section */}
{destination.images?.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {destination.images.map((image, index) => {
      // Validate image URL
      if (!image || typeof image !== 'string') return null;
      
      // Ensure proper URL format
      const imageUrl = image.startsWith('http') ? image : 
        `${process.env.NEXT_PUBLIC_BASE_URL || ''}${image}`;

      return (
        <div key={index} className="relative h-64 sm:h-80 rounded-xl overflow-hidden group">
          <Image
            src={imageUrl}
            alt={`${destination.name} - ${index + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 3}
            onError={(e) => {
              console.error('Image failed to load:', imageUrl);
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white font-medium">
              Photo {index + 1}
            </span>
          </div>
        </div>
      )
    })}
  </div>
) : (
  <div className="text-center py-12 text-gray-500">
    No images available for this destination
  </div>
)}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}