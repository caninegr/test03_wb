import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import Header from '@solid-ui-blocks/Header/Block01'
import Content from '@solid-ui-blocks/Content/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import TopNavbar from '@solid-ui-blocks/TopNavbar/Block01'
import CookieBanner from '@solid-ui-components/CookieBanner'

import { normalizeBlockContentNodes } from '@blocks-helpers'
import styles from './_styles'

const PrivacyPage = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

console.log('Terms content:', content['terms-of-use'])

  return (
    <Layout {...props}>
      {/* Header */}
      <TopNavbar sx={styles.topNavbarContainer} content={content['top-navbar']} />
      <Header content={content['header']} />

      <Divider space='4' />
      <Divider space='4' />      
      
      {/* Main Content */}
      <Container variant='wide'>
        <Content content={content['privacy']} />
      </Container>
      
      <Divider space='5' />
      
      {/* Footer */}
      <Footer content={content['footer']} />
      <CookieBanner />
    </Layout>
  )
}

export const query = graphql`
  query privaryPageContent {
    allBlockContent(filter: { page: { in: ["site/index", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`

export default PrivacyPage

export const Head = () => <Seo 
        title='Όροι Χρήσης' 
        description='Οι όροι και προϋποθέσεις χρήσης του ιστότοπου μας.'
      />
