// import RNUxcam from 'react-native-ux-cam'
import { Circle } from '@risemaxi/sarcelle'
import IconComponent from 'app/assets/icons'
import GreyDownArrow from 'app/assets/icons/svg/grey-down-arrow.svg'
import Tick from 'app/assets/icons/svg/tick.svg'
import { getComputedWidth } from 'app/design/responsiveModule'
import { countriesData, ICountriesData } from 'app/utils/countriesData'
import React from 'react'
import {
  Animated,
  FlatList,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'

import { UseTheme, useTheme } from '../../design/theme'
import { Body, P } from '../../design/typography'

type IInputProps = {
  Icon?: JSX.Element | null
  getCountry?: (country: ICountriesData) => void
  handleBlur?: (e: any) => void
  hasErrors?: boolean
  hasIcon?: boolean
  hasLabel?: boolean
  includePhoneCountryCode?: boolean
  inputStyle?: any
  isPressable?: boolean
  label?: string
  labelStyle?: StyleProp<TextStyle>
  leftContent?: string
  leftText?: string
  placeHolderText?: string
  placeHolderTextColor?: string
  placeholder?: string
  selectableLeftContent?: string
  sensitiveField?: boolean
  style?: any
  usePlaceholder?: boolean
  value?: string
} & TextInputProps &
  TouchableOpacityProps

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: 'DMSans-Medium',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 18,
    opacity: 0.8
  },
  leftContent: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  numericInputLabel: {
    paddingLeft: 10,
    paddingRight: 14,
    position: 'absolute',
    top: -13
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'rgba(230, 245, 246, 0.2)',
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    height: 55,
    justifyContent: 'space-between',
    marginTop: 35,
    paddingHorizontal: 15
  }
})

const Input = ({
  hasIcon = false,
  placeHolderText,
  style,
  Icon,
  ...rest
}: IInputProps) => {
  useTheme
  const { theme } = useTheme() as UseTheme
  return (
    <TouchableOpacity
      style={[styles.wrapper, { borderColor: theme.primaryColor, ...style }]}
      {...rest}
    >
      <P style={{ color: theme.tertiaryColor }} text={placeHolderText || ''} />
      {hasIcon && Icon}
    </TouchableOpacity>
  )
}

export const NumericInput = ({
  placeHolderText,
  placeHolderTextColor,
  style,
  inputStyle,
  leftContent = '',
  hasLabel,
  ...rest
}: IInputProps) => {
  const { theme } = useTheme() as UseTheme

  const TEXT_INPUT_CONTAINER: ViewStyle = {
    borderLeftColor: theme.primaryColor,
    borderLeftWidth: 1,
    marginHorizontal: 13,
    marginVertical: 12
  }

  return (
    <View
      style={[styles.wrapper, { borderColor: theme.primaryColor, ...style }]}
    >
      <View style={styles.leftContent}>
        <Body text={leftContent} type="dark" />
      </View>
      <View style={TEXT_INPUT_CONTAINER} />
      <TextInput
        placeholder={placeHolderText}
        placeholderTextColor={placeHolderTextColor || theme.tertiaryColor}
        style={[styles.input, { color: theme.tertiaryColor, ...inputStyle }]}
        {...rest}
      />
      {hasLabel && (
        <View
          style={[
            styles.numericInputLabel,
            { backgroundColor: theme.primarySurface }
          ]}
        >
          <P text="Phone Number" />
        </View>
      )}
    </View>
  )
}

type InputState = {
  animatedValue: Animated.AnimatedValue
  country: ICountriesData | undefined
  filteredCountriesData: ICountriesData[]
  isFocused: boolean
  isModalOpen: boolean
  searchValue: string
  value: string | undefined
}

export class RiseInput extends React.Component<IInputProps, InputState> {
  constructor(props: IInputProps) {
    super(props)
    const { selectableLeftContent } = this.props
    const countryCode = selectableLeftContent
      ? selectableLeftContent.slice(1)
      : ''
    this.state = {
      animatedValue: new Animated.Value(0),
      country: countriesData.find(
        (country) =>
          country.countryCallingCode ===
          (countryCode.trim() === '' || countryCode === 'undefined'
            ? undefined
            : countryCode)
      ),
      filteredCountriesData: [] as ICountriesData[],
      isFocused: false,
      isModalOpen: false,
      searchValue: '',
      value: this.props.value || ''
    }
  }

  toggleModalVisibility = (isModalOpen: boolean) => {
    this.setState({ isModalOpen, searchValue: '' })
  }

  handleCountryCodeSelected = (item: ICountriesData) => {
    this.setState({ country: item, isModalOpen: false })
    if (this.props.getCountry) {
      this.props.getCountry(item)
    }
  }

