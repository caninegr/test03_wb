import React from 'react'
import { Container, Flex, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const ContentBlock01 = ({ content: { collection }, reverse }) => (
  <Container>
    <Flex
      sx={{
        flexDirection: [
          reverse ? `column-reverse` : `column`,
          null,
          null,
          reverse ? `row-reverse` : `row`
        ]
      }}
    >
      <Box
        sx={{
          flexBasis: [null, null, null, `2/5`],
          [reverse ? 'ml' : 'mr']: [null, null, null, 5],
          position: `relative`,
          textAlign: ['center', 'left']
        }}
      >
        {collection?.[0] && (
          <Reveal effect='fadeInLeft'>
            <Box sx={{ textAlign: ['center', 'left'] }}>
              <ContentText content={collection[0]?.text} ml='0' />
            </Box>
            {collection[0]?.buttons && (
              <>
                <Divider space={3} />
                <Reveal
                  effect='fadeInRight'
                  delay={1}
                  css={css({ 
                    mb: [4, null, null, 0],
                    display: ['none', null, null, 'block'] // Hide on small screens
                  })}
                >
                  <ContentButtons content={collection[0].buttons} />
                </Reveal>
              </>
            )}
          </Reveal>
        )}
      </Box>
      <Box
        sx={{
          flexBasis: `3/5`,
          alignSelf: `center`,
          textAlign: [`center`, null, null, `left`]
        }}
      >
        {collection?.[1] && (
          <Reveal effect='fadeInLeft'>
            <Box sx={{ 
              textAlign: ['center', 'left'],
              lineHeight: 2.1
               }}>
              <ContentText content={collection[1]?.text} ml='0' />
              <Divider space={3} />
              <ContentText content={collection[2]?.text} ml='0' />
            </Box>
            
            {/* Original collection[1] buttons */}
            {collection[1]?.buttons && (
              <>
                <Divider space={3} />
                <Reveal
                  effect='fadeInRight'
                  delay={1}
                  css={css({ mb: [4, null, null, 0] })}
                >
                  <ContentButtons content={collection[1].buttons} />
                </Reveal>
              </>
            )}
            
            {/* collection[0] buttons - only show on small screens */}
            {collection[0]?.buttons && (
              <>
                <Divider space={3} />
                <Reveal
                  effect='fadeInRight'
                  delay={1}
                  css={css({ 
                    mb: [4, null, null, 0],
                    display: ['block', null, null, 'none'] // Show only on small screens
                  })}
                >
                  <ContentButtons content={collection[0].buttons} />
                </Reveal>
              </>
            )}
          </Reveal>
        )}
      </Box>
    </Flex>
  </Container>
)

export default WithDefaultContent(ContentBlock01)