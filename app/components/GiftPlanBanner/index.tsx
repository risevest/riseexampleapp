import Gift from 'app/assets/icons/svg/gift-icon.svg'
import MaroonArrow from 'app/assets/icons/svg/maroon-arrow.svg'
import WhiteArrow from 'app/assets/icons/svg/white-arrow.svg'
import { UseTheme, useTheme } from 'app/design/theme'
import { Body, P } from 'app/design/typography'
import moment from 'moment'
import * as React from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native'

import { screenWidth } from '../../design/responsiveModule'
import { fetchItemFromStorage } from '../../utils/asyncstorage'

interface IGiftPlanBanner extends INavigationProps {
  backgroundType: 'solid' | 'faint'
  hasCloseButon: boolean
  parentScreenName: string
}

interface IGiftPlanBannerText {
  body: string
  title: string
}

const useGiftPlanBannerStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    close: {
      marginLeft: 5,
      marginTop: 8
    },
    info: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20
    },
    infoText: {
      width: screenWidth * 0.6
    },
    shadow: {
      elevation: 15,
      shadowColor: 'rgba(188, 16, 88, 0.45);',
      shadowOffset: {
        height: 10,
        width: 5
      },
      shadowOpacity: 1,
      shadowRadius: 14
    },
    wrapper: {
      backgroundColor: theme.maroon,
      borderRadius: 8,
      marginBottom: 20,
      paddingBottom: 25
    }
  })

  return { styles, theme }
}

function GiftPlanBanner({
  navigation,
  backgroundType,
  hasCloseButon
}: IGiftPlanBanner) {
  const { theme, styles } = useGiftPlanBannerStyles()
  const [isBannerVisible, setBannerVisibility] = React.useState(false)

  async function getBannerState() {
    const getBannerStateFromStorage = await fetchItemFromStorage('bannerState')
    if (getBannerStateFromStorage === 'close') {
      setBannerVisibility(false)
    } else {
      setBannerVisibility(true)
    }
  }

  function decideBoolean(): boolean {
    return hasCloseButon ? isBannerVisible : true
  }

  function handleNavigation() {
    navigation?.navigate('GiftPlanStack', { screen: 'GiftPlan' })
  }

  React.useEffect(() => {
    getBannerState()
  }, [])

  const isXmasPeriod = moment().isBetween(
    moment('01-12', 'DD-MM'),
    moment('26-12', 'DD-MM')
  )
  const isValPeriod = moment().isBetween(
    moment('15-01', 'DD-MM'),
    moment('15-02', 'DD-MM')
  )
  const defaultText: IGiftPlanBannerText = {
    body: 'Make someone happy today. Send them an investment plan from $10!',
    title: 'Gift a Plan'
  }
  const xmasMessage: IGiftPlanBannerText = {
    ...defaultText,
    body: 'This Christmas, gift your favourite person the future. Send them an investment plan from $10!'
  }
  const valMessage: IGiftPlanBannerText = {
    body: 'Share the love with Rise Gift Plans, starting from $10',
    title: 'A Gift from the Heart'
  }

  let cardText = isXmasPeriod
    ? xmasMessage
    : isValPeriod
      ? valMessage
      : defaultText

  const INFO_CONTAINER: TextStyle = { marginTop: 24 }

  const BODY: TextStyle = {
    color: backgroundType === 'solid' ? theme.primarySurface : theme.maroon,
    lineHeight: 22
  }

  return (
    <View>
      {decideBoolean() && (
        <TouchableOpacity
          onPress={handleNavigation}
          style={[
            styles.wrapper,
            hasCloseButon && styles.shadow,
            {
              backgroundColor:
                backgroundType === 'solid' ? theme.maroon : theme.maroon10
            }
          ]}
        >
          <View style={INFO_CONTAINER} />
          <View style={styles.info}>
            <Gift height={48} width={40} />
            <View style={styles.infoText}>
              <Body
                fontsize={17}
                style={BODY}
                text={cardText.title}
                type="white"
              />
              <P
                fontsize={13}
                fontWeight="400"
                style={{
                  color:
                    backgroundType === 'solid'
                      ? theme.primarySurface
                      : theme.maroon
                }}
                text={cardText.body}
                type="white"
              />
            </View>
            {backgroundType === 'solid' ? (
              <WhiteArrow height={14} width={8} />
            ) : (
              <MaroonArrow height={14} width={8} />
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default GiftPlanBanner
