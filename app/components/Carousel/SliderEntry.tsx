import { Header, P } from 'app/design/typography'
import PropTypes from 'prop-types'
import React, { Component, ReactElement } from 'react'
import {
  ImageSourcePropType,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import { ParallaxImage } from 'react-native-snap-carousel'

import styles from './styles/Styles'

interface ISliderEntryProps {
  data: {
    backgroundImage: ReactElement
    icon: ReactElement
    illustration: ImageSourcePropType | string
    subtitle: string
    title: string
  }
  even: boolean
  onSlideClick: () => void
  parallax: any
  parallaxProps: any
  type: 'require' | 'uri'
}

export default class SliderEntry extends Component<ISliderEntryProps> {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  }

  get image() {
    const {
      data: { illustration },
      parallaxProps,
      type
    } = this.props

    return (
      <ParallaxImage
        containerStyle={[styles.imageContainer]}
        parallaxFactor={0.35}
        showSpinner={true}
        source={type === 'require' ? illustration : { uri: illustration }}
        spinnerColor="rgba(0, 0, 0, 0.25)"
        style={styles.image}
        {...parallaxProps}
      />
    )
  }

  render() {
    const {
      data: { title, subtitle, icon },
      onSlideClick
    } = this.props

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onSlideClick}
        style={styles.slideInnerContainer}
      >
        <View style={[styles.imageContainer]}>
          {this.image}
          <View style={ICON_CONTAINER}>{icon}</View>
          <View style={HEADER_CONTAINER}>
            <Header fontsize={18} style={HEADER} text={title} type="white" />
            <P
              fontsize={14}
              fontWeight="400"
              style={SUBTITLE}
              text={subtitle}
              type="white"
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const ICON_CONTAINER: ViewStyle = {
  left: 15,
  position: 'absolute',
  right: 15,
  top: 20,
  zIndex: 100
}

const HEADER_CONTAINER: ViewStyle = {
  backgroundColor: '#0898A0',
  bottom: 0,
  left: 0,
  paddingHorizontal: 10,
  paddingVertical: 10,
  position: 'absolute',
  right: 0
}

const HEADER: TextStyle = { marginBottom: 7 }

const SUBTITLE: TextStyle = { marginBottom: 8 }
