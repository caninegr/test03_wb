import React from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import Divider from '@solid-ui-components/Divider'
import Reveal from '@solid-ui-components/Reveal'
import ListItem from '@solid-ui-components/ListItem'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import Icon from '@solid-ui-components/ContentIcon'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const styles = {
  listItem: {
    flex: `1 1 0`,
    minWidth: 300,
    p: 3
  },
  itemDescription: {
    flexBasis: `3/5`,
    flexGrow: 1,
    order: [1, null, 0],
    mb: 3
  }
}

const FeaturesBlock05 = ({ content: { text, collection } }) => (
  <Container 
    as={Reveal}
    sx={{
      maxWidth: ['100%', '90%', '1400px'], // Wider container: mobile full-width, tablet 90%, desktop 1400px (up from ~1200px default)
      px: [3, 4, 5] // More horizontal padding on larger screens
    }}
  >
    <Box sx={{ textAlign: `center` }}>
      <ContentText content={text} />
    </Box>
    {collection && (
      <>
        <Divider />
        <Flex sx={{ flexWrap: `wrap` }} m={-3}>
          {collection.map(
            ({ text, icon, images, collection, buttons, container }, index) => (
              <Reveal
                key={`item-${index}`}
                effect='fadeInGrow'
                delay={0.15 * (index + 1)}
                css={css(styles.listItem)}
              >
                <Box
                  sx={{
                    height: `full`,
                    overflow: 'hidden',
                    borderRadius: 'default',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
                  }}
                >
                  {/* Image section - larger and more prominent */}
                  {images && (
                    <Box sx={{ 
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%'
                    }}>
                      <ContentImages 
                        content={{ images }}
                        sx={{
                          width: '100%',
                          '& > *': {
                            width: '100%',
                            margin: 0,
                            padding: 0
                          },
                          '& img': {
                            width: '100% !important',
                            height: ['320px', '360px', '400px'], // INCREASED: 320px mobile, 360px tablet, 400px desktop
                            objectFit: 'cover',
                            display: 'block',
                            margin: 0,
                            padding: 0,
                            maxWidth: 'none'
                          }
                        }}
                      />
                    </Box>
                  )}
                  
                  {/* Content section - more compact */}
                  <ContentContainer
                    content={container}
                    variant='cards.paper'
                    sx={{ 
                      height: `full`,
                      border: 'none',
                      boxShadow: 'none',
                      borderRadius: images ? '0 0 default default' : 'default',
                      p: [3, 3, 4] // Slightly more compact padding
                    }}
                  >
                    <Icon content={icon} size='md' mr='3' mb='2' /> {/* Reduced bottom margin */}
                    <ContentText 
                      content={text?.[0]} 
                      sx={{ mb: 2 }} // Reduced margin below title
                    />
                    <Flex sx={{ alignItems: `center`, flexWrap: `wrap` }}>
                      <ContentText
                        content={text?.slice(1)}
                        sx={{
                          ...styles.itemDescription,
                          mb: 2 // Reduced margin
                        }}
                        mt={[2, null, 0]} // Reduced top margin
                      />
                      {collection && (
                        <Box sx={{ flexGrow: 1, mr: [3, null, 0] }}>
                          {collection.map((props, index) => (
                            <ListItem key={`item-${index}`} {...props} compact />
                          ))}
                        </Box>
                      )}
                    </Flex>
                    {buttons && (
                      <>
                        <Divider space={2} /> {/* Reduced divider space */}
                        <ContentButtons content={buttons} />
                      </>
                    )}
                  </ContentContainer>
                </Box>
              </Reveal>
            )
          )}
        </Flex>
      </>
    )}
  </Container>
)

export default WithDefaultContent(FeaturesBlock05)