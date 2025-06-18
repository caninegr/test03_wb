import React from 'react'
import { Heading } from 'theme-ui'

/**
 * Shadow me to add your own content
 */

const styles = {
  heading: {
    span: {
      color: `omegaDark`
    }
  }
}

export default () => (
  <Heading variant='h1' sx={styles.heading}>
    Μια αγκαλιά,  
    <br />
    <span>μια ζωή παρέα.</span>
  </Heading>
)
