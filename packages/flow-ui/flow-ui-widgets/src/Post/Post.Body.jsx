import React from 'react'
import { MDXProvider } from '@theme-ui/mdx'
import { Box } from 'theme-ui'
import components from '@components/Mdx'

export const PostBody = ({ body }) => {
  return (
    <MDXProvider components={components}>
      <Box sx={{
        'p': { mb: 4, lineHeight: 1.7 },
        'h1, h2, h3, h4, h5, h6': { mt: 4, mb: 3 },
        'ul, ol': { mb: 4, pl: 4 },
        'li': { mb: 2 },
        'pre': { mb: 4 },
        'code': { fontSize: '0.9em' },
        'blockquote': { mb: 4, pl: 4, borderLeft: '4px solid', borderColor: 'primary' }
      }}>
        {body}
      </Box>
    </MDXProvider>
  )
}
