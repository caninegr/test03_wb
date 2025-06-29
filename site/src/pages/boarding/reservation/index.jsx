import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import TopNavbar from '@solid-ui-blocks/TopNavbar/Block01'
import Faq from '/src/@elegantstack/solid-ui-blocks/Faq/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'
import Reservation from '@solid-ui-blocks/Reservation/Block01'

import { normalizeBlockContentNodes } from '@blocks-helpers'

import theme from '../../_theme'
import styles from '../_styles'

const Boarding = props => {
  const { allBlockContent } = props.data
  const content = normalizeBlockContentNodes(allBlockContent?.nodes)

  return (
    <Layout theme={theme} {...props}>
      <Seo title='Home' />
      {/* Modals */}
      <ModalWithTabs content={content['authentication']} reverse />
      <ModalWithTabs content={content['contact']} />
      <ModalSimple content={content['advertisement']} />
      {/* Blocks */}

      {/* Add the TopNavbar before Header */}
      <TopNavbar content={content['top-navbar']} />

      <Header content={content['header']} />

            <Divider space='4' />
            <Divider space='4' />

      <Divider space='3' />
      <Container variant='full' sx={styles.featureThreeContainer}>
        <Reservation content={content['reservation']} />
      </Container>
      <Divider space='3' />

      <Divider space='5' />
      <Container variant='narrow'>
        <Faq content={content['faq']} />
      </Container>
      <Divider space='5' />

      <Footer content={content['footer']} />
    </Layout>
  )
}

export const query = graphql`
  query innerpageBoardingBlockContent {
    allBlockContent(filter: { page: { in: ["site/index", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`
export default Boarding
