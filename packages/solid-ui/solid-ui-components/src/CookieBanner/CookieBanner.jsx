import React, { useState, useEffect } from 'react'
import { Box, Flex, Text } from 'theme-ui'
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'

const CookieBanner = ({ forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Load existing preferences from localStorage
    const existingAnalytics = localStorage.getItem('gatsby-gdpr-google-analytics')
    const existingMarketing = localStorage.getItem('gatsby-gdpr-facebook-pixel')
    const hasDeclined = localStorage.getItem('gatsby-gdpr-declined')
    
    console.log('Loading preferences:', { existingAnalytics, existingMarketing, hasDeclined, forceShow }) // Debug log
    
    // Update preferences state with existing values
    if (existingAnalytics || existingMarketing || hasDeclined) {
      const loadedPreferences = {
        necessary: true, // Always true
        analytics: existingAnalytics === 'true',
        marketing: existingMarketing === 'true',
      }
      console.log('Setting preferences to:', loadedPreferences) // Debug log
      setPreferences(loadedPreferences)
    }
    
    if (forceShow) {
      // Force show the banner (e.g., from footer link)
      setIsVisible(true)
      setShowSettings(true) // Show settings directly when forced
    } else if (!existingAnalytics && !hasDeclined) {
      // Show banner after a short delay if no consent exists
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [forceShow])

  // Make the banner controllable globally
  useEffect(() => {
    const showCookieBanner = () => {
      setIsVisible(true)
      setShowSettings(true)
    }
    
    // Expose function globally
    window.showCookieBanner = showCookieBanner
    
    return () => {
      delete window.showCookieBanner
    }
  }, [])

  const handleAccept = () => {
    // Remove declined flag
    localStorage.removeItem('gatsby-gdpr-declined')
    
    // Accept all cookies
    localStorage.setItem('gatsby-gdpr-google-analytics', 'true')
    localStorage.setItem('gatsby-gdpr-google-tagmanager', 'true')
    localStorage.setItem('gatsby-gdpr-facebook-pixel', 'true')
    
    console.log('Accepted all cookies') // Debug log
    
    // Initialize tracking
    initializeAndTrack(location)
    
    setIsVisible(false)
  }

  const handleDecline = () => {
    // Decline all non-essential cookies
    localStorage.setItem('gatsby-gdpr-declined', 'true')
    localStorage.setItem('gatsby-gdpr-google-analytics', 'false')
    localStorage.setItem('gatsby-gdpr-google-tagmanager', 'false')
    localStorage.setItem('gatsby-gdpr-facebook-pixel', 'false')
    
    console.log('Declined all cookies') // Debug log
    
    setIsVisible(false)
  }

  const handleSettings = () => {
    setShowSettings(!showSettings)
  }

  const handleClose = () => {
    setIsVisible(false)
    setShowSettings(false)
  }

  const handleSavePreferences = () => {
    // Remove declined flag since user is making a choice
    localStorage.removeItem('gatsby-gdpr-declined')
    
    // Save individual preferences
    localStorage.setItem('gatsby-gdpr-google-analytics', preferences.analytics.toString())
    localStorage.setItem('gatsby-gdpr-google-tagmanager', preferences.analytics.toString())
    localStorage.setItem('gatsby-gdpr-facebook-pixel', preferences.marketing.toString())
    
    console.log('Saved preferences:', preferences) // Debug log
    
    // Initialize tracking only for accepted cookies
    if (preferences.analytics || preferences.marketing) {
      initializeAndTrack(location)
    }
    
    setIsVisible(false)
    setShowSettings(false)
  }

  const togglePreference = (type) => {
    if (type === 'necessary') return // Can't toggle necessary cookies
    
    setPreferences(prev => {
      const newPreferences = {
        ...prev,
        [type]: !prev[type]
      }
      console.log('Toggling preference:', type, 'from', prev[type], 'to', newPreferences[type]) // Debug log
      return newPreferences
    })
  }

  if (!isVisible) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        color: 'white',
        py: 3,
        px: 4,
        boxShadow: '0 -2px 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {!showSettings ? (
          // Simple view
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: ['column', 'column', 'row'],
              gap: [3, 3, 4],
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Text
                sx={{
                  fontSize: [1, 2],
                  lineHeight: 1.4,
                  textAlign: ['center', 'center', 'left'],
                }}
              >
                Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας στον ιστότοπό μας. 
                Συνεχίζοντας την περιήγηση συμφωνείτε με την χρήση τους.{' '}
                <Text
                  as="a"
                  href="/privacy"
                  sx={{
                    color: 'alpha',
                    textDecoration: 'underline',
                    '&:hover': {
                      color: 'alphaDark',
                    },
                  }}
                >
                  Πολιτική Απορρήτου
                </Text>
              </Text>
            </Box>
            
            <Flex
              sx={{
                gap: 2,
                flexWrap: 'nowrap',
                minWidth: 'fit-content',
              }}
            >
              <Box
                as="button"
                onClick={handleDecline}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid white',
                  borderRadius: '4px',
                  color: 'black',
                  px: 2,
                  py: 2,
                  fontSize: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Απόρριψη
              </Box>
              
              <Box
                as="button"
                onClick={handleSettings}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid white',
                  borderRadius: '4px',
                  color: 'black',
                  px: 2,
                  py: 2,
                  fontSize: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Ρυθμίσεις
              </Box>
              
              <Box
                as="button"
                onClick={handleAccept}
                sx={{
                  backgroundColor: 'alphaLight',
                  border: '1px solid white',
                  borderRadius: '4px',
                  color: 'black',
                  px: 2,
                  py: 2,
                  fontSize: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  '&:hover': {
                    //backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backgroundColor: 'alpha',
                  },
                }}
              >
                Αποδοχή
              </Box>
            </Flex>
          </Flex>
        ) : (
          // Settings view
          <Box>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Text sx={{ fontSize: 2, fontWeight: 'bold' }}>
                Ρυθμίσεις Cookies
              </Text>
              <Flex sx={{ gap: 2 }}>
                {forceShow && (
                  <Box
                    as="button"
                    onClick={handleClose}
                    sx={{
                      backgroundColor: 'white',
                      border: '1px solid white',
                      borderRadius: '4px',
                      color: 'black',
                      px: 2,
                      py: 1,
                      fontSize: 1,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'inherit',
                      '&:hover': { 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                  >
                    ✕ Κλείσιμο
                  </Box>
                )}
                <Box
                  as="button"
                  onClick={forceShow ? handleClose : handleSettings}
                  sx={{
                    backgroundColor: 'white',
                    border: '1px solid white',
                    borderRadius: '4px',
                    color: 'black',
                    px: 2,
                    py: 1,
                    fontSize: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  ← Πίσω
                </Box>
              </Flex>
            </Flex>
            
            <Box sx={{ mb: 4 }}>
              {/* Necessary Cookies */}
              <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2, py: 2 }}>
                <Box>
                  <Text sx={{ fontWeight: 'bold', mb: 1 }}>Απαραίτητα Cookies</Text>
                  <Text sx={{ fontSize: 0, opacity: 0.8 }}>
                    Απαραίτητα για τη λειτουργία του ιστότοπου
                  </Text>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 20,
                    backgroundColor: 'beta',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              </Flex>
              
              {/* Analytics Cookies */}
              <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2, py: 2 }}>
                <Box>
                  <Text sx={{ fontWeight: 'bold', mb: 1 }}>Cookies Ανάλυσης</Text>
                  <Text sx={{ fontSize: 0, opacity: 0.8 }}>
                    Μας βοηθούν να κατανοήσουμε πώς χρησιμοποιείτε τον ιστότοπο
                  </Text>
                </Box>
                <Box
                  onClick={() => togglePreference('analytics')}
                  sx={{
                    width: 40,
                    height: 20,
                    backgroundColor: preferences.analytics ? 'beta' : 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: preferences.analytics ? 'flex-end' : 'flex-start',
                    px: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              </Flex>
              
              {/* Marketing Cookies */}
              <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2, py: 2 }}>
                <Box>
                  <Text sx={{ fontWeight: 'bold', mb: 1 }}>Cookies Μάρκετινγκ</Text>
                  <Text sx={{ fontSize: 0, opacity: 0.8 }}>
                    Χρησιμοποιούνται για εξατομικευμένες διαφημίσεις
                  </Text>
                </Box>
                <Box
                  onClick={() => togglePreference('marketing')}
                  sx={{
                    width: 40,
                    height: 20,
                    backgroundColor: preferences.marketing ? 'beta' : 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: preferences.marketing ? 'flex-end' : 'flex-start',
                    px: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      backgroundColor: 'white',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              </Flex>
            </Box>
            
            <Flex sx={{ gap: 2, justifyContent: 'flex-end' }}>
              <Box
                as="button"
                onClick={handleSavePreferences}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid white',
                  borderRadius: '4px',
                  color: 'black',
                  px: 2,
                  py: 2,
                  fontSize: 1,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Αποθήκευση Προτιμήσεων
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default CookieBanner