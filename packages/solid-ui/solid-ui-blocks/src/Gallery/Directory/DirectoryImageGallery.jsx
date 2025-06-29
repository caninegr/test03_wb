import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Box, Button, Container, Flex, IconButton, Text } from 'theme-ui'
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
    height: 0,
    paddingBottom: '75%', // 4:3 aspect ratio
    ':hover': {
      transform: 'scale(1.02)',
      boxShadow: 'lg',
    },
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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
    width: '90vw',
    height: '90vh',
    bg: 'transparent',
    borderRadius: 'lg',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  loadMoreButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mx: 'auto',
    mb: 4,
    px: 4,
    py: 2,
    bg: 'alpha',
    color: 'white',
    fontFamily: 'inherit', // Use theme's font
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    border: 'none', // Ensure no border
    boxShadow: 'none', // Remove box shadow
    '&:hover': {
      bg: 'alphaDark',
      transform: 'translateY(-2px)',
    }
  }
}

// This query gets all images from the specified directory
const DirectoryImageGallery = ({ content = {} }) => {
  // Query for all images in the given directory
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg|jpeg|png|gif)/" }
          relativePath: { regex: "/hotel_showcase/" }
        }
      ) {
        edges {
          node {
            id
            name
            relativePath
            childImageSharp {
              gatsbyImageData(
                width: 800
                placeholder: BLURRED
                formats: [AUTO, WEBP]
                quality: 80
              )
            }
          }
        }
      }
    }
  `);

  // State for the images
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [visibleRows, setVisibleRows] = useState(3); // Number of visible rows
  const maxColumns = 4; // Maximum number of columns in the grid

  // Effect to load images on initial render
  useEffect(() => {
    if (data && data.allFile && data.allFile.edges && data.allFile.edges.length > 0) {
      // Log file paths to help debug
      console.log("Found image files:", data.allFile.edges.map(edge => edge.node.relativePath));
      
      // Create image objects from the GraphQL data
      const imageObjects = data.allFile.edges
        .filter(({ node }) => node.childImageSharp) // Filter out any non-image files
        .map(({ node }) => ({
          id: node.id,
          name: node.name,
          src: node.childImageSharp,
          alt: node.name.replace(/[-_]/g, ' '), // Use filename as alt text, replacing hyphens and underscores with spaces
          path: node.relativePath
        }));
      
      console.log(`Found ${imageObjects.length} valid images`);
      
      // Update state with images
      setImages(imageObjects);
    } else {
      console.warn("No image data found or query returned empty results");
    }
  }, [data]);

  // Handle image click to open the modal
  const openLightbox = (index) => {
    setActiveImage(index);
    // Disable scrolling on the body when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  // Close the lightbox
  const closeLightbox = () => {
    setActiveImage(null);
    // Re-enable scrolling
    document.body.style.overflow = '';
  };

  // Calculate visible count based on rows
  const getVisibleCount = () => {
    return visibleRows * maxColumns;
  };

  // Load more images (add 3 more rows)
  const loadMoreImages = () => {
    setVisibleRows(prevRows => prevRows + 3);
  };

  // Navigate to previous image
  const prevImage = () => {
    if (activeImage === null) return;
    const newIndex = activeImage === 0 ? images.length - 1 : activeImage - 1;
    setActiveImage(newIndex);
  };

  // Navigate to next image
  const nextImage = () => {
    if (activeImage === null) return;
    const newIndex = activeImage === images.length - 1 ? 0 : activeImage + 1;
    setActiveImage(newIndex);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImage === null) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);
  
  // Handle touch events for swipe navigation
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };
  
  const handleTouchEnd = (e) => {
    if (touchStart === 0) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // If swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next image
        nextImage();
      } else {
        // Swipe right, go to previous image
        prevImage();
      }
    }
    
    setTouchStart(0);
  };

  // Early return if no images found
  if (images.length === 0) {
    return (
      <Container>
        <Text sx={{ textAlign: 'center', my: 5 }}>
          No images found in the gallery directory. Please add images to the "content/gallery" folder.
        </Text>
      </Container>
    );
  }
  
  // Get only the visible subset of images based on rows
  const visibleCount = getVisibleCount();
  const visibleImages = images.slice(0, visibleCount);
  const hasMoreImages = visibleCount < images.length;
  
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
          {visibleImages.map((image, index) => (
            <Box 
              key={`gallery-image-${image.id}`} 
              sx={styles.imageWrapper}
              onClick={() => openLightbox(index)}
              onMouseEnter={(e) => {
                // Show caption on hover
                const caption = e.currentTarget.querySelector('.image-caption');
                if (caption) caption.style.opacity = 1;
              }}
              onMouseLeave={(e) => {
                // Hide caption on mouse leave
                const caption = e.currentTarget.querySelector('.image-caption');
                if (caption) caption.style.opacity = 0;
              }}
            >
              <Box sx={styles.image}>
                <GatsbyImage
                  image={getImage(image.src)}
                  alt={image.alt}
                  style={{ width: '100%', height: '100%' }}
                  imgStyle={{ objectFit: 'cover' }}
                />
              </Box>
              
              {/* Caption overlay */}
              <Box sx={styles.imageCaption} className="image-caption">
                {image.alt}
              </Box>
            </Box>
          ))}
        </Box>
      </Reveal>
      
      {/* Load More Button - only shown if there are more images to load */}
      {hasMoreImages && (
        <Box 
          as="button"
          onClick={loadMoreImages}
          sx={styles.loadMoreButton}
        >
          <Text>Load more...</Text>
        </Box>
      )}
      
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
            {images.length > 1 && (
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
              image={getImage(images[activeImage].src)}
              alt={images[activeImage].alt}
              sx={styles.modalImage}
              imgStyle={{ objectFit: 'contain' }}
            />
            
            {/* Caption */}
            {images[activeImage].alt && (
              <Box sx={styles.captionBar}>
                {images[activeImage].alt}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

// Export the component wrapped with default content
export default WithDefaultContent(DirectoryImageGallery);