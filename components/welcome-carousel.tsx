'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CarouselSlide {
  title: string
  description: string
  icon: string
  color: string
}

const SLIDES: CarouselSlide[] = [
  {
    title: 'Dépistage Précoce',
    description:
      'Détectez le cancer du col de l\'utérus plus tôt pour une meilleure prise en charge et de meilleures chances de guérison.',
    icon: '🔍',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Intelligence Artificielle',
    description:
      'Nos algorithmes IA analysent vos résultats pour fournir des recommandations médicales précises et personnalisées.',
    icon: '🧠',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Soutien Complet',
    description:
      'Accédez à une équipe médicale disponible, des conseils de santé et des ressources d\'information complètes.',
    icon: '❤️',
    color: 'from-rose-500 to-pink-500',
  },
  {
    title: 'Sécurité des Données',
    description:
      'Vos informations médicales sont protégées avec les normes de sécurité les plus élevées et la confidentialité garantie.',
    icon: '🔒',
    color: 'from-green-500 to-emerald-500',
  },
]

export function WelcomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
    setAutoPlay(false)
  }

  const slide = SLIDES[currentSlide]

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 shadow-xl">
      <div className="relative h-64 md:h-72 flex items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-10 transition-all duration-500`} />

        <div className="relative z-10 text-center px-6 md:px-12 py-8 max-w-2xl">
          <div className="text-5xl md:text-6xl mb-4 drop-shadow-lg">{slide.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground text-balance">{slide.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance max-w-xl mx-auto">
            {slide.description}
          </p>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 transition-all"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx)
                setAutoPlay(false)
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? 'w-8 bg-white shadow-lg'
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
