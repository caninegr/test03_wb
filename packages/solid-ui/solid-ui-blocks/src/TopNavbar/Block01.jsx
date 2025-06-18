// TopNavbar.jsx
import React, { useState, useEffect } from 'react'
import { Container, Box, Flex, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import { ImHome } from 'react-icons/im'

const styles = {
  wrapper: {
    position: `relative`,
    zIndex: 20,
    '.topnav-container': {
      bg: `#1a202c`,
      position: `relative`,
      borderBottom: 'none',
      '.button-group-link': {
        color: '#ffffff',
        fontWeight: 'medium'
      },
      '.active .button-group-link': {
        color: '#000000',
        fontWeight: 'bold'
      },
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
    flexDirection: ['column', 'row', 'row'],
    '& > *:first-of-type': {
      mb: [2, 0, 0]
    },
    '.button-group-link': {
      fontSize: [2, null, 2]
    },
    '.button-group-icon': {
      width: ['14px', null, '16px'],
      height: ['14px', null, '16px'],
      mr: [1, null, 2]
    },
    '@media screen and (max-width: 768px)': {
      marginBottom: 0
    }
  }
}

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
  // Tab background colors
  const tabColors = {
    home: '#718096',     // Light gray
    //training: '#ed8936', // Orange  
    //boarding: '#3182ce', // Blue
    //rehab: '#7d9951'     // Green
    training: 'betaDarker', // Orange  
    boarding: 'gammaDarker', // Blue
    rehab: 'alphaDarker'     // Green    
  };

  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const determineActiveTab = () => {
        const pathname = window.location.pathname;
        
        if (pathname === '/' || pathname === '') {
          setActiveTab('home');
        } else if (pathname.includes('training')) {
          setActiveTab('training');
        } else if (pathname.includes('services')) {
          setActiveTab('boarding');
        } else if (pathname.includes('rehab')) {
          setActiveTab('rehab');
        } else {
          setActiveTab('home'); // fallback
        }
      };

      determineActiveTab();
      
      // Add CSS
      const styleEl = document.createElement('style');
      styleEl.innerHTML = smallScreenFix;
      document.head.appendChild(styleEl);

      return () => {
        if (document.head.contains(styleEl)) {
          document.head.removeChild(styleEl);
        }
      };
    }
  }, []);

  const handleHomeClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  // Get buttons from collection
  const buttons = collection && collection[0] && collection[0].buttons ? collection[0].buttons : [];

  return (
    <Box css={css(styles.wrapper)}>
      <Container variant='full' className='topnav-container'>
        <Container px='4'>
          <Flex sx={styles.topnav} className="topnav-flex">
            <Flex
              sx={{
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 2,
                pb: 0,
                mb: [0, null, null],
                '@media screen and (max-width: 768px)': {
                  marginBottom: 0
                }
              }}
            >
              {/* Home Tab */}
              <Box
                onClick={handleHomeClick}
                sx={{
                  // Basic layout
                  width: ['35px', '42px', '48px'], // Updated to match your version
                  minWidth: ['35px', '42px', '48px'],
                  maxWidth: ['35px', '42px', '48px'], // Force max width
                  textAlign: 'center',
                  cursor: 'pointer',
                  
                  // Styling with !important overrides
                  bg: activeTab === 'home' ? 'white !important' : '#ed8936 !important', // Orange color to match training tab
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  borderBottomLeftRadius: '0',
                  borderBottomRightRadius: '0',
                  
                  // Spacing
                  py: 2,
                  px: [1, 1, 2],
                  mx: ['0.04rem', '0.06rem', '0.08rem'],
                  
                  // Height and alignment - force consistency
                  minHeight: ['36px !important', '38px !important', '39px !important'],
                  maxHeight: ['36px', '38px', '39px'],
                  height: ['36px', '38px', '39px'],
                  display: 'flex !important',
                  alignItems: 'center !important',
                  justifyContent: 'center !important',
                  
                  // Active state
                  ...(activeTab === 'home' ? {
                    borderBottom: '1px dashed #000000',
                    paddingBottom: '6px',
                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                  } : {}),
                  
                  // Override any potential interference
                  fontSize: 'inherit !important',
                  fontFamily: 'inherit !important',
                  lineHeight: 'normal !important',
                  
                  '&:hover': {
                    opacity: 0.8
                  },

                  // Force overrides for any page-specific CSS
                  '&, & > *': {
                    boxSizing: 'border-box !important'
                  }
                }}
                className={activeTab === 'home' ? 'active' : ''}
              >
                <ImHome 
                  size={20}
                  color={activeTab === 'home' ? '#000000' : '#ffffff'}
                  style={{
                    width: '20px !important', // Updated to match size prop
                    height: '20px !important',
                    fontSize: '20px !important',
                    minWidth: '20px !important',
                    minHeight: '20px !important',
                    maxWidth: '20px !important',
                    maxHeight: '20px !important',
                    flexShrink: '0 !important',
                    display: 'block !important',
                    fontWeight: 'bold'
                  }}
                />
              </Box>

              {/* Training Tab */}
              <Box
                className={activeTab === 'training' ? 'active' : ''}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 2],
                  flex: '1 1 0',
                  textAlign: 'center',
                  bg: activeTab === 'training' ? 'white' : tabColors.training,
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  borderBottomLeftRadius: '0',
                  borderBottomRightRadius: '0',
                  ...(activeTab === 'training' ? {
                    borderBottom: '1px dashed #000000',
                    paddingBottom: '6px',
                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                  } : {}),
                  py: 2,
                  px: [1, 2, 2],
                  mx: ['0.04rem', '0.06rem', '0.08rem'],
                  minHeight: ['36px', '38px', '39px'],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ContentButtons content={buttons.length > 0 ? [buttons[0]] : [{ text: "Training", type: "PAGE", link: "/training/", variant: "links.nav-light" }]} />
              </Box>

              {/* Boarding Tab */}
              <Box
                className={activeTab === 'boarding' ? 'active' : ''}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 2],
                  flex: '1 1 0',
                  textAlign: 'center',
                  bg: activeTab === 'boarding' ? 'white' : tabColors.boarding,
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  borderBottomLeftRadius: '0',
                  borderBottomRightRadius: '0',
                  ...(activeTab === 'boarding' ? {
                    borderBottom: '1px dashed #000000',
                    paddingBottom: '6px',
                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                  } : {}),
                  py: 2,
                  px: [1, 2, 2],
                  mx: ['0.04rem', '0.06rem', '0.08rem'],
                  minHeight: ['36px', '38px', '39px'],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ContentButtons content={buttons.length > 1 ? [buttons[1]] : [{ text: "Boarding", type: "PAGE", link: "/services/", variant: "links.nav-light" }]} />
              </Box>

              {/* Rehab Tab */}
              <Box
                className={activeTab === 'rehab' ? 'active' : ''}
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: [0, 1, 2],
                  flex: '1 1 0',
                  textAlign: 'center',
                  bg: activeTab === 'rehab' ? 'white' : tabColors.rehab,
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  borderBottomLeftRadius: '0',
                  borderBottomRightRadius: '0',
                  ...(activeTab === 'rehab' ? {
                    borderBottom: '1px dashed #000000',
                    paddingBottom: '6px',
                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                  } : {}),
                  py: 2,
                  px: [1, 2, 2],
                  mx: ['0.04rem', '0.06rem', '0.08rem'],
                  minHeight: ['36px', '38px', '39px'],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ContentButtons content={buttons.length > 2 ? [buttons[2]] : [{ text: "Rehab", type: "PAGE", link: "/rehab/", variant: "links.nav-light" }]} />
              </Box>
            </Flex>
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