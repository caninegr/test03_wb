// TopNavbar.jsx
import React, { useState, useEffect } from 'react'
import { Container, Box, Flex, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

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
  // Array of background colors for items
  const itemColors = ['#ed8936', '#3182ce', '#7d9951']; // Orange, Medium blue, Light peanut green
  
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
        setActiveIndex(1);
      } else if (path.includes('rehab')) {
        setActiveIndex(2);
      } else {
        // Default to Training tab for home page or any other page
        setActiveIndex(0);
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
  
  return (
    <Box css={css(styles.wrapper)}>
      <Container variant='full' className='topnav-container'>
        <Container px='4'>
          <Flex sx={styles.topnav} className="topnav-flex">
            {collection && collection[0] && collection[0].buttons && collection[0].buttons.length > 0 && (
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
                {collection[0].buttons.map((item, index) => {
                  // Get the color for this item
                  const bgColor = itemColors[index % itemColors.length];
                  const isActive = index === activeIndex;
                  
                  return (
                    <Box
                      key={`nav-item-${index}`}
                      className={isActive ? 'active' : ''}
                      sx={{
                        textTransform: 'uppercase', // All caps
                        fontWeight: 'bold',
                        fontSize: [1, null, 2],
                        flex: '1 1 0', // Equal width
                        textAlign: 'center', // Center text within each item
                        bg: isActive ? 'white' : bgColor, // White background for active, colors for others
                        borderTopLeftRadius: '4px', // Rounded top-left corner only
                        borderTopRightRadius: '4px', // Rounded top-right corner only
                        borderBottomLeftRadius: '0', // Square bottom-left corner
                        borderBottomRightRadius: '0', // Square bottom-right corner
                        ...(isActive ? {
                          borderBottom: '1px dashed #000000', // Dashed bottom border for active item
                          paddingBottom: '6px', // Add padding to make the border visible
                        } : {}),
                        py: 2, // Vertical padding
                        mx: '0.08rem', // Horizontal margin for spacing
                        boxShadow: isActive ? '0 -2px 5px rgba(0,0,0,0.1)' : 'none', // Optional: shadow for active tab
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