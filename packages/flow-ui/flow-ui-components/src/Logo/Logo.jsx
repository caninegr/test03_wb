import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { GatsbyImage as Img } from 'gatsby-plugin-image'
import { Heading } from 'theme-ui'

const styles = {
  image: {
    verticalAlign: `middle`
  },
  svgImage: {
    verticalAlign: `middle`,
    width: `203px`,
    height: `auto`
  },
  grayscale: {
    WebkitFilter: `grayscale(1)`,
    filter: `grayscale(1)`,
    opacity: `0.7`
  },
  title: {
    m: 0
  }
}

const Logo = ({ title, grayscale, image, to, ...props }) => (
  <Heading
    as={Link}
    to={to}
    alt={title}
    aria-label={title}
    variant='h2'
    sx={styles.title}
    {...props}
  >
    {image ? (
      // Check if image is a GatsbyImage object or a simple URL string
      typeof image === 'string' ? (
        <img
          src={image}
          alt={title}
          loading='eager'
          style={
            grayscale
              ? { ...styles.grayscale, ...styles.svgImage }
              : { ...styles.svgImage }
          }
        />
      ) : (
        <Img
          image={image}
          loading='eager'
          style={
            grayscale
              ? { ...styles.grayscale, ...styles.image }
              : { ...styles.image }
          }
          {...props}
        />
      )
    ) : (
      title
    )}
  </Heading>
)

export default Logo

Logo.defaultProps = {
  to: '/blog/'
}

Logo.propTypes = {
  title: PropTypes.string,
  grayscale: PropTypes.bool,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), // Now accepts both objects and strings
  to: PropTypes.string
}
