/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {
  Animated,
  FlatList,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'

import { GreyArrow, TickIcon } from '../../assets/future/icons'
import { SearchIcon } from '../../assets/future/icons/SearchIcon'
import { countriesData, ICountriesData } from '../../utils/countriesData'
import { sortArray } from '../../utils/index'
import { Text } from '../Text'
import { useInputStyles } from './styles'
import { InputProps, InputState } from './types'

export const Input = ({
  value,
  hasError,
  hasPlaceholder,
  placeholder,
  handleBlur,
  label,
  Icon,
  inputType,
  leftText = '₦',
  countryCallingCode,
  getCountryCallingCode,
  containerStyle,
  labelStyle,
  ...rest
}: InputProps) => {
  const isPhoneInput = inputType === 'phone'
  const isCurrencyInput = inputType === 'currency'
  const countryCode = isPhoneInput ? countryCallingCode?.slice(1) : '234'

  const [inputState, setState] = React.useState<InputState>(() => ({
    animatedValue: new Animated.Value(0),
    country: countriesData.find(
      (country) =>
        country.countryCallingCode ===
        (countryCode?.trim() === '' || typeof countryCode === 'undefined'
          ? '234'
          : countryCode)
    ),
    isFocused: false,
    isModalOpen: false,
    searchedCountries: countriesData,
    value: value || ''
  }))
  const { isFocused, animatedValue } = inputState

  const handleFocus = () => updateState('isFocused', true)

  const onBlur = () => {
    updateState('isFocused', false)
    handleBlur?.()
  }

  const handleCountryCodeSelection = (country: ICountriesData) => {
    setState({
      ...inputState,
      country,
      isModalOpen: false,
      searchedCountries: handleSortCountries(countriesData)
    })
    getCountryCallingCode?.(country.countryCallingCode)
  }

  const handleSortCountries = (countries: ICountriesData[]) => {
    const { country } = inputState

    const filteredCountries = countries.filter(
      (countryInfo) => countryInfo.countryNameEn !== country?.countryNameEn
    )
    const sortedCountries = sortArray(filteredCountries, 'countryNameEn')

    return [{ ...country } as ICountriesData, ...sortedCountries]
  }

  const onInputSearch = (searchString: string) => {
    if (searchString.length >= 1) {
      const searchedCountries = countriesData.filter((country) =>
        country.countryNameEn.toLowerCase().includes(searchString.toLowerCase())
      )
      setState({
        ...inputState,
        searchedCountries
      })
    } else {
      setState({
        ...inputState,
        searchedCountries: handleSortCountries(countriesData)
      })
    }
  }

  const toggleModalVisibility = (isModalOpen: boolean) => {
    setState({
      ...inputState,
      isModalOpen
    })
  }

  const updateState = <K extends keyof InputState>(
    key: K,
    stateValue: InputState[K]
  ) => {
    setState({
      ...inputState,
      [key]: stateValue
    })
  }

  React.useEffect(() => {
    if (inputType === 'phone') {
      if (!getCountryCallingCode) {
        throw new Error('You need to provide a getCountryCallingCode function')
      }
      getCountryCallingCode(inputState.country?.countryCallingCode || '234')
    }
  }, [])

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      duration: 300,
      toValue: isFocused || value !== '' ? 1 : 0,
      useNativeDriver: true
    }).start()
  }, [isFocused])

  const renderCountryFlag = () => {
    const { country } = inputState
    return (
      <TouchableOpacity
        onPress={() => toggleModalVisibility(true)}
        style={FLAG_CONTAINER}
      >
        <Text type="r-16-main">{country?.flag || ''}</Text>
        <View style={styles.flagWrapper}>
          <Text type="r-16-main">{`+${country?.countryCallingCode}`}</Text>
        </View>
        <GreyArrow height={20} width={12} />
        <View style={styles.divider} />
      </TouchableOpacity>
    )
  }

  const renderCountryModal = () => {
    const { isModalOpen, country } = inputState
    return (
      <View>
        <Modal
          animationIn="slideInUp"
          animationInTiming={800}
          animationOut="slideOutDown"
          animationOutTiming={800}
          backdropColor={theme.darkModalBackground}
          backdropOpacity={0.8}
          isVisible={isModalOpen}
          onBackButtonPress={() => toggleModalVisibility(false)}
          onBackdropPress={() => toggleModalVisibility(false)}
          style={MODAL}
          useNativeDriver
        >
          <View style={styles.modalWrapper}>
            <View style={SEARCH_INPUT_CONTAINER}>
              <View style={styles.searchHeading}>
                <SearchIcon height={14} width={14} />
                <TextInput
                  autoCorrect={false}
                  onChangeText={(textValue) => onInputSearch(textValue)}
                  placeholder="Search Country"
                  placeholderTextColor="#0898A0"
                  style={SEARCH_INPUT}
                />
              </View>
            </View>
            <FlatList
              data={handleSortCountries(inputState.searchedCountries)}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCountryCodeSelection(item)}
                  style={styles.countryItem}
                >
                  <Text type="r-16-main">{item.countryNameEn}</Text>
                  <Text textStyle={COUNTRY_CODE_TEXT} type="r-16-main">
                    {`[+${item.countryCallingCode}]`}
                  </Text>
                  {country?.countryNameEn === item.countryNameEn && (
                    <TickIcon height={10} style={TICK_ICON} width={13} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    )
  }

  const outputRange = isPhoneInput
    ? [140, 15]
    : isCurrencyInput
      ? [28, -570]
      : [28, 17]
  const translateX = animatedValue.interpolate({
    inputRange: [0, 10],
    outputRange
  })
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [17, -10]
  })
  const scaleX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.2, 1]
  })
  const scaleY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.2, 1]
  })

  const { theme, styles } = useInputStyles({
    hasError,
    isCurrencyInput,
    isFocused: value !== '' || inputState.isFocused,
    scaleX,
    scaleY,
    translateX,
    translateY
  })

  const inputFocused = isFocused || value !== ''

  const TEXT_BLOCK: TextStyle = {
    borderColor: theme.primaryColor,
    borderWidth: 1,
    height: 55 / 2,
    marginLeft: 15,
    marginRight: 10,
    width: 1
  }

  const TEXT_LABEL: TextStyle = {
    color: inputFocused ? theme.primaryColor : '#292f33',
    lineHeight: 13
  }

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {isPhoneInput && renderCountryFlag()}
      {isCurrencyInput && (
        <View style={TEXT_CONTAINER}>
          <Text type="reg-17-button" variant="primary">
            {leftText}
          </Text>
          <View style={TEXT_BLOCK} />
        </View>
      )}
      <Animated.View style={styles.labelStyle}>
        <Text
          textStyle={{ ...TEXT_LABEL, ...labelStyle }}
          type="label-10"
          variant={inputFocused ? 'primary' : 'dark'}
        >
          {label || 'Email'}
        </Text>
      </Animated.View>
      <TextInput
        autoCorrect={false}
        onBlur={onBlur}
        onFocus={handleFocus}
        style={styles.input}
        {...(hasPlaceholder && isFocused && value === '' && { placeholder })}
        value={value}
        {...rest}
      />
      {inputType === 'icon-input' && Icon && (
        <TouchableOpacity onPress={() => toggleModalVisibility(true)}>
          <Icon />
        </TouchableOpacity>
      )}
      {renderCountryModal()}
    </View>
  )
}

const SEARCH_INPUT_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  padding: 20
}

const SEARCH_INPUT: ViewStyle = { flex: 1, paddingLeft: 5 }

const COUNTRY_CODE_TEXT: TextStyle = { marginLeft: 10 }

const TICK_ICON: TextStyle = { marginLeft: 'auto' }

const TEXT_CONTAINER: TextStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  marginLeft: 5
}

const FLAG_CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row'
}

const MODAL: ViewStyle = {
  margin: 0
}
