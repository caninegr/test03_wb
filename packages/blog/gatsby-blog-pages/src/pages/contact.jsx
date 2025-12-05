import React from 'react'
import { Layout, Stack, Main, Sidebar } from '@layout'
import PageTitle from '@components/PageTitle'
import Divider from '@components/Divider'
import Seo from '@widgets/Seo'
import ContactForm from '@widgets/ContactForm'
import ContactInfo from '@widgets/ContactInfo'
import Commitment from '@widgets/Commitment'

const PageContact = props => (
  <Layout {...props}>
    <Divider />
    <Stack>
      <Main>
        <PageTitle
          header="Ελάτε σε Επαφή μαζί μας"
          subheader='Ο σκύλος σας έχει απορίες; Εσείς; Είμαστε εδώ για να βοηθήσουμε!'
        />
        <Divider />
        <ContactForm />
      </Main>
      <Sidebar>
        <Commitment />
        <Divider />
        <ContactInfo />
      </Sidebar>
    </Stack>
  </Layout>
)

export default PageContact

export const Head = () => <Seo title='Φόρμα Επικοινωνίας' />
