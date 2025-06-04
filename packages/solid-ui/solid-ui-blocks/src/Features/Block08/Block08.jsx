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
  <Container as={Reveal}>
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
                  {/* Image section - full width, outside ContentContainer */}
                  {images && (
                    <Box sx={{ 
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%' // Ensure full width
                    }}>
                      <ContentImages 
                        content={{ images }}
                        sx={{
                          width: '100%', // Full width container
                          '& > *': {
                            width: '100%', // Any wrapper elements
                            margin: 0,
                            padding: 0
                          },
                          '& img': {
                            width: '100% !important', // Force full width
                            height: '280px', // INCREASED from 180px to 280px
                            objectFit: 'cover',
                            display: 'block',
                            margin: 0,
                            padding: 0,
                            maxWidth: 'none' // Override any max-width constraints
                          }
                        }}
                      />
                    </Box>
                  )}
                  
                  {/* Content section - with proper padding */}
                  <ContentContainer
                    content={container}
                    variant='cards.paper'
                    sx={{ 
                      height: `full`,
                      border: 'none',
                      boxShadow: 'none',
                      borderRadius: images ? '0 0 default default' : 'default'
                    }}
                  >
                    <Icon content={icon} size='md' mr='3' mb='3' />
                    <ContentText content={text?.[0]} />
                    <Flex sx={{ alignItems: `center`, flexWrap: `wrap` }}>
                      <ContentText
                        content={text?.slice(1)}
                        sx={styles.itemDescription}
                        mt={[3, null, 0]}
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
                        <Divider space={3} />
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