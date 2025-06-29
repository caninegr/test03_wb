import React from 'react'
import { Container } from 'theme-ui'
import DirectoryImageGallery from './DirectoryImageGallery'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const DirectoryGalleryBlock = ({ content }) => (
  <Container>
    <DirectoryImageGallery content={content} />
  </Container>
)

export default WithDefaultContent(DirectoryGalleryBlock)