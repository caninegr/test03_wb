import React from 'react'
import { MDXProvider } from '@theme-ui/mdx'
import components from '@components/Mdx'

export const PostBody = ({ body }) => {
  return (
    <MDXProvider components={components}>
      {body}
    </MDXProvider>
  )
}
