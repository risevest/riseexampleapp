import { Text, useTheme as useTheme2 } from '@risemaxi/sarcelle'
import Arrow from 'app/assets/icons/svg/arrow.svg'
import { getComputedHeight } from 'app/design/responsiveModule'
import { UseTheme, useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import React, { useState } from 'react'
import {
  Animated,
  ScrollView,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

const usePickerStyles = () => {
  const { theme } = useTheme() as UseTheme
  const styles = StyleSheet.create({
    dropDownPicker: {
      alignItems: 'center',
      borderColor: theme.primaryColor,
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: 'row',
      height: 55,
      justifyContent: 'space-between',
      paddingHorizontal: 16
    }
  })

  return { styles, theme }
}

export interface PickerItem<T> {
  label: string
  value: T
}

interface IPickerProps<T> {
  CustomItem?: React.ComponentType<{ item: PickerItem<T> }>
  CustomValue?: React.ComponentType<{
    selectedOption?: string | null | undefined
  }>
  containerStyle?: ViewStyle
  customXOffset?: number
  errorText?: string
  handleSelectedOption?: (optionSelected: { label: string; value: T }) => void
  items: PickerItem<T>[]
  label: string
  labelStyle?: any
  onItemSelected: (value: T) => void
  option?: string | null
}

export function Picker<T>({
  items,
  onItemSelected,
  handleSelectedOption,
  option,
  labelStyle,
  label,
  containerStyle = CONTAINER,
  errorText,
  CustomItem,
  CustomValue
}: IPickerProps<T>) {
  const [openDropdown, setDropdown] = useState(false)
  const { theme, styles } = usePickerStyles()
  const { colors } = useTheme2()

  const SCROLL_VIEW: ViewStyle = {
    ...(items.length > 4 ? { height: getComputedHeight(200) } : {}),
    backgroundColor: theme.primarySurface,
    borderColor: '#E6F5F6',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 2,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: 'rgba(8, 152, 160, .4)',
    shadowOffset: {
      height: 0,
      width: 0
    }
  }

  const getBorderColor = () => {
    if (errorText) {
      return colors.red
    }

    return colors.offWhiteLight
  }
  const DROP_DOWN: ViewStyle = {
    borderColor: getBorderColor()
  }

  return (
    <View style={[containerStyle]}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <TouchableOpacity
        onPress={() => setDropdown(!openDropdown)}
        style={[styles.dropDownPicker, DROP_DOWN]}
        testID={label}
      >
        {CustomValue ? (
          <CustomValue selectedOption={option} />
        ) : (
          <Text style={INPUT}>{String(option)}</Text>
        )}
        <Arrow height={15} width={15} />
      </TouchableOpacity>
      {openDropdown && (
        <ScrollView nestedScrollEnabled={true} style={SCROLL_VIEW}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setDropdown(false)
                handleSelectedOption?.(item)
                onItemSelected(item.value)
              }}
              testID={item.label}
            >
              {CustomItem ? (
                <CustomItem item={item} />
              ) : (
                <P
                  fontWeight="600"
                  key={index}
                  style={LABEL}
                  text={item.label}
                  type="dark"
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
    </View>
  )
}

const LABEL: TextStyle = { marginVertical: 15 }
class PickerContainer<T> extends React.Component<IPickerProps<T>> {
  state = {
    animatedValue: new Animated.Value(0),
    option: null
  }

  componentDidMount() {
    this.setState({ option: this.props.option })
  }

  UNSAFE_componentWillReceiveProps(nextProps: IPickerProps<T>) {
    if (this.props.option !== nextProps.option) {
      this.setState({
        option: nextProps.option
      })
    }
  }

  componentDidUpdate() {
    Animated.timing(this.state.animatedValue, {
      duration: 500,
      toValue: this.state.option !== null ? 1 : 0,
      useNativeDriver: true
    }).start()
  }

  handleSelectedOption = (option: any) => {
    this.setState({ option })
  }

  render() {
    const { option, animatedValue } = this.state
    const { customXOffset } = this.props
    const translateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, typeof customXOffset === 'number' ? customXOffset : -15]
    })
    const translateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [17.5, -12]
    })

    const scaleX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 0.75]
    })
    const scaleY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.9, 0.75]
    })

    const labelStyle: TextStyle = {
      backgroundColor: 'white',
      color: !option ? '#71879C' : '#0898A0',
      fontFamily: 'DMSans-Medium',
      fontSize: 18,
      left: 0,
      paddingHorizontal: 2,
      position: 'absolute',
      transform: [{ translateX }, { translateY }, { scaleY }, { scaleX }],
      zIndex: option !== '' ? 10 : 1
    }

    return (
      <Picker
        handleSelectedOption={this.handleSelectedOption}
        labelStyle={labelStyle}
        option={option}
        {...this.props}
      />
    )
  }
}

export default PickerContainer

const CONTAINER: ViewStyle = {
  marginTop: 30
  // flex: 1
}

const INPUT: TextStyle = {
  fontFamily: 'DMSans-Bold',
  fontWeight: '700'
}
