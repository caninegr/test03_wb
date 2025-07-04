import React from 'react'
import { Layout, Stack, Hero, Main, Sidebar } from '@layout'
import CardList from '@components/CardList'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import NewsletterExpanded from '@widgets/NewsletterExpanded'
import HeroComponent from '../components/Hero/Hero'

  // Handle cookie policy link click
  const handleFooterClick = (e) => {
    //console.log('Footer clicked:', e.target.textContent) // Debug log
    
    // Check if the clicked element or its text content contains "Cookie Policy"
    if (e.target.textContent === "Ρυθμίσεις Cookies" || 
        e.target.innerText === "Ρυθμίσεις Cookies" ||
        e.target.textContent?.includes("Ρυθμίσεις Cookies")) {
      
      console.log('Cookie Policy clicked!') // Debug log
      e.preventDefault()
      e.stopPropagation()
      
      if (typeof window !== 'undefined' && window.showCookieBanner) {
        //console.log('Calling showCookieBanner') // Debug log
        window.showCookieBanner()
      } else {
        //console.log('showCookieBanner not available') // Debug log
      }
    }
  }

const Posts = ({
  data: { posts = {}, featuredPosts = {}, recentPosts = {} },
  ...props
}) => {
  const { pageContext: { services = {} } = {} } = props

  return (
    <Layout {...props} onClick={handleFooterClick}>
      <Seo title='Home' />
      <Divider />
      <Stack effectProps={{ effect: false }}>
        <CardList
          nodes={featuredPosts.nodes}
          limit={3}
          columns={[1, 2, 3]}
          variant={['horizontal-md', 'vertical-cover']}
          title="Επιλεγμένα Άρθρα από Εμάς"
          loading='eager'
          omitCategory
        />
      </Stack>
      <Divider space={2} />
      <Stack>
        <CardList
          nodes={featuredPosts.nodes}
          limit={6}
          skip={3}
          columns={[1, 2, 3]}
          variant={['horizontal-md', 'horizontal-aside']}
          loading='eager'
        />
      </Stack>
      <Divider />
      <Hero sx={{ bg: `contentBg` }}>
        <HeroComponent />
      </Hero>
      <Divider />
      {posts.group.length &&
        posts.group.map((group, index) => (
          <React.Fragment key={`${group.categoryName}.list`}>
            {index % 2 === 0 ? (
              <Stack
                title={group.categoryName}
                titleLink={group.nodes[0].category.slug}
              >
                <Main>
                  <CardList
                    nodes={group.nodes}
                    limit={2}
                    variant={['horizontal-md', 'horizontal']}
                  />
                </Main>
                <Sidebar sx={{ pl: 3, display: [null, `flex`] }}>
                  <CardList
                    nodes={group.nodes}
                    limit={1}
                    skip={2}
                    variant={['horizontal-md', 'vertical']}
                  />
                </Sidebar>
              </Stack>
            ) : (
              <Stack
                effectProps={{ effect: 'fadeInLeft' }}
                title={group.categoryName}
                titleLink={group.nodes[0].category.slug}
              >
                <Main>
                  <CardList
                    nodes={group.nodes}
                    limit={1}
                    variant={['horizontal-md', 'horizontal']}
                  />
                  <Divider space={2} />
                  <CardList
                    nodes={group.nodes}
                    limit={2}
                    skip={2}
                    columns={[1, 2]}
                    variant={['horizontal-md', 'horizontal-aside']}
                    omitMedia
                    omitCategory
                  />
                  <Divider space={2} />
                  <CardList
                    nodes={group.nodes}
                    limit={2}
                    skip={4}
                    columns={[1, 2]}
                    variant={['horizontal-md', 'horizontal-aside']}
                    mediaType='icon'
                    omitCategory
                  />
                </Main>
                <Sidebar sx={{ pl: 3, display: [null, `flex`] }}>
                  <CardList
                    nodes={group.nodes}
                    limit={1}
                    skip={1}
                    variant={['horizontal-md', 'vertical']}
                  />
                </Sidebar>
              </Stack>
            )}
            {index !== posts.group.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      <Divider space={5} />
      <Stack>
        <Main>{services.mailchimp && <NewsletterExpanded />}</Main>
      </Stack>
    </Layout>
  )
}

export default Posts
