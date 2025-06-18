import React, { useState, useEffect, useRef } from 'react'
import { Container, Flex, Box, css, Button, Text } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentContainer from '@solid-ui-components/ContentContainer'
import { ImQuotesRight } from 'react-icons/im'
import { AiFillStar } from 'react-icons/ai'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  avatar: {
    size: 120,
    display: `block`,
    bg: `omegaLighter`,
    borderTopColor: `omegaLighter`,
    borderTopWidth: `lg`,
    borderTopStyle: `solid`,
    borderRadius: `full`,
    boxSizing: `content-box`,
    mx: `auto`,
    mt: -60, // Reduced from -90 to match the reduced padding
    mb: 3
  },
  sliderContainer: {
    position: 'relative',
    overflow: 'hidden',
    pt: 60, // Reduced from 90 to decrease gap
    pb: 60, // Add bottom padding for absolutely positioned dots
    px: [0, 0, 60], // Add horizontal padding only on larger screens for buttons
    touchAction: 'pan-y pinch-zoom' // Allow vertical scrolling but handle horizontal swipes
  },
  slidesWrapper: {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out, height 0.3s ease-in-out',
    willChange: 'transform, height' // Optimize for animations
  },
  slide: {
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    bg: 'white',
    border: '1px solid',
    borderColor: 'omegaLighter',
    borderRadius: 'full',
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    color: 'omegaDark',
    fontSize: 2,
    '&:hover': {
      bg: 'beta',
      color: 'white',
      transform: 'translateY(-50%) scale(1.1)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed'
    }
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 'full',
    bg: 'omegaLighter',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  activeDot: {
    bg: 'beta',
    transform: 'scale(1.2)'
  }
}

