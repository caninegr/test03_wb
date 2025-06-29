import React, { useEffect, useRef } from 'react'
import { Container, Box, css } from 'theme-ui'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import ContentImages from '@solid-ui-components/ContentImages'
import ContentButtons from '@solid-ui-components/ContentButtons'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

const ReservationBlock01 = ({ content: { text, buttons, images } }) => {
  const bookingWidgetRef = useRef(null);

  // Handle the external script loading
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://eu.revelationpets.com/newbooking/widgetJs/jsFile/zc7i53ur83.js';
    script.async = true;
    
    // Add script to the document
    document.body.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container sx={{ textAlign: `center` }}>
      <Box>
        {text && (
          <Reveal effect='fadeInDown'>
            <ContentText content={text} />
          </Reveal>
        )}
        {buttons && (
          <>


        {/* Revelation Pets Booking Widget - Centered */}
        <Box 
         sx={{ 
           mt: 4, 
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           textAlign: 'center',
           width: '100%'
         }} 
         ref={bookingWidgetRef}
      >
          <div id="revelation_pets_booking_widget">
          <a href="http://www.revelationpets.com?s=booking">KENNEL SOFTWARE</a> BY <a href="http://www.revelationpets.com?s=booking">REVELATION PETS</a>
          </div>
        </Box>
        </>
      )}
      </Box>
      

      
      {images && (
        <>
          <Divider space={3} />
          <Box sx={{ position: `relative` }}>
            <ContentImages
              content={{ images }}
              loading='eager'
              imagePosition='center'
              imageEffect='fadeInDown'
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default WithDefaultContent(ReservationBlock01);