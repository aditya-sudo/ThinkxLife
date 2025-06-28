'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowLeft, Maximize2, Minimize2, Presentation } from 'lucide-react'

export default function ExteriorSpacesPage() {
  // Your Figma prototype embed URL (presentation mode)
  const figmaEmbedUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FmAq1KGpFlEMPBiPRCEEbNy%2FExterior-Spaces%3Fnode-id%3D228-981%26p%3Df%26t%3DPkpHrsBjZLwUuO6f-0%26scaling%3Dmin-zoom%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D228%253A981%26show-proto-sidebar%3D1"

  // State for fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Set page title
  useEffect(() => {
    document.title = 'Exterior Spaces | ThinkxLife'
  }, [])

  // Exit fullscreen with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isFullscreen])

  // Fullscreen presentation mode
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black">
                 {/* Fullscreen Controls */}
         <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
           <button
             onClick={toggleFullscreen}
             className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors"
           >
             <Minimize2 className="h-4 w-4" />
             Exit Fullscreen
           </button>
         </div>

        {/* Fullscreen Figma */}
                 <iframe
           src={figmaEmbedUrl}
           className="w-full h-full"
           allowFullScreen
           title="Exterior Spaces Prototype - Presentation Mode"
           style={{ border: 'none' }}
         />

        {/* Escape hint */}
        <div className="absolute bottom-4 left-4 text-white/60 text-sm">
          Press <kbd className="bg-white/10 px-2 py-1 rounded">Esc</kbd> to exit fullscreen
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Exterior Spaces</h1>
              <p className="text-gray-600 mt-2">
                Explore our innovative exterior space designs and architectural concepts
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Presentation className="h-4 w-4" />
                Presentation Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Figma Embed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Embed Header */}
          <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-sm text-gray-600 font-medium">Figma Prototype</span>
            </div>
            <button
              onClick={toggleFullscreen}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
              title="Enter Presentation Mode"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Figma iFrame */}
          <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src={figmaEmbedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              title="Exterior Spaces Prototype"
              style={{ border: 'none', minHeight: '600px' }}
            />
          </div>
        </div>

        {/* Figma Info */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            ✅ Figma Integration Active
          </h3>
          <div className="text-green-700 text-sm space-y-2">
            <p>Your Exterior Spaces prototype is now embedded and ready to interact with. Experience the full interactive prototype above.</p>
            <div className="flex items-center gap-2 mt-3">
              <Presentation className="h-4 w-4" />
              <span className="font-medium">Presentation Mode:</span>
              <span>Click the "Presentation Mode" button for fullscreen viewing without navbar/footer (Press Esc to exit)</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-green-100 px-2 py-1 rounded">🔒 Private:</span>
              <span className="text-xs">Your Figma file remains private - users only see the interactive prototype</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">About Exterior Spaces</h3>
            <p className="text-gray-600 text-sm">
              Our exterior space designs focus on creating harmonious environments that blend
              natural elements with innovative architectural concepts. These designs promote
              wellbeing and sustainable living practices.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Design Features</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Sustainable materials and practices</li>
              <li>• Biophilic design principles</li>
              <li>• Community-focused spaces</li>
              <li>• Accessibility considerations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
