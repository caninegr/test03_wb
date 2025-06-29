// TopNavbar.jsx - Fixed version for mobile gaps
import React, { useState, useEffect } from 'react'
import { Container, Box, Flex, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import { ImHome } from 'react-icons/im'

// In your TopNavbar component, update the styles object:

const styles = {
  wrapper: {
    position: `relative`,
    zIndex: 20,
    
    // ADD: Desktop margin fix
    '@media screen and (min-width: 1024px)': {
      '.topnav-container, .topnav-container > *, .topnav-flex, .topnav-flex > *, .topnav-flex > * > *': {
        marginBottom: '0px !important'
      }
    },
    
    '.topnav-container': {
      bg: `#1a202c`,
      position: `relative`,
      borderBottom: 'none',
      marginBottom: 0,
      paddingBottom: 0,
      '.button-group-link': {
        color: '#ffffff',
        fontWeight: 'medium'
      },
      '.active .button-group-link': {
        color: '#000000',
        fontWeight: 'bold'
      }
    }
  },
  topnav: {
    justifyContent: `space-between`,
    alignItems: `center`,
    fontSize: 1,
    flexDirection: 'row',
    '& > *:first-of-type': {
      mb: 0
    },
    '.button-group-link': {
      fontSize: [2, null, 2]
    },
    '.button-group-icon': {
      width: ['14px', null, '16px'],
      height: ['14px', null, '16px'],
      mr: [1, null, 2]
    },
    marginBottom: 0,
    paddingBottom: 0
  }
}

// Remove the problematic client-side CSS injection completely
// const smallScreenFix = `...` // DELETE THIS

const TopNavbar = ({ content: { collection }, leftJustify, rightJustify }) => {
  // Tab background colors
  const tabColors = {
    home: '#718096',
    training: 'betaDarker',
    boarding: 'gammaDarker', 
    rehab: 'alphaDarker'
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
        } else if (pathname.includes('boarding')) {
          setActiveTab('boarding');
        } else if (pathname.includes('rehab')) {
          setActiveTab('rehab');
        } else {
          setActiveTab('home');
        }
      };

      determineActiveTab();
      
      // REMOVE ALL CSS INJECTION - this was causing hydration mismatches
      // No more document.createElement('style') or appendChild
    }
  }, []);

  const handleHomeClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

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
                // FIX: Consistent padding across all breakpoints
                pt: 2,
                pb: 0,
                mb: 0, // Force margin-bottom to 0
                // Remove mobile-specific overrides that cause hydration issues
                marginBottom: 0,
                paddingBottom: 0
              }}
            >
              {/* Home Tab */}
              <Box
                onClick={handleHomeClick}
                sx={{
                  width: ['35px', '42px', '48px'],
                  minWidth: ['35px', '42px', '48px'],
                  maxWidth: ['35px', '42px', '48px'],
                  textAlign: 'center',
                  cursor: 'pointer',
                  
                  bg: activeTab === 'home' ? 'white' : '#ed8936',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                  borderBottomLeftRadius: '0',
                  borderBottomRightRadius: '0',
                  
                  py: 2,
                  px: [1, 1, 2],
                  mx: ['0.04rem', '0.06rem', '0.08rem'],
                  
                  // FIX: Consistent heights to prevent layout shifts
                  minHeight: ['36px', '38px', '39px'],
                  maxHeight: ['36px', '38px', '39px'],
                  height: ['36px', '38px', '39px'],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  
                  ...(activeTab === 'home' ? {
                    borderBottom: '1px dashed #000000',
                    paddingBottom: '6px',
                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                  } : {}),
                  
                  '&:hover': {
                    opacity: 0.8
                  },

                  boxSizing: 'border-box',
                  // Remove any potential margins
                  margin: ['0.04rem', '0.06rem', '0.08rem']
                }}
                className={activeTab === 'home' ? 'active' : ''}
              >
                <ImHome 
                  size={20}
                  color={activeTab === 'home' ? '#000000' : '#ffffff'}
                  style={{
                    width: '20px',
                    height: '20px',
                    fontSize: '20px',
                    minWidth: '20px',
                    minHeight: '20px',
                    maxWidth: '20px',
                    maxHeight: '20px',
                    flexShrink: '0',
                    display: 'block',
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
                <ContentButtons content={buttons.length > 1 ? [buttons[1]] : [{ text: "Boarding", type: "PAGE", link: "/boarding/", variant: "links.nav-light" }]} />
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