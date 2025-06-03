import React from 'react'
import mergeWith from 'lodash.mergewith'
import SVG from 'react-inlinesvg'
import { Box, css } from 'theme-ui'

const ContentIcon = ({ content, round, p, ...props }) => {
  if (!content) return null

  const { src, title, description, ...contentRest } = content

  if (!src) return null

  const mergedProps = mergeWith({}, props, contentRest, (a, b) =>
    b === null ? a : undefined
  )

  // Create accessibility props for the SVG
  const svgAccessibilityProps = {}
  if (title) {
    svgAccessibilityProps.title = title
  }
  if (description) {
    svgAccessibilityProps['aria-label'] = description
  }

  return (
    <Box
      sx={{
        display: `inline-block`,
        verticalAlign: `middle`,
        borderRadius: round ? `full` : `lg`,
        minWidth: `auto`,
        bg: mergedProps.bg
      }}
      p={mergedProps.bg && p}
      {...props}
    >
      <SVG
        src={src}
        css={css({
          fill: mergedProps.color,
          size: `icon.${mergedProps.size || 'md'}`,
          display: `block`
        })}
        {...svgAccessibilityProps}
      />
    </Box>
  )
}

ContentIcon.defaultProps = {
  p: 3,
  round: false
}

export default ContentIcon
