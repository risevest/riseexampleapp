import { Context, createContext, useContext } from 'react'

export const themeColors = {
  // just placeholder test colors to ensure the toggle theme functionality is working
  // To test, just call toggle() within a functional component
  dark: {
    black2: '#292F33',
    black3: '#000000',
    error: '#C81C1C',
    modalBackground: 'purple',
    primaryColor: 'blue',
    primarySurface: 'green',
    primaryTextColor: 'white',
    secondaryColor: 'yellow',
    success: '#4CD964',
    tertiaryColor: '#012224',
    warning: '#FF9C00'
  },

  light: {
    black900: '#000',
    darkModalBackground: 'rgba(0, 0, 0, 0.6)',
    error: '#C81C1C',
    gray: '#333333',
    green: '#27BF41',
    green20: 'rgba(76, 217, 100, 0.2)',
    grey05: 'rgba(131, 143, 145, 0.05)',
    grey25: 'rgba(131, 143, 145, 0.25)',
    grey300: 'rgba(131,143,145, 0.3)',
    grey400: '#B5B5B5',
    grey700: '#F7F7FA',
    inactiveRed: '#EB5757',
    inactiveTabText: '#71879C',
    inactiveText: '#94A1AD',
    indigo: '#B80074',
    inputBackground: 'rgba(230, 245, 246, 0.2)',
    lightGrey: 'rgba(181, 181, 181, 0.2)',
    lightRed: 'rgba(235, 87, 87, 0.15)',
    lightStroke: 'rgba(113, 135, 156, 0.2)',
    lightText: 'rgba(131, 143, 145, 0.1)',
    lightView: 'rgba(230, 245, 246, 0.5)',
    maroon: '#BC1058',
    maroon10: '#rgba(188, 16, 88, 0.1)',
    modalBackground: 'rgba(8, 152, 160, 0.3)',
    neutral: '#171C22',
    offWhite: '#71879C1A',
    offWhite2: 'rgba(113, 135, 156, 0.1)',
    offWhite3: 'rgba(113, 135, 156, 0.1)',
    orange: '#FE7122',
    orange200: 'rgba(255, 156, 0, 0.2)',
    primaryColor: '#0898A0',
    primarySurface: '#fff',
    primaryTextColor: '#838F91',
    purple: '#866DC5',
    red10: 'rgba(200, 28, 28, 0.1)',
    secondaryButton: 'rgba(113, 135, 156, 0.1)',
    secondaryColor: '#E6F5F6',
    skeletonBone: '#E1E9EE',
    softBlack: '#222222',
    softText: '#71879C',
    success: '#4CD964',
    tabBackground: 'rgba(118, 118, 128, 0.12)',
    tertiaryColor: '#012224',
    viewBackground: '#B5E0E3',
    warning: '#FF9C00'
  }
}

export type ThemeColors = typeof themeColors.light & typeof themeColors.dark

export type UseTheme = {
  mode: 'light' | 'dark'
  theme: ThemeColors
  toggle: () => any
}

export type Mode = 'light' | 'dark'

export const getTheme = (mode: Mode) => themeColors[mode]

export const ThemeManagerContext: Context<any> = createContext({
  mode: 'light',
  theme: getTheme('light'),
  toggle: () => {}
})

// add the type so we don't replicate imports
export const useTheme: () => UseTheme = () => useContext(ThemeManagerContext)
