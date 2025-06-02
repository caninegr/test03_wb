import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { Box } from 'theme-ui'

// Define increased height for the top navbar
const TOP_NAVBAR_HEIGHT = '40px';

// Media query breakpoints for responsive font sizing
const breakpoints = {
  small: 576,   // Small devices
  medium: 768,  // Medium devices
  large: 992,   // Large devices
  xlarge: 1200  // Extra large devices
};

// Hard-coded navigation items with different grey shades
const navItems = [
  { text: "Εκπαιδευση", link: "/", bgColor: "#2d3748" },  // Base dark grey
  { text: "Ξενοδοχειο", link: "/boarding", bgColor: "#3a4559" }, // Slightly lighter grey
  { text: "Αποκατασταση", link: "/homepage/saas", bgColor: "#475469" } // Even lighter grey
];

// Styles as plain JavaScript objects for complete control
const styles = {
  // Wrapper for the entire navbar
  /*
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: TOP_NAVBAR_HEIGHT,
    backgroundColor: '#1a202c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    width: '100%',
    padding: 0,
    boxSizing: 'border-box', // Add this
    overflowX: 'hidden' // Prevent horizontal scroll
  },
  container: {
    width: '100%',
    maxWidth: '100vw', // Use viewport width instead of fixed pixel value
    margin: '0 auto',
    padding: '0',
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%',
    boxSizing: 'border-box' // Include padding in width
  },
  */
  
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: TOP_NAVBAR_HEIGHT,
    backgroundColor: '#1a202c', // Darker background for contrast with item greys
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the container
    zIndex: 20,
    width: '100%',
    padding: 0 // Remove any padding
  },
  // Container for alignment - match the header width
  container: {
    width: '100%',
    maxWidth: '1400px', // Match the header's max-width
    margin: '0 auto', // Center the container
    padding: '0 0px', // Match the header's padding
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%' // Full height
  },
  

  // List of navigation items
  navList: {
    display: 'flex',
    alignItems: 'stretch', // Stretch to full height
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '100%', // Take full width to allow spacing
    height: '100%' // Full height
  },
  // Individual navigation item with specific background color
  navItem: (bgColor, isActive) => ({
    margin: 0, // Remove margin
    padding: 0, // Remove padding
    // Each item takes equal width with no constraints
    flex: '1 1 0',
    backgroundColor: bgColor, // Different grey shade
    height: '100%', // Full height
    display: 'flex', // Flex to allow child to take full height
    alignItems: 'stretch', // Stretch to full height
    borderTop: '1px solid black',
    borderRight: '1px solid black',
    borderBottom: isActive ? '1px dashed white' : '1px solid black', // Dashed bottom border for active items
    borderLeft: '1px solid black',
    borderTopLeftRadius: isActive ? '8px' : '0', // Rounded corner for active items
    borderTopRightRadius: isActive ? '8px' : '0', // Rounded corner for active items
    overflow: 'hidden', // Ensure content respects the rounded corners
  }),
  // Navigation link - normal state
  navLink: {
    color: 'white',
    textDecoration: 'none',
    opacity: 0.85,
    // fontSize is now applied dynamically via getResponsiveFontSize()
    // Using system font stack instead of Roboto
    fontWeight: '300', // Light weight
    padding: '0 25px', // Horizontal padding only
    transition: 'all 0.2s ease',
    textAlign: 'center', // Center the text
    textTransform: 'uppercase',
    // letterSpacing is now applied dynamically via getResponsiveLetterSpacing()
    // Take full width and height of parent
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    // Ensure proper vertical centering
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  // Navigation link - hover state
  navLinkHover: {
    opacity: 1,
    color: 'white'
  },
  // Navigation link - active state
  navLinkActive: {
    backgroundColor: '#ffffff',
    color: '#2d3748',
    fontWeight: '800', // Medium weight for active items
    opacity: 1,
    borderTopLeftRadius: '7px', // Match the container's rounded corners
    borderTopRightRadius: '7px', // Match the container's rounded corners
  },
  // Invisible spacer to prevent layout shift
  spacer: {
    height: TOP_NAVBAR_HEIGHT,
    visibility: 'hidden'
  }
};

const TopNavbar = () => {
  // Track the current path to determine active page
  const [currentPath, setCurrentPath] = useState('');
  // State to track window width for responsive font sizing
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  
  // Update current path and window size on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
      setWindowWidth(window.innerWidth);
      
      // Listen for navigation changes
      const handleLocationChange = () => {
        setCurrentPath(window.location.pathname);
      };
      
      // Handle window resize events
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      window.addEventListener('popstate', handleLocationChange);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('popstate', handleLocationChange);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  
  // Calculate responsive font size based on window width
  const getResponsiveFontSize = () => {
    if (windowWidth < breakpoints.small) {
      return '11px'; // Smallest screens
    } else if (windowWidth < breakpoints.medium) {
      return '12px'; // Small screens
    } else if (windowWidth < breakpoints.large) {
      return '13px'; // Medium screens
    } else if (windowWidth < breakpoints.xlarge) {
      return '14px'; // Large screens
    } else {
      return '15px'; // Extra large screens
    }
  };
  
  // Calculate responsive letter spacing based on window width
  const getResponsiveLetterSpacing = () => {
    if (windowWidth < breakpoints.medium) {
      return '0.5px'; // Smaller screens
    } else {
      return '1px'; // Larger screens
    }
  };
  
  // Determine if a link is active
  const isActive = (path) => {
    if (path === '/' && currentPath === '/') {
      return true;
    }
    return path !== '/' && currentPath.startsWith(path);
  };

  return (
    <>
      {/* Add invisible spacer with same height to prevent layout shift */}
      <div style={styles.spacer} />
      
      {/* Fixed position top navbar */}
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <ul style={styles.navList}>
            {navItems.map((item, index) => (
              <li 
                key={index} 
                style={styles.navItem(item.bgColor, isActive(item.link))}
              >
                <Link 
                  to={item.link}
                  style={{
                    ...styles.navLink,
                    ...(isActive(item.link) ? styles.navLinkActive : {}),
                    fontSize: getResponsiveFontSize(),
                    letterSpacing: getResponsiveLetterSpacing()
                  }}
                  onMouseEnter={(e) => {
                    // Apply hover styles
                    if (isActive(item.link)) {
                      // Don't change text color for active items on hover
                      e.currentTarget.style.opacity = 1;
                    } else {
                      Object.assign(e.currentTarget.style, styles.navLinkHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    // Remove hover styles
                    if (isActive(item.link)) {
                      // Keep active styles
                      e.currentTarget.style.opacity = 1;
                    } else {
                      e.currentTarget.style.opacity = 0.8;
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Export a invisible Box component for Theme UI layout integration */}
      <Box sx={{ height: TOP_NAVBAR_HEIGHT, visibility: 'hidden' }} />
    </>
  )
}

// For compatibility with your header positioning
export const TOP_NAVBAR_HEIGHT_EXACT = TOP_NAVBAR_HEIGHT;

export default TopNavbar;