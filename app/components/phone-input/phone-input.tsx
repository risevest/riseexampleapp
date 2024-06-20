import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import { getComputedWidth as gw } from 'app/design'
import React, { useEffect, useRef, useState } from 'react'
import {
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle
} from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import {
  CountryData,
  countryDataMap,
  currencyDataMap
} from './constants/countriesData'
import CountryCodes from './phone.preset'
import { PhoneInputProps } from './phone.props'

export function PhoneInput(props: PhoneInputProps) {
  // component props
  const {
    label,
    labelStyle,
    errorText,
    refs,
    value,
    style,
    currency,
    onCountryCodeChange,
    onBlur,
    onFocus,
    countryCode,
    selectableCurrencies,
    disableCountrySelect,
    ...restOfProps
  } = props

  const { colors } = useTheme()

  //   text input focus state
  const [isFocused, setIsFocused] = useState(false)

  // show/hide country modal
  const [canShowCountries, setCanShowCountries] = useState(false)

  //   selected country state - default is set to NG
  const defaultCountry: CountryData = countryDataMap[countryCode || 'NG']

  const defaultCurrency: CountryData = currencyDataMap[currency || 'NGN']

  const [selectedCountry, setSelectedCountry] = useState<CountryData>(
    defaultCountry ?? defaultCurrency
  )

  //   component reference to the text field used for input focus
  const inputRef = useRef<TextInput>(null)

  //   focus on the text input with either the props `refs` | `inputRefs`
  const handleFocus = () => {
    refs ? refs.current?.focus() : inputRef.current?.focus()
  }

  const toggleCountryCodes = () => {
    setCanShowCountries(!canShowCountries)
  }

  //   pass the selected country to the parent component
  const handleCountryCode = (item: CountryData) => {
    onCountryCodeChange?.(item)
    setSelectedCountry(item)
  }

  const progress = useSharedValue(0)

  // label animation style
  const labelAnimationStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.85])
    const translateY = interpolate(progress.value, [0, 1], [0, -30])
    const translateX = interpolate(progress.value, [0, 1], [90, 0])

    return {
      transform: [{ scale }, { translateY }, { translateX }]
    }
  }, [])

  const borderColor = (focused: boolean, error?: string) => {
    if (focused) {
      return 'primary'
    } else if (error) {
      return 'red'
    } else {
      return 'offWhiteLight'
    }
  }

  useEffect(() => {
    progress.value = withTiming(isFocused || !!value ? 1 : 0, {
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, value])

  return (
    <Box>
      <Box
        alignItems="center"
        borderColor={borderColor(isFocused, errorText)}
        borderRadius={gw(6)}
        borderWidth={1}
        flexDirection="row"
        style={style}
      >
        <TouchableOpacity
          disabled={disableCountrySelect}
          onPress={toggleCountryCodes}
          style={PHONE}
        >
          <Text containsEmoji>{selectedCountry?.flag || ''}</Text>
          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            marginHorizontal={gw(10)}
          >
            <Text variant="button-15-bold">
              +{selectedCountry?.callingCode}
            </Text>
          </Box>
        </TouchableOpacity>

        {label && (
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

        <Box flex={1}>
          <TextInput
            ref={refs || inputRef}
            style={[INPUT, { color: colors.black }, labelStyle]}
            {...restOfProps}
            keyboardType={props.keyboardType || 'number-pad'}
            onBlur={(event) => {
              setIsFocused(false)
              onBlur?.(event)
            }}
            onFocus={(event) => {
              setIsFocused(true)
              onFocus?.(event)
            }}
            value={value}
          />
        </Box>
      </Box>

      {!!errorText && (
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

      <CountryCodes
        modal={canShowCountries}
        onCountryCodeChange={handleCountryCode}
        selectableCurrencies={selectableCurrencies}
        selectedCountry={selectedCountry}
        toggleModal={toggleCountryCodes}
      />
    </Box>
  )
}

const INPUT: TextStyle = {
  fontFamily: 'DMSans-Bold',
  padding: gw(16)
}

const LABEL_CONTAINER: ViewStyle = {
  backgroundColor: '#ffffff',
  marginHorizontal: gw(10),
  paddingHorizontal: 8,
  position: 'absolute'
}

const PHONE: ViewStyle = {
  alignItems: 'center',
  borderColor: 'rgba(113, 135, 156, 0.2)',
  borderRightWidth: 1,
  flexDirection: 'row',
  marginLeft: gw(14)
}
