// TopNavbar.jsx
import React, { useState, useEffect } from 'react'
import { Container, Box, Flex, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import { AiOutlineHome } from 'react-icons/ai'

const styles = {
  wrapper: {
    position: `relative`,
    zIndex: 20, // Higher than main header's z-index (10)
    '.topnav-container': {
      bg: `#1a202c`, // Dark slate gray background
      position: `relative`,
      borderBottom: 'none', // Removed the border
      // Style for links
      '.button-group-link': {
        color: '#ffffff', // White text for darker backgrounds
        fontWeight: 'medium'
      },
      // Style for active links (black text for white background)
      '.active .button-group-link': {
        color: '#000000', // Black text for active item
        fontWeight: 'bold' // Make active text bold
      },
      // Add small-screen specific fix
      '@media screen and (max-width: 768px)': {
        '& > div': {
          marginBottom: 0
        }
      }
    }
  },
  topnav: {
    justifyContent: `space-between`,
    alignItems: `center`,
    fontSize: 1,
    // On very small screens, stack items vertically
    flexDirection: ['column', 'row', 'row'],
    // Add a little spacing between stacked items
    '& > *:first-of-type': {
      mb: [2, 0, 0]
    },
    // Make icons and text smaller on mobile
    '.button-group-link': {
      fontSize: [2, null, 2]
    },
    '.button-group-icon': {
      width: ['14px', null, '16px'],
      height: ['14px', null, '16px'],
      mr: [1, null, 2]
    },
    // Additional small screen fix
    '@media screen and (max-width: 768px)': {
      marginBottom: 0
    }
  },
  leftMenu: {
    display: [`flex`, null, `flex`],
    minWidth: `auto`,
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },
  rightMenu: {
    display: [`flex`, null, `flex`],
    minWidth: `auto`,
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  mobileVisible: {
    display: [`flex`, null, `flex`],
    justifyContent: 'center'
  }
}

// CSS override for small screens
const smallScreenFix = `
  @media screen and (max-width: 768px) {
    .topnav-container > div {
      margin-bottom: 0 !important;
    }
    .topnav-flex {
      margin-bottom: 0 !important;
    }
    .topnav-flex > div {
      margin-bottom: 0 !important;
    }
    .button-group-button {
      margin-bottom: 0 !important;
    }
  }
`;

const TopNavbar = ({ content: { collection }, leftJustify, rightJustify }) => {
  // Array of background colors for items (added color for home tab)
  const itemColors = ['#2d3748', '#ed8936', '#3182ce', '#7d9951']; // Dark gray for home, then original colors
  
  // State to track the active index
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Effect to determine active tab based on URL path
  useEffect(() => {
    // Only run in the browser, not during server-side rendering
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      
      // Define the paths that correspond to each tab
      // Adjust these to match your actual URL paths
      if (path.includes('boarding')) {
        setActiveIndex(2); // Shifted by 1 due to home tab
      } else if (path.includes('rehab')) {
        setActiveIndex(3); // Shifted by 1 due to home tab
      } else if (path === '/' || path === '') {
        setActiveIndex(0); // Home tab
      } else {
        // Default to Training tab (now index 1)
        setActiveIndex(1);
      }
      
      // Add custom CSS to head for small screens
      const styleEl = document.createElement('style');
      styleEl.innerHTML = smallScreenFix;
      document.head.appendChild(styleEl);
      
      return () => {
        // Clean up style element when component unmounts
        document.head.removeChild(styleEl);
      };
    }
  }, []); // Empty dependency array means this runs once on component mount
  
  // Get existing buttons
  const existingButtons = collection && collection[0] && collection[0].buttons 
    ? collection[0].buttons
    : [];
  
  return (
    <Box css={css(styles.wrapper)}>
      <Container variant='full' className='topnav-container'>
        <Container px='4'>
          <Flex sx={styles.topnav} className="topnav-flex">
            {(existingButtons.length > 0 || true) && (
              <Flex
                sx={{
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pt: 2, // Only top padding, no bottom padding
                  pb: 0, // Explicitly set bottom padding to 0
                  mb: [0, null, null], // Responsive margin - 0 on mobile
                  // CSS for small screens
                  '@media screen and (max-width: 768px)': {
                    marginBottom: 0
                  }
                }}
              >
                {/* Home Tab */}
                <Box
                  key="nav-item-home"
                  className={activeIndex === 0 ? 'active' : ''}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    fontSize: [1, null, 2], // Same fontSize as other tabs
                    flex: '0 0 auto', // Auto-width
                    width: ['40px', null, '50px'], // Fixed small width
                    minWidth: ['40px', null, '50px'],
                    textAlign: 'center', // Same as other tabs
                    bg: activeIndex === 0 ? 'white' : itemColors[0],
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0',
                    ...(activeIndex === 0 ? {
                      borderBottom: '1px dashed #000000',
                      paddingBottom: '6px',
                    } : {}),
                    py: 2, // Same padding as other tabs
                    mx: '0.08rem',
                    boxShadow: activeIndex === 0 ? '0 -2px 5px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    lineHeight: 'normal', // Match text line height
                    minHeight: 'auto', // Let it size naturally like other tabs
                    '&:hover': {
                      opacity: 0.8
                    },
                    // Small screen specific
                    '@media screen and (max-width: 768px)': {
                      marginBottom: 0,
                      width: '35px',
                      minWidth: '35px'
                    }
                  }}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.location.href = '/';
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%'
                    }}
                  >
                    <AiOutlineHome 
                      style={{ 
                        color: activeIndex === 0 ? '#000000' : '#ffffff',
                        fontSize: '16px' // Slightly smaller to fit better
                      }} 
                    />
                  </Box>
                </Box>

                {/* Existing Tabs */}
                {existingButtons.map((item, index) => {
                  const actualIndex = index + 1; // Offset by 1 due to home tab
                  const bgColor = itemColors[actualIndex % itemColors.length];
                  const isActive = actualIndex === activeIndex;
                  
                  return (
                    <Box
                      key={`nav-item-${index}`}
                      className={isActive ? 'active' : ''}
                      sx={{
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: [1, null, 2],
                        flex: '1 1 0', // Equal width for existing tabs
                        textAlign: 'center',
                        bg: isActive ? 'white' : bgColor,
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                        borderBottomLeftRadius: '0',
                        borderBottomRightRadius: '0',
                        ...(isActive ? {
                          borderBottom: '1px dashed #000000',
                          paddingBottom: '6px',
                        } : {}),
                        py: 2,
                        mx: '0.08rem',
                        boxShadow: isActive ? '0 -2px 5px rgba(0,0,0,0.1)' : 'none',
                        // Small screen specific fix
                        '@media screen and (max-width: 768px)': {
                          marginBottom: 0
                        }
                      }}
                    >
                      <ContentButtons content={[item]} />
                    </Box>
                  );
                })}
              </Flex>
            )}
          </Flex>
        </Container>
      </Container>
    </Box>
  )
}

TopNavbar.defaultProps = {
  leftJustify: `flex-start`,
  rightJustify: `flex-end`
}

export default WithDefaultContent(TopNavbar)