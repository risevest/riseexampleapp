import theme from '@risemaxi/sarcelle/dist/theme/theme'
import c from 'chroma-js'
import makeColorMoreChill from 'make-color-more-chill'
import React from 'react'
import Palette from 'react-native-image-colors'

function invertColor(hex: string) {
  if (!c.valid(hex)) {
    throw new Error('Invalid color.')
  }
  hex = c(hex).hex()
  const brightness = c(hex).luminance()
  return brightness < 0.35 ? '#FFFFFF' : '#000000'
}

async function getDominantColorFromImage(
  imageUrl: string,
  colorToMeasureAgainst: string
) {
  let colors = await Palette.getColors(imageUrl)

  const color = (() => {
    if (colors.platform === 'web') return theme.colors.primary

    if (colors.platform === 'android')
      return (
        colors?.vibrant ||
        colors?.muted ||
        colors?.lightVibrant ||
        colors?.lightMuted ||
        colors?.darkMuted ||
        colors?.darkVibrant
      )

    return (
      colors.primary || colors.detail || colors.background || colors.secondary
    )
  })()

  const fallbackColor = (() => {
    if (colors.platform === 'web') return theme.colors.teal004

    if (colors.platform === 'android')
      return (
        colors?.muted ||
        colors?.lightVibrant ||
        colors?.lightMuted ||
        colors?.darkMuted ||
        colors?.darkVibrant
      )

    return colors.detail || colors.background || colors.secondary
  })()

  if (colors.platform === 'android') {
    const chillVibrant = makeColorMoreChill(
      colors.vibrant,
      colorToMeasureAgainst
    )

    if (c.deltaE(colors.vibrant, chillVibrant) < 13) {
      return chillVibrant
    } else if (fallbackColor !== undefined && fallbackColor !== color) {
      const chillFallback = makeColorMoreChill(
        fallbackColor,
        colorToMeasureAgainst
      )

      if (fallbackColor === chillFallback) {
        return chillFallback
      } else {
        return chillVibrant
      }
    }
  }
  return makeColorMoreChill(color, colorToMeasureAgainst)
}

export const useDominantColor = (url: string, fallback = '#FFF') => {
  const [dominantColor, setColor] = React.useState<string | null>(
    fallback ?? null
  )
  const [inVertedDominantColor, setInverted] = React.useState<string | null>(
    null
  )
  getDominantColorFromImage(url, fallback)
    .then((color) => {
      setColor(color)
      setInverted(invertColor(color))
    })
    .catch((_) => setInverted(invertColor(fallback)))

  return { dominantColor, invertedColor: inVertedDominantColor }
}