  componentDidMount() {
    this.setState({ value: this.props.value }, () => {
      if (this.props.getCountry) {
        if (this.state.country) {
          this.props?.getCountry(this.state.country)
        }
      }
    })
  }

  handleTextChange = (newValue: string) => {
    this.setState({ value: newValue })
  }

  componentDidUpdate() {
    Animated.timing(this.state.animatedValue, {
      duration: 300,
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      useNativeDriver: true
    }).start()
  }

  handleFocus = () => this.setState({ isFocused: true })
  handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { handleBlur } = this.props
    this.setState({ isFocused: false })
    handleBlur && handleBlur(e)
  }

  handleInputSearch = (searchString: string) => {
    if (searchString.length >= 1) {
      const filteredCountries: ICountriesData[] = countriesData.filter(
        (country) =>
          country.countryNameEn
            .toLowerCase()
            .includes(searchString.toLowerCase())
      )
      this.setState({
        filteredCountriesData: filteredCountries,
        searchValue: searchString
      })
    }
  }

  handleSortCountries = (countries: ICountriesData[]): ICountriesData[] => {
    const sortedArray = countries
      .slice()
      .filter(
        (country) => country.countryNameEn !== this.state.country?.countryNameEn
      )
      .sort((a, b) => {
        const countryA = a.countryNameEn.toLowerCase()
        const countryB = b.countryNameEn.toLowerCase()

        if (countryA < countryB) {
          return -1
        }

        if (countryA > countryB) {
          return 1
        }

        return 0
      })

    return this.state.country
      ? [{ ...this.state.country } as ICountriesData, ...sortedArray]
      : sortedArray
  }

  render() {
    const {
      isFocused,
      animatedValue,
      country,
      searchValue,
      filteredCountriesData
    } = this.state
    const {
      label,
      hasIcon,
      Icon,
      style = {},
      leftContent = '',
      leftText = '',
      usePlaceholder,
      placeholder,
      hasErrors,
      selectableLeftContent = '',
      isPressable = false,
      inputStyle,
      includePhoneCountryCode,
      ...rest
    } = this.props

    const getComputedOutputRange = () => {
      if (leftContent !== '') {
        return [100, 15]
      }
      if (selectableLeftContent !== '' || includePhoneCountryCode) {
        return [140, 15]
      }
      if (leftText !== '') {
        return [40, 15]
      }

      return [28, 17]
    }

    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: getComputedOutputRange()
    })
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [17.5, -10]
    })
    const scaleX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1.2, 1]
    })
    const scaleY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1.2, 1]
    })

    const labelStyle: Animated.WithAnimatedObject<TextStyle> = {
      backgroundColor:
        isFocused || this.props.value !== '' ? 'white' : 'transparent',
      color: 'rgba(1, 34, 36, .8)',
      fontFamily: 'DMSans-Medium',
      left: 0,
      position: 'absolute',
      transform: [{ translateX }, { translateY }, { scaleX }, { scaleY }],
      ...(this.props.labelStyle as object)
    }

    const containerBorderColor = () => {
      if (hasErrors) {
        return '#C81C1C'
      } else if (isFocused || this.props.value !== '') {
        return '#E1E8ED'
      } else {
        return '#E1E8ED'
      }
    }

    const CONTAINER: ViewStyle = {
      borderColor: containerBorderColor(),
      borderRadius: 5,

      borderWidth: isFocused ? 2 : 1,

      flexDirection: 'row',

      // backgroundColor: 'rgba(230, 245, 246, 0.2)',
      height: 55,

      marginTop: 35,
      paddingHorizontal: 15,
      ...style
    }

    const TEXT_INPUT: ViewStyle = {
      color: '#292F33',
      flex: 1,
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      fontWeight: '600',
      lineHeight: 18,
      paddingLeft: 5,
      ...inputStyle,
      marginLeft: getComputedWidth(5),
      paddingBottom: 0,
      ...StyleSheet.flatten(this.props.labelStyle ?? {})
    }

    return (
      <View
        ref={() => {
          if (this.props.sensitiveField) {
            // RNUxcam.occludeSensitiveView(view)
          }
        }}
        style={CONTAINER}
      >
        {leftContent !== '' && (
          <>
            <View style={LEFT_TEXT_CONTAINER}>
              <Body fontsize={17} text={leftContent} type="dark" />
            </View>
            <View style={BOX_2} />
          </>
        )}
        {includePhoneCountryCode && (
          <TouchableOpacity
            onPress={() => this.toggleModalVisibility(true)}
            style={LEFT_CONTENT_CONTAINER}
          >
            {country?.flag ? (
              <P fontsize={16} text={country?.flag || ''} />
            ) : (
              <Circle backgroundColor="neutral-grey" size={16} />
            )}
            <View style={BODY_CONTAINER}>
              <Body
                fontsize={17}
                text={`+${country?.countryCallingCode || '000'}`}
                type="dark"
              />
            </View>
            <GreyDownArrow height={20} width={12} />
            <View style={BOX} />
          </TouchableOpacity>
        )}
        {leftText !== '' && (
          <View style={LEFT_TEXT_CONTAINER_2}>
            <P text={leftText} />
          </View>
        )}
        <Animated.Text style={labelStyle}>{label || ''}</Animated.Text>
        {isPressable ? (
          <TouchableOpacity
            style={PLACEHOLDER_CONTAINER}
            {...(usePlaceholder &&
              isFocused &&
              this.props.value === '' && { placeholder })}
            {...rest}
          >
            <P text={this.props.value || ''} type="dark" />
          </TouchableOpacity>
        ) : (
          <TextInput
            autoCorrect={false}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            style={TEXT_INPUT}
            {...(usePlaceholder &&
              isFocused &&
              this.props.value === '' && { placeholder })}
            {...rest}
          />
        )}
        {hasIcon && Icon}
        <View>
          <Modal
            animationIn="slideInUp"
            animationInTiming={800}
            animationOut="slideOutDown"
            animationOutTiming={800}
            backdropColor="rgba(0, 0, 0, 0.6)"
            backdropOpacity={0.8}
            isVisible={this.state.isModalOpen}
            onBackButtonPress={() => this.toggleModalVisibility(false)}
            onBackdropPress={() => this.toggleModalVisibility(false)}
            style={MODAL}
            useNativeDriver
          >
            <View style={MODAL_SUB_CONTAINER}>
              <View style={TEXT_INPUT_CONTAINER}>
                {/* <CloseIcon /> */}
                <View style={SEARCH_INPUT_CONTAINER}>
                  <IconComponent name="search-grey" size={20} />
                  <TextInput
                    autoCorrect={false}
                    onChangeText={(value) => this.handleInputSearch(value)}
                    placeholder="Search Country"
                    placeholderTextColor="#8898AA"
                    style={TEXT_INPUT_2}
                  />
                </View>
              </View>
              <FlatList
                data={
                  searchValue === ''
                    ? this.handleSortCountries(countriesData)
                    : this.handleSortCountries(filteredCountriesData)
                }
                keyExtractor={(item, index) => `${index}`}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.handleCountryCodeSelected(item)}
                    style={COUNTRY_BTN}
                  >
                    <P fontWeight="400" text={item.countryNameEn} type="dark" />
                    <P
                      fontWeight="400"
                      style={COUNTRY_CODE}
                      text={`[+${item.countryCallingCode}]`}
                      type="dark"
                    />
                    {country?.countryNameEn === item.countryNameEn && (
                      <Tick height={10} style={TICK} width={13} />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
        </View>
      </View>
    )
  }
}

