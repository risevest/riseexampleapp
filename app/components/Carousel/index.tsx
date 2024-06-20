import React, { ReactElement } from 'react'
import { ImageSourcePropType, View } from 'react-native'
import Carousel, { AdditionalParallaxProps } from 'react-native-snap-carousel'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../../redux/types'
import SliderEntry from './SliderEntry'
import styles from './styles/index.styles'
import { itemWidth, sliderWidth } from './styles/Styles'

const SLIDER_1_FIRST_ITEM = 0

interface ICarouselDataProps extends INavigationProps {
  data: {
    illustration: any
    onClick: () => void
    subtitle: string
    title: string
  }[]
  imageSourceType: 'require' | 'uri'
  user?: RiseUser
  userPlans?: IPlan[]
}

interface CarouselData {
  backgroundImage: ReactElement
  icon: ReactElement
  illustration: string | ImageSourcePropType
  onClick: () => void
  subtitle: string
  title: string
}

const ReuseableCarousel = ({ data, imageSourceType }: PropsFromRedux) => {
  const renderItemWithParallax = (
    { item, index }: { index: number; item: CarouselData },
    parallaxProps?: AdditionalParallaxProps | undefined
  ) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        onSlideClick={() => item.onClick()}
        parallax={true}
        parallaxProps={parallaxProps}
        type={imageSourceType}
      />
    )
  }

  return (
    <View style={styles.exampleContainer}>
      <Carousel
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        data={data}
        firstItem={SLIDER_1_FIRST_ITEM}
        hasParallaxImages={true}
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={0.94}
        itemWidth={itemWidth + 20}
        renderItem={renderItemWithParallax}
        scrollEventThrottle={16}
        sliderWidth={sliderWidth}
      />
    </View>
  )
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  userPlans: state.plan?.userPlans?.userPlans || []
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<ICarouselDataProps>

export default connector(ReuseableCarousel)
