import React, { useState, useEffect } from 'react'
import { Container, Flex, Box, css, Button } from 'theme-ui'
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
    mt: -90,
    mb: 3
  },
  sliderContainer: {
    position: 'relative',
    overflow: 'hidden',
    pt: 90, // Add top padding to accommodate negative margin avatar
    px: [0, 0, 60] // Add horizontal padding only on larger screens for buttons
  },
  slidesWrapper: {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out'
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
    bg: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid',
    borderColor: 'omegaLighter',
    borderRadius: 'full',
    width: 24,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    backdropFilter: 'blur(4px)',
    transition: 'all 0.2s ease',
    '&:hover': {
      bg: 'white',
      transform: 'translateY(-50%) scale(1.15)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.18)'
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed'
    }
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
    mt: 4
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
  const totalSlides = collection?.length || 0

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
    setAutoAdvance(false) // Stop auto-advance when user manually navigates
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    setAutoAdvance(false) // Stop auto-advance when user manually navigates
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setAutoAdvance(false) // Stop auto-advance when user manually navigates
  }

  // Auto-advance every 5 seconds, but only if autoAdvance is true
  useEffect(() => {
    if (totalSlides <= 1 || !autoAdvance) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)
    return () => clearInterval(interval)
  }, [totalSlides, autoAdvance])

  if (!collection || collection.length === 0) {
    return null
  }

  return (
    <Container>
      <Box sx={{ textAlign: `center` }}>
        <ContentText content={text} />
      </Box>
      <Divider />
      
      
      <Box sx={styles.sliderContainer}>
        {/* Navigation Buttons - Desktop only */}
        {totalSlides > 1 && (
          <>
            <Button
              sx={{ 
                ...styles.navButton, 
                left: -20,
                display: ['none', 'flex'] // Hidden on mobile, visible on desktop
              }}
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <IoChevronBack size={14} />
            </Button>
            
            <Button
              sx={{ 
                ...styles.navButton, 
                right: -20,
                display: ['none', 'flex'] // Hidden on mobile, visible on desktop
              }}
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <IoChevronForward size={14} />
            </Button>
          </>
        )}

        {/* Slides */}
        <Box
          sx={{
            ...styles.slidesWrapper,
            transform: `translateX(-${currentSlide * 100}%)`
          }}
        >
          {collection.map(({ container, avatar, text }, index) => (
            <Box key={`slide-${index}`} sx={styles.slide}>
              <Box
                sx={{ 
                  width: '100%',
                  maxWidth: 600,
                  mx: 'auto',
                  p: 3
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
      </Box>

      {/* Pagination Dots */}
      {totalSlides > 1 && (
        <Flex sx={styles.dots}>
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
            aria-label="Next testimonial"
          >
            Επόμενο →
          </Button>
        </Flex>
      )}
    </Container>
  )
}

export default WithDefaultContent(TestimonialsSlider)