import { PinStackScreenProps } from 'app/view/navigator/types'
import React, { Component } from 'react'
import { Keyboard } from 'react-native'

import CreatePin from './View'

class CreatePinContainer extends Component<
  PinStackScreenProps<'CreatePinScreen'>
> {
  componentDidMount() {
    Keyboard.dismiss()
  }

  render() {
    return <CreatePin {...this.props} />
  }
}

export default CreatePinContainer
