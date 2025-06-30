'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  // Fullscreen presentation mode
  if (isFullscreen) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Fullscreen Controls */}
          <motion.div
            className="absolute top-4 right-4 z-10 flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Minimize2 className="h-4 w-4" />
              Exit Fullscreen
            </motion.button>
          </motion.div>

          {/* Fullscreen Figma */}
          <motion.iframe
            src={figmaEmbedUrl}
            className="w-full h-full"
            allowFullScreen
            title="Exterior Spaces Prototype - Presentation Mode"
            style={{ border: 'none' }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />

          {/* Escape hint */}
          <motion.div
            className="absolute bottom-4 left-4 text-white/60 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Press <kbd className="bg-white/10 px-2 py-1 rounded">Esc</kbd> to exit fullscreen
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div
        className="bg-white shadow-sm border-b"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Link */}
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.div
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <div>
              <motion.h1
                className="text-3xl font-bold text-gray-900"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Exterior Spaces
              </motion.h1>
              <motion.p
                className="text-gray-600 mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Explore our innovative exterior space designs and architectural concepts
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Presentation className="h-4 w-4" />
                Presentation Mode
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Figma Embed */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={itemVariants}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Embed Header */}
          <motion.div
            className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-3 bg-yellow-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              />
              <span className="ml-4 text-sm text-gray-600 font-medium">Figma Prototype</span>
            </div>
            <motion.button
              onClick={toggleFullscreen}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors"
              title="Enter Presentation Mode"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize2 className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Figma iFrame */}
          <motion.div
            className="relative"
            style={{ paddingBottom: '56.25%', height: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <iframe
              src={figmaEmbedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              title="Exterior Spaces Prototype"
              style={{ border: 'none', minHeight: '600px' }}
            />
          </motion.div>
        </motion.div>

        {/* Figma Info */}
        <motion.div
          className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h3
            className="text-lg font-semibold text-green-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            ✅ Figma Integration Active
          </motion.h3>
          <motion.div
            className="text-green-700 text-sm space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p>Your Exterior Spaces prototype is now embedded and ready to interact with. Experience the full interactive prototype above.</p>
            <motion.div
              className="flex items-center gap-2 mt-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
            >
              <Presentation className="h-4 w-4" />
              <span className="font-medium">Presentation Mode:</span>
              <span>Click the "Presentation Mode" button for fullscreen viewing without navbar/footer (Press Esc to exit)</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 mt-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 }}
            >
              <span className="text-xs bg-green-100 px-2 py-1 rounded">🔒 Private:</span>
              <span className="text-xs">Your Figma file remains private - users only see the interactive prototype</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-6 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-sm"
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold text-gray-900 mb-3">About Exterior Spaces</h3>
            <p className="text-gray-600 text-sm">
              Our exterior space designs focus on creating harmonious environments that blend
              natural elements with innovative architectural concepts. These designs promote
              wellbeing and sustainable living practices.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-sm"
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-semibold text-gray-900 mb-3">Design Features</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Sustainable materials and practices</li>
              <li>• Biophilic design principles</li>
              <li>• Community-focused spaces</li>
              <li>• Accessibility considerations</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
