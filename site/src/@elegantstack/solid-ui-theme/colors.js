// Importing default theme color object to mutate it
import defaultColors from '@elegantstack/solid-ui-theme/src/colors'

//Using tailwind preset colors
import colorPreset from '@elegantstack/solid-ui-theme/src/color-preset'

const colors = {
  ...defaultColors,
     // New color mode
      // Alpha (primary)
      alphaLighter: colorPreset.lime[100],
      alphaLight: colorPreset.lime[300],
      alpha: colorPreset.lime[500],
      alphaDark: colorPreset.lime[700],
      alphaDarker: colorPreset.lime[800],
      // beta (secondary)
      betaLighter: colorPreset.orange[100],
      betaLight: colorPreset.orange[300],
      beta: colorPreset.orange[500],
      betaDark: colorPreset.orange[600],
      betaDarker: colorPreset.orange[800],

            // gamma (primary)
            gammaLighter: colorPreset.blue[100],
            gammaLight: colorPreset.blue[300],
            gamma: colorPreset.blue[500],
            gammaDark: colorPreset.blue[600],
            gammaDarker: colorPreset.blue[800]
}

export default colors