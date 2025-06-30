import React from 'react'
import { Link as GLink } from 'gatsby'
import { Container, Box, Flex } from 'theme-ui'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
//import PoweredByGatsby from '@solid-ui-components/PoweredByGatsby'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  wrapper: {
    position: `relative`,
    bg: `footerBg`
  },
  footer: {
    flexDirection: [`column-reverse`, `row`],
    justifyContent: `space-between`,
    alignItems: [`center`, `flex-start`],
    py: 5
  }
}

const FooterBlock01 = ({ content: { images, collection } }) => {
  // Handle cookie policy link click
  const handleFooterClick = (e) => {
    //console.log('Footer clicked:', e.target.textContent) // Debug log
    
    // Check if the clicked element or its text content contains "Cookie Policy"
    if (e.target.textContent === "Ρυθμίσεις Cookies" || 
        e.target.innerText === "Ρυθμίσεις Cookies" ||
        e.target.textContent?.includes("Ρυθμίσεις Cookies")) {
      
      //console.log('Cookie Policy clicked!') // Debug log
      e.preventDefault()
      e.stopPropagation()
      
      if (typeof window !== 'undefined' && window.showCookieBanner) {
        //console.log('Calling showCookieBanner') // Debug log
        window.showCookieBanner()
      } else {
        //console.log('showCookieBanner not available') // Debug log
      }
    }
  }

  return (
    <Box sx={styles.wrapper} onClick={handleFooterClick}>
      <Container px='4'>
        <Flex sx={styles.footer}>
          <Box sx={{ minWidth: 200 }}>
            <Box pb='1' mb='2' mt={[4, 0]}>
              <GLink to='/'>
                <ContentImages content={{ images }} imageEffect='fadeIn' />
              </GLink>
            </Box>
            <Box pt='2' mb={[2, 4]}>
              © {new Date().getFullYear()} Cane Sentio, <br />Με επιφύλαξη παντός δικαιώματος.
            </Box>
            {/* <Box>
              <PoweredByGatsby />
            </Box> */}
          </Box>
          {collection?.map(
            ({ text, buttons }, index) =>
              buttons && (
                <Box key={`item-${index}`} mb='3'>
                  <ContentText
                    content={text?.[0]}
                    variant='h5'
                    sx={{ display: [`none`, `block`] }}
                  />
                  <ContentButtons
                    content={buttons}
                    variant='vertical'
                    wrapperStyles={{
                      flexDirection: [null, `column`],
                      flexWrap: `wrap`,
                      justifyContent: `center`
                    }}
                  />
                </Box>
              )
          )}
        </Flex>
      </Container>
    </Box>
  )
}

FooterBlock01.defaultProps = {
  menuJustify: `flex-end`
}

export default WithDefaultContent(FooterBlock01)