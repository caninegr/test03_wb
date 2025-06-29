import React, { useState } from 'react'
import { Box, Container, Flex, Button, IconButton, Text } from 'theme-ui'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

// Styles for the gallery
const styles = {
  gallery: {
    display: 'grid',
    gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)'],
    gap: 3,
    mb: 4,
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 'lg',
    cursor: 'pointer',
    boxShadow: 'default',
    transition: 'all 250ms ease',
    transform: 'scale(1)',
    ':hover': {
      transform: 'scale(1.02)',
      boxShadow: 'lg',
    },
  },
  imageCaption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    bg: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    p: 2,
    fontSize: 1,
    fontWeight: 'bold',
    opacity: 0,
    transition: 'opacity 250ms ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bg: 'rgba(0, 0, 0, 0.85)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 300ms ease',
  },
  modalVisible: {
    opacity: 1,
    visibility: 'visible',
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90vw',
    maxHeight: '90vh',
    bg: 'transparent',
    borderRadius: 'lg',
    overflow: 'hidden',
  },
  modalImage: {
    maxWidth: '90vw',
    maxHeight: '80vh',
    objectFit: 'contain',
    boxShadow: 'xl',
  },
  closeButton: {
    position: 'absolute',
    top: 3,
    right: 3,
    zIndex: 1001,
    color: 'white',
    bg: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 'full',
    p: 2,
    '&:hover': {
      bg: 'rgba(0, 0, 0, 0.7)',
    }
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1001,
    color: 'white',
    bg: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 'full',
    p: 3,
    '&:hover': {
      bg: 'rgba(0, 0, 0, 0.7)',
    }
  },
  prevButton: {
    left: 3,
  },
  nextButton: {
    right: 3,
  },
  captionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    p: 3,
    bg: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    textAlign: 'center',
    fontSize: 2,
  }
}

const ImageGallery = ({ content }) => {
  const [activeImage, setActiveImage] = useState(null)
  const [touchStart, setTouchStart] = useState(0)
  
  // Handle image click to open the modal
  const openLightbox = (index) => {
    setActiveImage(index)
    // Disable scrolling on the body when lightbox is open
    document.body.style.overflow = 'hidden'
  }
  
  // Close the lightbox
  const closeLightbox = () => {
    setActiveImage(null)
    // Re-enable scrolling
    document.body.style.overflow = ''
  }
  
  // Navigate to previous image
  const prevImage = () => {
    if (activeImage === null) return
    const newIndex = activeImage === 0 ? content.images.length - 1 : activeImage - 1
    setActiveImage(newIndex)
  }
  
  // Navigate to next image
  const nextImage = () => {
    if (activeImage === null) return
    const newIndex = activeImage === content.images.length - 1 ? 0 : activeImage + 1
    setActiveImage(newIndex)
  }
  
  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImage === null) return
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
        case 'Escape':
          closeLightbox()
          break
        default:
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage])
  
  // Handle touch events for swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }
  
  const handleTouchEnd = (e) => {
    if (touchStart === 0) return
    
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    
    // If swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next image
        nextImage()
      } else {
        // Swipe right, go to previous image
        prevImage()
      }
    }
    
    setTouchStart(0)
  }
  
  // Early return if no content or images
  if (!content || !content.images || content.images.length === 0) {
    return null
  }
  
  return (
    <Container>
      {/* Gallery title and description */}
      {content.text && (
        <Box sx={{ textAlign: 'center' }}>
          <ContentText content={content.text} />
          <Divider space={3} />
        </Box>
      )}
      
      {/* Image Grid */}
      <Reveal effect="fadeIn">
        <Box sx={styles.gallery}>
          {content.images.map((image, index) => {
            // Skip images without source
            if (!image.src) return null
            
            return (
              <Box 
                key={`gallery-image-${index}`} 
                sx={styles.imageWrapper}
                onClick={() => openLightbox(index)}
                onMouseEnter={(e) => {
                  // Show caption on hover
                  if (image.alt) {
                    const caption = e.currentTarget.querySelector('.image-caption')
                    if (caption) caption.style.opacity = 1
                  }
                }}
                onMouseLeave={(e) => {
                  // Hide caption on mouse leave
                  const caption = e.currentTarget.querySelector('.image-caption')
                  if (caption) caption.style.opacity = 0
                }}
              >
                {/* Image */}
                <GatsbyImage
                  image={getImage(image.src)}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  style={{ height: '100%' }}
                  imgStyle={{ objectFit: 'cover' }}
                />
                
                {/* Caption overlay */}
                {image.alt && (
                  <Box sx={styles.imageCaption} className="image-caption">
                    {image.alt}
                  </Box>
                )}
              </Box>
            )
          })}
        </Box>
      </Reveal>
      
      {/* Lightbox Modal */}
      <Box 
        sx={{
          ...styles.modalOverlay,
          ...(activeImage !== null ? styles.modalVisible : {})
        }}
        onClick={closeLightbox}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Modal Content */}
        {activeImage !== null && (
          <Box sx={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <IconButton 
              onClick={closeLightbox}
              sx={styles.closeButton}
              aria-label="Close"
            >
              <FaTimes />
            </IconButton>
            
            {/* Navigation buttons (only shown if there are multiple images) */}
            {content.images.length > 1 && (
              <>
                <IconButton 
                  onClick={prevImage}
                  sx={{...styles.navButton, ...styles.prevButton}}
                  aria-label="Previous image"
                >
                  <FaArrowLeft />
                </IconButton>
                
                <IconButton 
                  onClick={nextImage}
                  sx={{...styles.navButton, ...styles.nextButton}}
                  aria-label="Next image"
                >
                  <FaArrowRight />
                </IconButton>
              </>
            )}
            
            {/* Current image */}
            <GatsbyImage
              image={getImage(content.images[activeImage].src)}
              alt={content.images[activeImage].alt || `Gallery image ${activeImage + 1}`}
              sx={styles.modalImage}
              imgStyle={{ objectFit: 'contain' }}
            />
            
            {/* Caption */}
            {content.images[activeImage].alt && (
              <Box sx={styles.captionBar}>
                {content.images[activeImage].alt}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  )
}

// Export the component wrapped with default content
export default WithDefaultContent(ImageGallery)