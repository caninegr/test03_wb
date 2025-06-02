import React from 'react'
import { Link as GLink } from 'gatsby'
import { Container, Box, Flex, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

// Define consistent height for the top navbar
const TOP_NAVBAR_HEIGHT = ['32px', '32px', '32px']; // [mobile, tablet, desktop]
const TOP_NAVBAR_HEIGHT_EXACT = '32px'; // For the main header positioning

// OPTION 2: Dark Background with HeaderBg Active Background (Left-Aligned)
const styleOption2 = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    height: TOP_NAVBAR_HEIGHT,
    '.top-nav-container': {
      bg: 'omegaDarker', // Dark background
      width: '100%',
      transition: 'all 250ms ease-in',
      borderBottom: 'none',
      height: TOP_NAVBAR_HEIGHT
    },
    // Style for all links including visited
    '.button-group-link, .button-group-link:visited': {
      fontSize: [0, 0, 0],
      fontWeight: 'normal',
      mx: [1, 1, 2],
      whiteSpace: 'nowrap',
      position: 'relative',
      color: 'white', // Light text for all states
      transition: 'all 0.2s ease',
      opacity: 0.8,
      padding: '0px 8px', // Add padding for background
      borderRadius: '3px', // Rounded corners
      
      '&:hover': {
        opacity: 1,
        color: 'white' // Ensure hover color is consistent
      }
    },
    // Additional styles for active page with HeaderBg background
    '.button-group-link.active-page, .button-group-link.active-page:visited': {
      color: 'omegaDarker', // Dark text for contrast with headerBg background
      fontWeight: 'bold',
      opacity: 1,
      bg: `headerBg`, // Background uses headerBg from theme
      
      // Ensure hover state for active items is also consistent
      '&:hover': {
        color: 'omegaDarker', // Keep text dark on hover for active items
        opacity: 1
      },
      
      // Remove the underline since we now have a background
      '&:after': {
        display: 'none'
      }
    }
  },
  topNav: {
    justifyContent: `flex-start`, // Left alignment
    alignItems: `center`,
    height: TOP_NAVBAR_HEIGHT
  }
};

// We're using styleOption2 as default
const styles = styleOption2;

const TopNavbar = ({ content: { collection } }) => {
  // Track the current path to determine active page
  const [currentPath, setCurrentPath] = React.useState('/');
  
  // Update current path on client-side
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      
      // Listen for navigation changes (useful for SPA navigation)
      const handleLocationChange = () => {
        setCurrentPath(window.location.pathname);
      };
      
      window.addEventListener('popstate', handleLocationChange);
      return () => window.removeEventListener('popstate', handleLocationChange);
    }
  }, []);
  
  // Add active-page class to links that match current path
  React.useEffect(() => {
    if (typeof document !== 'undefined' && currentPath) {
      // Get all links in the top navbar
      const links = document.querySelectorAll('.top-nav-container .button-group-link');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Special case for home page
        if (href === '/' && currentPath === '/') {
          link.classList.add('active-page');
        }
        // For other pages, check if current path starts with the link's path
        else if (href && href !== '/' && currentPath.startsWith(href)) {
          link.classList.add('active-page');
        } else {
          link.classList.remove('active-page');
        }
      });
    }
  }, [currentPath]);

  return (
    <>
      {/* Add invisible spacer with same height to prevent layout shift */}
      <Box sx={{ height: TOP_NAVBAR_HEIGHT, visibility: 'hidden' }} />
      
      {/* Fixed position top navbar */}
      <Box css={css(styles.wrapper)}>
        <Container variant='full' className='top-nav-container'>
          <Container px={[2, 3, 4]}>
            <Flex sx={styles.topNav}>
              {collection && (
                <Box sx={{ width: '100%' }}>
                  <Reveal effect='fadeInDown'>
                    <Flex
                      sx={{
                        alignItems: `center`,
                        justifyContent: 'flex-start',
                        fontSize: [0, 0, 1],
                        // Adjust these values to match your logo position
                        pl: ['16px', '24px', '40px', '48px']
                      }}
                    >
                      {collection.map(
                        ({ buttons }, index) =>
                          buttons && (
                            <Box
                              key={`item-${index}`}
                              sx={{
                                '& + &': {
                                  ml: [1, 2, 3]
                                }
                              }}
                            >
                              <ContentButtons content={buttons} />
                            </Box>
                          )
                      )}
                    </Flex>
                  </Reveal>
                </Box>
              )}
            </Flex>
          </Container>
        </Container>
      </Box>
    </>
  )
}

// Default props
TopNavbar.defaultProps = {
  collection: [
    {
      buttons: [
        {
          type: "PAGE",
          text: "Dog Training",
          link: "/"
        },
        {
          type: "PAGE",
          text: "Dog Boarding",
          link: "/boarding"
        },
        {
          type: "PAGE",
          text: "E-shop",
          link: "/homepage/saas"
        }
      ]
    }
  ]
}

// Global styles to apply to the entire application
// This ensures consistent link colors even with browser defaults
const globalStyles = `
  /* Ensure visited links match non-visited links in the top navbar */
  .top-nav-container .button-group-link:visited {
    color: white !important;
    opacity: 0.8;
  }
  
  /* Ensure hover states are consistent */
  .top-nav-container .button-group-link:hover,
  .top-nav-container .button-group-link:visited:hover {
    color: white !important;
    opacity: 1 !important;
  }
  
  /* Ensure active links maintain their styling when visited */
  .top-nav-container .button-group-link.active-page,
  .top-nav-container .button-group-link.active-page:visited {
    color: rgb(51, 51, 51) !important; /* omegaDarker equivalent */
    opacity: 1 !important;
    background-color: var(--theme-ui-colors-headerBg, #ffffff) !important; /* Use headerBg from theme */
  }
  
  /* Ensure hover state for active items */
  .top-nav-container .button-group-link.active-page:hover,
  .top-nav-container .button-group-link.active-page:visited:hover {
    color: rgb(51, 51, 51) !important; /* Keep text dark on hover */
    opacity: 1 !important;
  }
`;

// Inject global styles if we're in a browser environment
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = globalStyles;
  document.head.appendChild(style);
}

// Export the height constant so it can be imported by other components
export { TOP_NAVBAR_HEIGHT_EXACT }
export default WithDefaultContent(TopNavbar)