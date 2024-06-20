import { useNavigation } from '@react-navigation/native'
import Icon from 'app/assets/icons'
import { Button, Container, IconButton } from 'app/components'
import Styles from 'app/design/Styles'
import { Body, Header, P } from 'app/design/typography'
import { getEmoji } from 'app/utils/utilFunctions'
import { default as React, useState } from 'react'
import {
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'

import { useInfoStyles } from './styles'
import { IInfo } from './types'

const Info = ({ handleDoThisLater, route }: IInfo) => {
  const { goBack, navigate } = useNavigation()
  const [infoState, setInfoState] = useState({ isModalOpen: false })

  const toggleModalVisibility = (isModalOpen: boolean) => {
    setInfoState({ ...infoState, isModalOpen })
  }

  const { isModalOpen } = infoState
  const { styles, theme } = useInfoStyles()
  return (
    <Container
      animation="fadeIn"
      backgroundColor={theme.primarySurface}
      statusBarColor={theme.primarySurface}
    >
      <View style={styles.wrapper}>
        <IconButton iconName="arrow-back-sharp" onPress={() => goBack()} />
        <P
          fontsize={22}
          style={styles.heading}
          text={`Nice to meet you, ${route?.params?.firstName}`}
        />
        <P
          fontsize={17}
          fontWeight="300"
          style={styles.body}
          text="We want you to create a customized plan to help you reach your financial freedom. Just answer a few questions and we'll be on our way!"
        />
        <Button
          buttonStyle={styles.button}
          onPress={() => {
            // TODO: [navigation] fix
            // @ts-expect-error
            navigate('BuildWealth', { screen: 'FirstQuestion' })
          }}
          variant="primary"
        >
          <Body style={styles.buttonText} text="Build my wealth plan" />
          <Text style={styles.emoji}>
            {getEmoji('chart_with_upwards_trend')}
          </Text>
        </Button>
        <Button
          buttonStyle={styles.button}
          onPress={() => {
            navigate('BuildWealth', { screen: 'BuildWealthHome' })
          }}
          variant="secondary"
        >
          <Body
            style={{ ...styles.buttonText, color: theme.primaryColor }}
            text="What is a wealth plan?"
          />
          <Text style={styles.emoji}>{getEmoji('thinking_face')}</Text>
        </Button>
        <Button
          buttonStyle={styles.button}
          onPress={handleDoThisLater}
          variant="transparent"
        >
          <Body
            style={{ ...styles.buttonText, color: theme.primaryColor }}
            text="I'll do this later"
          />
        </Button>
        <View>
          <Modal
            animationIn="fadeInUp"
            animationInTiming={500}
            animationOut="slideOutDown"
            animationOutTiming={500}
            backdropColor={theme.darkModalBackground}
            isVisible={isModalOpen}
            onBackButtonPress={() => toggleModalVisibility(false)}
            onBackdropPress={() => toggleModalVisibility(false)}
            onSwipeComplete={() => toggleModalVisibility(false)}
            propagateSwipe
            style={styles.modalWrapper}
            swipeDirection="down"
            useNativeDriver
          >
            <ScrollView style={styles.modalContent}>
              <View onStartShouldSetResponder={() => true} style={FLEX}>
                <TouchableOpacity
                  onPress={() => toggleModalVisibility(false)}
                  style={styles.anchor}
                />
                <View style={{ ...Styles.spaceBetween, ...Styles.topSpacing }}>
                  <IconButton
                    iconName="close"
                    onPress={() => toggleModalVisibility(false)}
                  />
                  <Header
                    fontsize={22}
                    style={BUILD_WEALTH}
                    text="Build Wealth"
                  />
                  <View />
                </View>
                <P
                  fontWeight="300"
                  style={styles.body}
                  text="The Build Wealth Plan is a long term investment plan to help you reach your financial goals"
                />
                <View>
                  <Icon height={70} name="graph" width="100%" />
                </View>

                <View style={styles.captionWrapper}>
                  <View style={styles.circle}>
                    <Icon height={18} name="naira-card" width={18} />
                  </View>
                  <View style={CONTAINER}>
                    <Body
                      style={{ color: theme.tertiaryColor }}
                      text="Answer a few questions"
                    />
                    <P
                      fontWeight="300"
                      style={styles.wrapText}
                      text="We want you to create a customized plan to help you reach your financial freedom"
                    />
                  </View>
                </View>
                <View style={styles.captionWrapper}>
                  <View style={styles.circle}>
                    <Icon height={18} name="naira-card" width={18} />
                  </View>
                  <View style={CONTAINER}>
                    <Body
                      style={{ color: theme.tertiaryColor }}
                      text="Fund Periodically"
                    />
                    <P
                      fontWeight="300"
                      style={styles.wrapText}
                      text="We want you to create a customized plan to help you reach your financial freedom"
                    />
                  </View>
                </View>
                <View style={styles.captionWrapper}>
                  <View style={styles.circle}>
                    <Icon height={18} name="naira-card" width={18} />
                  </View>
                  <View style={CONTAINER}>
                    <Body
                      style={{ color: theme.tertiaryColor }}
                      text="Adjust when needed"
                    />
                    <P
                      fontWeight="300"
                      style={styles.wrapText}
                      text="We want you to create a customized plan to help you reach your financial freedom"
                    />
                  </View>
                </View>
                <Button
                  buttonStyle={styles.absoluteButton}
                  onPress={() => {
                    toggleModalVisibility(false)
                    // TODO: [navigation] fix
                    // @ts-expect-error
                    navigate('First')
                  }}
                  variant="primary"
                >
                  <Body style={styles.buttonText} text="Build my wealth plan" />
                  <Text style={styles.emoji}>
                    {getEmoji('chart_with_upwards_trend')}
                  </Text>
                </Button>
              </View>
            </ScrollView>
          </Modal>
        </View>
      </View>
    </Container>
  )
}

export default Info

const FLEX: ViewStyle = { flex: 1 }
const BUILD_WEALTH: TextStyle = { marginRight: 30 }

const CONTAINER: ViewStyle = { flex: 1, marginLeft: 20 }
