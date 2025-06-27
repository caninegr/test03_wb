import React from 'react'
import { graphql } from 'gatsby'
import { Container } from 'theme-ui'
import Layout from '@solid-ui-layout/Layout'
import Seo from '@solid-ui-components/Seo'
import Divider from '@solid-ui-components/Divider'
import ModalWithTabs from '@solid-ui-blocks/Modal/Block01'
import ModalSimple from '@solid-ui-blocks/Modal/Block02'
import Header from '@solid-ui-blocks/Header/Block01'
import Hero from '@solid-ui-blocks/Hero/Block01'
import Companies from '@solid-ui-blocks/Companies/Block01'

// -
//import Features from '@solid-ui-blocks/Features/Block05'

// +
import OurServices from '@solid-ui-blocks/Features/Block08'
import Testimonials from '@solid-ui-blocks/Testimonials/Block03'
//import Content from '@solid-ui-blocks/Content/Block01'

import FeatureOne from '@solid-ui-blocks/FeaturesWithPhoto/Block07'
import WhyChooseUs from '@solid-ui-blocks/Features/Block01'
//import FeatureTwo from '@solid-ui-blocks/FeaturesWithPhoto/Block06'
//import FeatureThree from '@solid-ui-blocks/FeaturesWithPhoto/Block03'
//import FeatureThreeMore from '@solid-ui-blocks/Features/Block06'
import Blog from '@solid-ui-blocks/Blog/Block01'
import Footer from '@solid-ui-blocks/Footer/Block01'

//+
import WithRecentPosts from '@solid-ui-blocks/WithRecentPosts'
import TopNavbar from '@solid-ui-blocks/TopNavbar/Block01'
import CookieBanner from '@solid-ui-components/CookieBanner'

import { normalizeBlockContentNodes } from '@blocks-helpers'
import theme from './_theme'
import styles from './_styles'

const IndexPage = props => {
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

      {/* + */}
      <TopNavbar sx={styles.topNavbarContainer} content={content['top-navbar']} />
      <Header content={content['header']} /> 

      <Divider space='4' />
      <Divider space='4' />
      <Container variant='wide' sx={styles.heroContainer}>
        <Hero content={content['hero']} reverse />
      </Container>
      <Divider space='1' />
      <Companies content={content['companies']} />
      <Divider space='3' />
      <Divider space='3' />
      <OurServices content={content['our-services']} />
      <Divider space='4' />

      <Divider space='4' />
      <Container variant='wide' sx={styles.featureOneContainer}>
        <FeatureOne content={content['feature-one']} />
      </Container>
      <Divider space='1' />

      {/* <Divider space='5' />
      <Container variant='wide' sx={styles.contentTwoContainer}>
        <Content content={content['content-two']} />
      </Container>
      <Divider space='5' /> */}

      <Divider space='5' />
      <Container variant='wide' sx={styles.whyChooseUsContainer}>
        <WhyChooseUs content={content['why-choose-us']} />
      </Container>
      <Divider space='4' />

      <Divider space='4' />
        <Testimonials content={content['testimonials']} />
      <Divider space='4' />

      <Divider space='4' />
        <WithRecentPosts>
          <Blog content={content['latest-blogs']} />
        </WithRecentPosts>
      <Divider space='4' />
      <Footer content={content['footer']} />
      <CookieBanner />
    </Layout>
  )
}

export const query = graphql`
  query homepageSiteBlockContent {
    allBlockContent(filter: { page: { in: ["site/index", "shared"] } }) {
      nodes {
        ...BlockContent
      }
    }
  }
`
export default IndexPage
