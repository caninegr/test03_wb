import React from 'react'
import { Card, Text, IconButton } from 'theme-ui'
import { FaPhone, FaEnvelope, FaLocationArrow } from 'react-icons/fa'
import Section from '@components/Section'
import useSiteMetadata from '@helpers-blog/useSiteMetadata'

const ContactInfo = () => {
  const { phone, address, email } = useSiteMetadata()

  return (
    <Section aside title='Διαφημίσου σε εμάς'>
      <Card variant='paper'>
        <Text variant='p'>Θες να δουλέψουμε μαζί;</Text>
        <Text variant='p'>
          Έλα να το κουβεντιάσουμε.
        </Text>
        {phone && (
          <Text>
            <IconButton variant='simple' role='presentation'>
              <FaPhone />
            </IconButton>
            {phone}
          </Text>
        )}
        {email && (
          <Text>
            <IconButton variant='simple' role='presentation'>
              <FaEnvelope />
            </IconButton>
            {email}
          </Text>
        )}
        {address && (
          <Text>
            <IconButton variant='simple' role='presentation'>
              <FaLocationArrow />
            </IconButton>
            {address}
          </Text>
        )}
      </Card>
    </Section>
  )
}

export default ContactInfo
