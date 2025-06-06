import React from 'react'
import { Card, Text } from 'theme-ui'
import Section from '@components/Section'

const Commitment = props => (
  <Section aside title='Η Δέσμευσή μας' {...props}>
    <Card variant='paper'>
      <Text variant='p'>
        Παίρνουμε τη δέσμευσή μας προς εσάς πολύ σοβαρά. Αν χρειάζεστε βοήθεια με το πρότζεκτ σας, έχετε απορίες σχετικά με τη χρήση της ιστοσελίδας ή αντιμετωπίζετε τεχνικά προβλήματα, μη διστάσετε να επικοινωνήσετε μαζί μας.
      </Text>
    </Card>
  </Section>
)

export default Commitment