const BOX: ViewStyle = {
  borderLeftColor: '#E1E8ED',
  borderLeftWidth: 1,
  height: '60%',
  marginHorizontal: 10,
  marginVertical: 12
}

const COUNTRY_BTN: ViewStyle = {
  alignItems: 'center',
  borderBottomWidth: 1,
  borderColor: '#E6F5F6',
  borderTopWidth: 1,
  flexDirection: 'row',
  paddingHorizontal: 20,
  paddingVertical: 13
}

const MODAL_SUB_CONTAINER: ViewStyle = {
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  bottom: 0,
  height: '80%',
  left: 0,
  position: 'absolute',
  right: 0
}

const SEARCH_INPUT_CONTAINER: ViewStyle = {
  alignItems: 'center',
  backgroundColor: 'rgba(113, 135, 156, 0.1)',
  borderRadius: 8,
  flex: 1,
  flexDirection: 'row',
  height: 56,
  paddingLeft: 8
}

const LEFT_TEXT_CONTAINER: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center'
}

const BOX_2: ViewStyle = {
  borderLeftColor: '#0898A0',
  borderLeftWidth: 1,
  marginHorizontal: 15,
  marginVertical: 12
}

const BODY_CONTAINER: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 10,
  marginRight: 10
}

const LEFT_CONTENT_CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row'
}

const LEFT_TEXT_CONTAINER_2: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center'
}

const PLACEHOLDER_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  paddingLeft: 5
}

const MODAL: ViewStyle = { margin: 0 }

const TEXT_INPUT_CONTAINER: ViewStyle = { flexDirection: 'row', padding: 20 }

const TEXT_INPUT_2: ViewStyle = { flex: 1, paddingLeft: 5 }

const TICK: ViewStyle = { marginLeft: 'auto' }

const COUNTRY_CODE: ViewStyle = { marginLeft: 10 }

export default Input
