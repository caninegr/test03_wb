import React, { useRef, useState, useEffect } from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import { ImQuotesRight } from 'react-icons/im'
import { AiFillStar } from 'react-icons/ai'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import Tabs from '@solid-ui-components/Tabs'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  avatar: {
    bg: `omegaLighter`,
    borderTopColor: `omegaLighter`,
    borderTopWidth: `xl`,
    borderTopStyle: `solid`,
    borderRadius: `lg`,
    boxSizing: `content-box`,
    verticalAlign: `baseline`
  }
}

const TestimonialsBlock03 = ({
  content: { text, collection, buttons },
  reverse
}) => {
  // Touch/swipe state
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const isDragging = useRef(false)
  const tabsRef = useRef(null)
  const [currentTab, setCurrentTab] = useState(0)
  const totalTabs = collection?.length || 0

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (totalTabs <= 1) return
    touchStartX.current = e.touches[0].clientX
    isDragging.current = true
  }

  const handleTouchMove = (e) => {
    if (!isDragging.current || totalTabs <= 1) return
    
    // Prevent default only for horizontal swipes to allow vertical scrolling
    const touchCurrentX = e.touches[0].clientX
    const diffX = Math.abs(touchCurrentX - touchStartX.current)
    const diffY = Math.abs(e.touches[0].clientY - touchStartX.current)
    
    if (diffX > diffY && diffX > 10) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = (e) => {
    if (!isDragging.current || totalTabs <= 1) {
      isDragging.current = false
      return
    }

    touchEndX.current = e.changedTouches[0].clientX
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      // Find the tab navigation dots and simulate clicks
      const tabContainer = tabsRef.current
      if (tabContainer) {
        const dots = tabContainer.querySelectorAll('[role="tab"], .tab-dot, button[aria-selected]')
        
        if (swipeDistance > 0) {
          // Swiped left - go to next tab
          const nextIndex = (currentTab + 1) % totalTabs
          if (dots[nextIndex]) {
            dots[nextIndex].click()
            setCurrentTab(nextIndex)
          }
        } else {
          // Swiped right - go to previous tab
          const prevIndex = (currentTab - 1 + totalTabs) % totalTabs
          if (dots[prevIndex]) {
            dots[prevIndex].click()
            setCurrentTab(prevIndex)
          }
        }
      }
    }

    isDragging.current = false
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (totalTabs <= 1) return
      
      // Only handle arrow keys when focus is on or within the testimonials
      const tabContainer = tabsRef.current
      if (!tabContainer || !tabContainer.contains(document.activeElement)) {
        return
      }
      
      let targetIndex = currentTab
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          targetIndex = (currentTab - 1 + totalTabs) % totalTabs
          break
        case 'ArrowRight':
          e.preventDefault()
          targetIndex = (currentTab + 1) % totalTabs
          break
        default:
          return
      }
      
      // Find and click the appropriate tab dot
      const dots = tabContainer.querySelectorAll('[role="tab"], .tab-dot, button[aria-selected]')
      if (dots[targetIndex]) {
        dots[targetIndex].click()
        setCurrentTab(targetIndex)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [totalTabs, currentTab])

  return (
    <Container>
      {/* Title and Subtitle Section - Above testimonials */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Reveal effect='fadeInDown'>
          <ContentText content={text} />
          {buttons && (
            <>
              <Divider space={3} />
              <ContentButtons content={buttons} />
            </>
          )}
        </Reveal>
      </Box>

      {/* Testimonials Section - Full width with touch support */}
      <Box 
        ref={tabsRef}
        tabIndex={0} // Make focusable for keyboard navigation
        sx={{ 
          maxWidth: '900px', 
          mx: 'auto',
          touchAction: 'pan-y pinch-zoom', // Allow vertical scrolling but handle horizontal swipes
          userSelect: isDragging.current ? 'none' : 'auto', // Prevent text selection while swiping
          outline: 'none', // Remove focus outline since we're not styling it
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'beta',
            outlineOffset: '2px'
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Testimonials carousel - use arrow keys to navigate"
      >
        <Reveal effect='fadeInUp' delay={0.2}>
          <Tabs variant='dots' position='bottom' space={3} autoplay>
            {collection?.map(({ container, text, avatar }, index) => (
              <ContentContainer
                content={container}
                variant='cards.paper'
                key={`item-${index}`}
                sx={{ position: `relative` }}
              >
                <Flex
                  sx={{
                    alignItems: `center`,
                    position: `relative`,
                    flexWrap: `wrap`,
                    zIndex: 1,
                    flexDirection: ['column', 'row'], // Stack on mobile, side-by-side on desktop
                    textAlign: ['center', 'left']
                  }}
                >
                  <Box sx={{ 
                    width: [120, 150], // Smaller on mobile
                    mb: [3, 0] // Margin bottom on mobile only
                  }}>
                    <ContentImages
                      content={{ images: [avatar] }}
                      sx={styles.avatar}
                      imageEffect='fadeInRotate'
                    />
                  </Box>
                  <Box sx={{ 
                    flex: [`100%`, 1], 
                    ml: [0, 4] // No left margin on mobile
                  }}>
                    <Reveal effect='fadeInUp'>
                      <ContentText content={text} />
                      <Box sx={{ mt: 3 }}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Reveal
                            key={`item-${i}`}
                            effect='fadeInRotate'
                            delay={0.2 * (i + 1)}
                            css={css({ display: `inline-block` })}
                          >
                            <AiFillStar
                              css={css({ color: `beta`, size: `icon.xs`, mr: 1 })}
                            />
                          </Reveal>
                        ))}
                      </Box>
                    </Reveal>
                  </Box>
                </Flex>
                <ImQuotesRight
                  css={css({
                    size: `30%`,
                    color: `omegaLighter`,
                    position: `absolute`,
                    transform: `translate(0, -20%)`,
                    bottom: 0,
                    right: 0,
                    opacity: 0.3 // Make quote mark more subtle
                  })}
                />
              </ContentContainer>
            ))}
          </Tabs>
        </Reveal>

        {/* Navigation instruction hints */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 3, 
          display: ['block', 'none'],
          opacity: 0.6,
          fontSize: 0
        }}>
          <Box as="span" sx={{ color: 'omegaDark' }}>
            Σύρετε αριστερά ή δεξιά για περισσότερες κριτικές
          </Box>
        </Box>

        <Box sx={{ 
          textAlign: 'center', 
          mt: 2, 
          display: ['none', 'block'],
          opacity: 0.6,
          fontSize: 0
        }}>
          <Box as="span" sx={{ color: 'omegaDark' }}>
            Χρησιμοποιήστε τα βελάκια ← → για πλοήγηση
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default WithDefaultContent(TestimonialsBlock03)