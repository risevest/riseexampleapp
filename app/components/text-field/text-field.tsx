import { Box, Circle, Text, useTheme } from '@risemaxi/sarcelle'
// import RNUxcam from 'react-native-ux-cam'
import Icon from 'app/assets/icons'
import { CountryModal } from 'app/components/country-modal'
import { getComputedWidth as gw } from 'app/design/responsiveModule'
import { useToggle } from 'app/hooks'
import { ICountriesData } from 'app/utils/countriesData'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import {
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import IIcon from 'react-native-vector-icons/Ionicons'

import { TextFieldProps } from './input.props'

export const TextField = forwardRef<TextInput, TextFieldProps>((props, ref) => {
  // component props
  const {
    preset,
    label,
    labelStyle,
    errorText,
    icon,
    iconName,
    refs,
    value,
    style,
    onBlur,
    onFocus,
    // sensitiveField,
    getCountry,
    touched,
    ...restOfProps
  } = props

  //   text input focus state
  const [isFocused, setIsFocused] = useState(false)

  //   password visibility state
  const [isSecure, setIsSecure] = useState(true)

  //   component reference to the text field used for input focus
  const inputRef = useRef<TextInput>(null)

  useImperativeHandle(ref, () => inputRef.current as TextInput, [])

  // state value for country modal
  const [isCountryModalVisible, { toggle: toggleCountryModal }] = useToggle()

  const [selectedCountry, setSelectedCountry] = useState<ICountriesData>()

  //   focus on the text input with either the props `refs` | `inputRefs`
  const handleFocus = () => {
    refs ? refs.current?.focus() : inputRef.current?.focus()
  }

  const progress = useSharedValue(0)

  const { colors } = useTheme()

  //   label animation style
  const labelAnimationStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.85])
    const translateY = interpolate(progress.value, [0, 1], [0, -30])
    const translateX = interpolate(progress.value, [0, 1], [5, 0])

    return {
      transform: [{ scale }, { translateY }, { translateX }]
    }
  }, [])

  //   label animation
  useEffect(() => {
    progress.value = withTiming(isFocused || !!value ? 1 : 0, {
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, value])

  const getBorderColor = () => {
    if (isFocused) {
      return colors.primary
    }

    if (errorText && touched) {
      return colors.red
    }

    return colors.offWhiteLight
  }

  useEffect(() => {
    getCountry && getCountry(selectedCountry)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry])

  return (
    <View
    // ref={(view) => {
    //   if (sensitiveField || preset === 'password') {
    //     // RNUxcam.occludeSensitiveView(view)
    //   }
    // }}
    >
      <View
        style={[
          CONTAINER,
          {
            borderColor: getBorderColor()
          },
          style
        ]}
      >
        {label && preset !== 'phone-number' && (
          <TouchableWithoutFeedback onPress={handleFocus}>
            <Animated.View style={[LABEL_CONTAINER, labelAnimationStyle]}>
              <Text
                color={isFocused || value ? 'primary' : 'soft-tect'}
                style={labelStyle}
                variant="button-15-bold"
              >
                {label}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        )}

        {preset === 'phone-number' && (
          <TouchableOpacity onPress={toggleCountryModal}>
            <Box
              alignItems="center"
              borderColor="offWhiteLight"
              borderRightWidth={1}
              flexDirection="row"
              justifyContent="center"
              paddingHorizontal={{ custom: 10 }}
            >
              {selectedCountry ? (
                <Box
                  alignItems="center"
                  justifyContent="center"
                  marginRight={8}
                  marginTop={5}
                >
                  <Text variant="header-h3-18-reg">
                    {selectedCountry?.flag}
                  </Text>
                </Box>
              ) : (
                <Circle
                  backgroundColor="neutral-grey"
                  marginRight={8}
                  size={16}
                />
              )}
              <Text color="soft-tect" variant="header-h3-18-reg">
                +
                {`${
                  selectedCountry ? selectedCountry?.countryCallingCode : '000'
                }`}
              </Text>
              <Box marginLeft={8}>
                <Icon height={6} name="grey-down-arrow" width={12} />
              </Box>
            </Box>
          </TouchableOpacity>
        )}

        <View style={INPUT_CASE}>
          <TextInput
            ref={refs || inputRef}
            style={[INPUT, { color: colors['text-black'] }, labelStyle]}
            {...restOfProps}
            onBlur={(event) => {
              setIsFocused(false)
              onBlur?.(event)
            }}
            onFocus={(event) => {
              setIsFocused(true)
              onFocus?.(event)
            }}
            secureTextEntry={preset === 'password' ? isSecure : false}
            value={value}
          />
        </View>

        {icon && <View style={{ marginHorizontal: gw(12) }}>{icon}</View>}

        {iconName && !icon && (
          <View style={ICON}>
            <IIcon color={colors.primary} name={iconName} size={gw(23)} />
          </View>
        )}

        {preset === 'password' && (
          <TouchableOpacity
            onPress={() => {
              setIsSecure(!isSecure)
            }}
            style={ICON}
          >
            <IIcon
              color={colors.primary}
              name={isSecure ? 'eye' : 'eye-off'}
              size={gw(23)}
            />
          </TouchableOpacity>
        )}
      </View>

      {!!errorText && touched && (
        <Text
          color="red"
          fontWeight="bold"
          marginLeft="s"
          marginTop="s"
          variant="reg-14-text"
        >
          {errorText}
        </Text>
      )}
      <CountryModal
        countryCode={selectedCountry?.countryCode}
        isOpen={isCountryModalVisible}
        selectCountry={setSelectedCountry}
        toggleModalVisibility={toggleCountryModal}
      />
    </View>
  )
})

TextField.displayName = 'TextField'

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  borderRadius: 6,
  borderWidth: 1,
  flexDirection: 'row'
}

const ICON: TextStyle = {
  paddingHorizontal: 12
}

const INPUT: TextStyle = {
  fontFamily: 'DMSans-Bold',
  padding: 16
}

const INPUT_CASE: ViewStyle = {
  flex: 1
}

const LABEL_CONTAINER: ViewStyle = {
  backgroundColor: 'white',
  marginHorizontal: 10,
  paddingHorizontal: 8,
  position: 'absolute'
}