const TestimonialsSlider = ({ content: { text, collection } }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [containerHeight, setContainerHeight] = useState('auto')
  const totalSlides = collection?.length || 0
  
  // Touch/swipe state
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isDragging = useRef(false)
  const sliderRef = useRef(null)
  const slideRefs = useRef([])

  // Update container height when slide changes
  useEffect(() => {
    const updateHeight = () => {
      if (slideRefs.current[currentSlide]) {
        // Use setTimeout to ensure the DOM has updated
        setTimeout(() => {
          const slideElement = slideRefs.current[currentSlide]
          const actualHeight = slideElement.getBoundingClientRect().height
          console.log(`Slide ${currentSlide} height:`, actualHeight) // Debug log
          setContainerHeight(actualHeight)
        }, 50)
      }
    }

    updateHeight()
  }, [currentSlide])

  // Also update height when component mounts and refs are ready
  useEffect(() => {
    if (slideRefs.current.length > 0 && slideRefs.current[0]) {
      setTimeout(() => {
        const initialHeight = slideRefs.current[0].getBoundingClientRect().height
        console.log('Initial height:', initialHeight) // Debug log
        setContainerHeight(initialHeight)
      }, 100)
    }
  }, [collection])

  // Initialize slide refs array
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, totalSlides)
  }, [totalSlides])

  const nextSlide = () => {
    if (isTransitioning) return
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setAutoAdvance(false)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setAutoAdvance(false)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return
    setCurrentSlide(index)
    setAutoAdvance(false)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (totalSlides <= 1) return
    touchStartX.current = e.touches[0].clientX
    isDragging.current = true
    setAutoAdvance(false) // Stop auto-advance when user starts touching
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current || totalSlides <= 1) return
    
    // Prevent default only for horizontal swipes to allow vertical scrolling
    const touchCurrentX = e.touches[0].clientX
    const diffX = Math.abs(touchCurrentX - touchStartX.current)
    const diffY = Math.abs(e.touches[0].clientY - touchStartX.current)
    
    if (diffX > diffY && diffX > 10) {
      e.preventDefault() // Prevent vertical scrolling only for horizontal swipes
    }
  }

  const handleTouchEnd = (e) => {
    if (!isDragging.current || totalSlides <= 1 || isTransitioning) {
      isDragging.current = false
      return
    }

    touchEndX.current = e.changedTouches[0].clientX
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50 // Minimum distance to trigger swipe

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - go to next slide
        nextSlide()
      } else {
        // Swiped right - go to previous slide
        prevSlide()
      }
    }

    isDragging.current = false
  }

  // Auto-advance every 5 seconds, but only if autoAdvance is true
  useEffect(() => {
    if (totalSlides <= 1 || !autoAdvance) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)
    return () => clearInterval(interval)
  }, [totalSlides, autoAdvance])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (totalSlides <= 1 || isTransitioning) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevSlide()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextSlide()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalSlides, isTransitioning])

  if (!collection || collection.length === 0) {
    return null
  }

  return (
    <Container>
      <Box sx={{ textAlign: `center` }}>
        <ContentText content={text} />
      </Box>
      <Divider space={2} />  {/* Reduced space - was using default */}
      
      
      <Box 
        ref={sliderRef}
        sx={styles.sliderContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons - Always visible, left and right */}
        {totalSlides > 1 && (
          <>
            <Box
              sx={{ 
                ...styles.navButton, 
                left: -50
              }}
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              ‹
            </Box>
            
            <Box
              sx={{ 
                ...styles.navButton, 
                right: -50
              }}
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              ›
            </Box>
          </>
        )}

        {/* Slides */}
        <Box
          sx={{
            ...styles.slidesWrapper,
            transform: `translateX(-${currentSlide * 100}%)`,
            height: containerHeight,
            transition: isTransitioning || !isDragging.current ? 'transform 0.3s ease-in-out, height 0.3s ease-in-out' : 'none'
          }}
        >
          {collection.map(({ container, avatar, text }, index) => (
            <Box 
              key={`slide-${index}`} 
              sx={styles.slide}
              ref={(el) => (slideRefs.current[index] = el)}
            >
              <Box
                sx={{ 
                  width: '100%',
                  maxWidth: 600,
                  mx: 'auto',
                  p: 3,
                  userSelect: isDragging.current ? 'none' : 'auto' // Prevent text selection while dragging
                }}
              >
                <Reveal effect='fadeInLeft' delay={0.1} threshold={0}>
                  <ContentContainer
                    content={container}
                    variant='cards.paper'
                    sx={{ textAlign: `center` }}
                  >
                    <ContentImages
                      content={{ images: [avatar] }}
                      sx={styles.avatar}
                      objectPosition='top center'
                      imageEffect='fadeIn'
                    />
                    <ImQuotesRight css={css({ size: `icon.xs`, color: `alpha` })} />
                    <ContentText content={text} />
                    {Array.from({ length: 5 }, (_, i) => (
                      <AiFillStar key={`star-${i}`} css={css({ color: `beta` })} />
                    ))}
                  </ContentContainer>
                </Reveal>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Pagination Dots - positioned inside slider container */}
        {totalSlides > 1 && (
          <Flex sx={{
            ...styles.dots,
            position: 'absolute',
            bottom: 20, // Position within the bottom padding
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            mt: 0 // Remove margin-top since we're using absolute positioning
          }}>
            {Array.from({ length: totalSlides }, (_, index) => (
              <Box
                key={`dot-${index}`}
                sx={{
                  ...styles.dot,
                  ...(index === currentSlide ? styles.activeDot : {})
                }}
                onClick={() => goToSlide(index)}
              />
            ))}
          </Flex>
        )}
      </Box>

      {/* Mobile Navigation - Below content */}
      {totalSlides > 1 && (
        <Flex sx={{ 
          justifyContent: 'center', 
          gap: 3, 
          mt: 3,
          display: ['flex', 'none'] // Only show on mobile
        }}>
          <Button
            sx={{ 
              bg: 'beta',
              color: 'white',
              borderRadius: 'default',
              px: 3,
              py: 2,
              fontSize: 1
            }}
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous testimonial"
          >
            ← Προηγούμενο
          </Button>
          
          <Button
            sx={{ 
              bg: 'beta',
              color: 'white',
              borderRadius: 'default',
              px: 3,
              py: 2,
              fontSize: 1
            }}
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next testimonial"
          >
            Επόμενο →
          </Button>
        </Flex>
      )}

      {/* Touch instruction hint - only show on mobile */}
      <Box sx={{ 
        textAlign: 'center', 
        mt: 2, 
        display: ['block', 'none'],
        opacity: 0.6,
        fontSize: 0
      }}>
        <Text>Σύρετε αριστερά ή δεξιά για περισσότερες κριτικές</Text>
      </Box>
    </Container>
  )
}

export default WithDefaultContent(TestimonialsSlider)