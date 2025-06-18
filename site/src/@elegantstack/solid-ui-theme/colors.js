// Importing default theme color object to mutate it
import defaultColors from '@elegantstack/solid-ui-theme/src/colors'

//Using tailwind preset colors
import colors from '@elegantstack/solid-ui-theme/src/color-preset'

export default {
  ...defaultColors,
     // New color mode
      // Alpha (primary)
      alphaLighter: colors.lime[100],
      alphaLight: colors.lime[300],
      alpha: colors.lime[500],
      alphaDark: colors.lime[700],
      alphaDarker: colors.lime[800],
      // beta (secondary)
      betaLighter: colors.orange[100],
      betaLight: colors.orange[300],
      beta: colors.orange[500],
      betaDark: colors.orange[600],
      betaDarker: colors.orange[800],

            // gamma (primary)
            gammaLighter: colors.blue[100],
            gammaLight: colors.blue[300],
            gamma: colors.blue[500],
            gammaDark: colors.blue[600],
            gammaDarker: colors.blue[800]



}