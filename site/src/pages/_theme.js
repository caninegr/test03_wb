/**
 * These theme values will override the base theme.
 *
 * We're passing these values to Layout component;
 * The Layout component merges these values with the
 * base theme.
 *
 */

const preventFlash = {
  '& .top-navbar-wrapper': {
    minHeight: '60px',
    display: 'flex',
    alignItems: 'center'
  }
}

export default {
  colors: {
    background: `#FFFFFF`,
    footerBg: `transparent`,
    headerBg: `white`
  }
}
