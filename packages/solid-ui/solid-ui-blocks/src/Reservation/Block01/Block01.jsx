import React from 'react'
import { Container, Box } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'
import BookingForm from './BookingForm' // Import the booking form component

const ReservationBlock01 = ({ content }) => {
  // Define the content directly in the component as a fallback
  const defaultTextContent = [
    {
      "text": "Book Your Dog's Stay",
      "variant": "h2"
    },
    {
      "text": "Reserve a spot for your furry friend in our comfortable and safe boarding facility.",
      "variant": "medium"
    }
  ]
  
  // Try to use content from props, fallback to default
  const textContent = content?.reservation?.text || content?.text || defaultTextContent
  const buttonsContent = content?.reservation?.buttons || content?.buttons
  
  return (
    <Container sx={{ textAlign: `center` }}>
      {/* Render the text content */}
      <ContentText content={textContent} />
      
      {/* Render buttons if they exist */}
      {buttonsContent && <ContentButtons content={buttonsContent} />}
      
      <Divider space={4} />
      <Reveal effect='fadeIn'>
        <BookingForm />
      </Reveal>
    </Container>
  )
}

export default WithDefaultContent(ReservationBlock01)