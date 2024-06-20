import Success from 'app/assets/icons/svg/success.svg'
import { Button, Container } from 'app/components'
import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { Header, P } from 'app/design/typography'
import { AppState } from 'app/redux/types'
import { setToken } from 'app/redux/user/actionCreators'
import { fetchItemFromStorage } from 'app/utils/asyncstorage'
import { getEmoji } from 'app/utils/utilFunctions'
import { PinStackScreenProps } from 'app/view/navigator/types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'

interface IConfirmPINReset
  extends PinStackScreenProps<'ConfirmPINReset'>,
    PropsFromRedux {}

const useConfirmStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    buttonView: {
      bottom: 40,
      left: 0,
      marginHorizontal: 20,
      right: 0
    },
    header: {
      textAlign: 'center'
    },
    subText: {
      marginHorizontal: 50,
      marginTop: 7,
      textAlign: 'center'
    },
    success: {
      marginBottom: 45,
      marginTop: 100
    },
    wrapper: {
      ...Styles.body,
      alignItems: 'center',
      flex: 1
    }
  })

  return { styles, theme }
}

const ConfirmPINReset = ({
  navigation,
  route,
  setUserToken,
  token
}: IConfirmPINReset) => {
  const { theme, styles } = useConfirmStyles()

  const navigate = async () => {
    const prevRoute = route?.params?.prevRoute
    const isPrevRouteResetPin = prevRoute === 'ResetPin'
    const navigationRoute =
      isPrevRouteResetPin && !!token
        ? 'More'
        : isPrevRouteResetPin && !token
          ? 'PinLogin'
          : 'Info'
    if (navigationRoute === 'Info') {
      const userToken = await fetchItemFromStorage('sessionToken')
      setUserToken(userToken)
      navigation.navigate('App', {
        params: {
          params: { firstName: '' },
          screen: 'Info'
        },
        screen: 'AuthStack'
      })
    } else {
      // TODO: try to fix
      // @ts-ignore
      navigation?.navigate(navigationRoute)
    }
  }

  const resetText =
    route?.params?.prevRoute === 'ResetPin' ? 'reset' : 'created'

  return (
    <Container>
      <View style={styles.wrapper}>
        <Success height={98} style={styles.success} width={98} />
        <Header
          fontsize={22}
          style={styles.header}
          text={`You've ${resetText} your PIN`}
          type="dark"
        />
        <P
          fontsize={17}
          fontWeight="300"
          style={styles.subText}
          text={`${getEmoji(
            'shushing_face'
          )} Your PIN is personal to you. Do not share with anyone to ensure your account is safe and secure.`}
          type="light"
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          buttonText="Okay"
          onPress={navigate}
          textColor={theme.primarySurface}
          variant="primary"
        />
      </View>
    </Container>
  )
}

const mapStateToProps = (state: AppState) => ({
  token: state.user.token
})

const connector = connect(mapStateToProps, {
  setUserToken: setToken
})

type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ConfirmPINReset)
