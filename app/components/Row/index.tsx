import Styles from 'app/design/Styles'
import { UseTheme, useTheme } from 'app/design/theme'
import { Text } from 'app/future'
import React, { ReactNode } from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'

interface IRow {
  leftText: string
  rightContent?: ReactNode
  rightText?: string
  rightTextType?: 'dark' | 'light' | 'primary' | 'danger' | 'white' | 'success'
  style?: any
}

const useRowStyles = () => {
  const { theme } = useTheme() as UseTheme

  const styles = StyleSheet.create({
    itemRow: {
      ...Styles.spaceBetween,
      ...Styles.marginSpacing,
      borderBottomColor: theme.lightGrey,
      borderBottomWidth: 1,
      paddingBottom: 15
    }
  })

  return { styles, theme }
}

const Row = ({ leftText, rightText, rightContent, style }: IRow) => {
  const { styles } = useRowStyles()
  return (
    <View style={[styles.itemRow, style]}>
      <Text textStyle={LEFT_STYLE} type="reg-17-main" variant="light">
        {leftText}
      </Text>
      {rightText && (
        <Text textStyle={RIGHT_STYLE} type="num-15-reg" variant="dark">
          {rightText}
        </Text>
      )}
      {rightContent && rightContent}
    </View>
  )
}

const LEFT_STYLE: TextStyle = { color: '#71879c' }
const RIGHT_STYLE: TextStyle = { color: '#333333' }

export default Row
