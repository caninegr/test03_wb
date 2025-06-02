import React from 'react'
import { Link as GLink } from 'gatsby'
import Sticky from 'react-sticky-el'
import { Container, Box, Flex, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  wrapper: {
    position: `relative`,
    zIndex: 20, // Higher than the regular header
    '.top-nav-container': {
      bg: `alpha`,
      position: `fixed`,
      transition: `all 250ms ease-in`,
      py: 1,
      borderBottom: '1px solid',
      borderColor: 'omegaLighter'
    },
    '.nav-sticky .top-nav-container': {
      bg: `alpha`,
      // Optional shadow for sticky state
      boxShadow: `0 0 15px rgba(140,152,164,.15)`,
      '.button-group-link.level-1, button-group-link.level-1:visited': {
        color: `omegaDark`
      }
    },
    // Make buttons in top navbar smaller
    '.button-group-button': {
      minWidth: 100,
      fontSize: 0,
      px: 2,
      py: 1
    }
  },
  topNav: {
    justifyContent: `flex-end`,
    alignItems: `center`,
    height: ['2rem', '2rem']
  }
}

const TopNavbar = ({ content: { collection } }) => {
  return (
    <>
      <Sticky
        enabled='true'
        stickyClassName='nav-sticky'
        css={css(styles.wrapper)}
      >
        <Container variant='full' className='top-nav-container'>
          <Container px='4'>
            <Flex sx={styles.topNav}>
              {collection && (
                <Box sx={{ display: ['none', null, 'block'], width: '100%' }}>
                  <Reveal effect='fadeInDown'>
                    <Flex
                      sx={{
                        alignItems: `center`,
                        justifyContent: 'flex-end'
                      }}
                    >
                      {collection.map(
                        ({ buttons }, index) =>
                          buttons && (
                            <Box
                              key={`item-${index}`}
                              sx={{
                                '& + &': {
                                  ml: 3
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
      </Sticky>
    </>
  )
}

// Default props
TopNavbar.defaultProps = {
  // Default content structure if needed
}

export default WithDefaultContent(TopNavbar)