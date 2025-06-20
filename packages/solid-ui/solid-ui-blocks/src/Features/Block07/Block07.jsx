import React from 'react'
import { Container, Flex, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentContainer from '@solid-ui-components/ContentContainer'
import ContentText from '@solid-ui-components/ContentText'
import ListItem from '@solid-ui-components/ListItem'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const FeaturesBlock06 = ({ content: { text = [], collection, buttons } }) => (
  <Container sx={{ textAlign: `center` }}>
    <Box>
      <ContentText content={text} />
    </Box>
    {collection && (
      <>
        <Divider />
        <Reveal effect='fadeInDown'>
          <Flex sx={{ justifyContent: `center`, flexWrap: `wrap`, m: -3 }}>
            {collection.map(({ container, images, ...props }, index) => (
              <Box
                key={`item-${index}`}
                sx={{ flexBasis: [`1`, `1/2`, null, `1/4`], p: 3 }}
              >
                <ContentContainer content={container}>
                  {/* Add image above the ListItem */}
                  {images && (
                    <Box sx={{ 
                      mb: 3, 
                      mx: -3, // Negative margin to counteract container padding
                      mt: -3, // Negative margin to touch top edge
                      borderRadius: 'default', 
                      overflow: 'hidden' 
                    }}>
                      <ContentImages 
                        content={{ images }} 
                        sx={{
                          '& img': {
                            width: '100%',
                            height: '160px',
                            objectFit: 'cover',
                            borderRadius: 'default',
                            display: 'block' // Remove any inline spacing
                          }
                        }}
                      />
                    </Box>
                  )}
                  <ListItem
                    {...props}
                    iconProps={{ round: true }}
                    vertical
                    center
                  />
                </ContentContainer>
              </Box>
            ))}
          </Flex>
        </Reveal>
      </>
    )}
    {buttons && (
      <>
        <Divider space={3} />
        <ContentButtons content={buttons} />
      </>
    )}
  </Container>
)

export default WithDefaultContent(FeaturesBlock06)