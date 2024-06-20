import React, { Component } from 'react'

import { getTheme, Mode, ThemeManagerContext } from './theme'

interface IThemeManagerProps {
  children: any
}

interface IThemeManagerState {
  mode: Mode
}

export class ThemeManager extends Component<
  IThemeManagerProps,
  IThemeManagerState
> {
  state: IThemeManagerState = {
    mode: 'light'
  }

  toggleTheme = () => {
    this.state.mode === 'light'
      ? this.setState({ mode: 'dark' })
      : this.setState({ mode: 'light' })
  }

  render() {
    const { mode } = this.state
    return (
      <ThemeManagerContext.Provider
        value={{
          mode: mode,
          theme: getTheme(mode),
          toggle: this.toggleTheme
        }}
      >
        {this.props.children}
      </ThemeManagerContext.Provider>
    )
  }
}
