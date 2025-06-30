import React from 'react'
import { Layout, Stack, Main } from '@layout'
import PageTitle from '@components/PageTitle'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import AuthorExpanded from '@widgets/AuthorExpanded'
import { useBlogAuthors } from '@helpers-blog'

const PageAuthors = props => {
  const authors = useBlogAuthors()

  return (
    <Layout {...props}>
      <Seo title='Η Ομάδα μας' />
      <Divider />
      <Stack effectProps={{ effect: 'fadeInDown' }}>
        <PageTitle
          header='Η ομάδα μας'
          subheader='Κάθε μέλος ξεχωρίζει για τις ικανότητες του στην φροντίδα του σκύλου, τις εκπαιδευτικές γνώσεις και κυρίως την αγάπη για τα κατοικίδια ζώα.'
        />
      </Stack>
      <Stack>
        <Main>
          {authors.map((author, i) => (
            <React.Fragment key={`item-${i}`}>
              <Divider />
              <AuthorExpanded author={author} withLink />
            </React.Fragment>
          ))}
        </Main>
      </Stack>
    </Layout>
  )
}

export default PageAuthors
