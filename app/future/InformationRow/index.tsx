import Styles from 'app/design/Styles'
import { useTheme } from 'app/design/theme'
import { P } from 'app/design/typography'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

interface InformationRowProps {
  clickable?: boolean
  label: string | JSX.Element
  onPress?: () => void
  value: string
}

export const InformationRow = ({
  label,
  value,
  clickable,
  onPress
}: InformationRowProps) => {
  const { styles, theme } = useProfileStyles()
  return (
    <TouchableOpacity disabled={!clickable} onPress={onPress}>
      <View style={[styles.row, styles.center]}>
        <P fontsize={15} fontWeight="300" text={label} />
        <View style={[Styles.row, styles.center]}>
          <P fontsize={15} fontWeight="300" text={value} type="dark" />
          {clickable && (
            <Entypo
              color={theme.primaryTextColor}
              name="chevron-small-right"
              size={22}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const useProfileStyles = () => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    center: { alignItems: 'center' },
    row: {
      ...Styles.row,
      ...Styles.spaceBetween,
      borderBottomColor: theme.lightText,
      borderBottomWidth: 1,
      marginTop: 15,
      paddingBottom: 15
    }
  })

  return { styles, theme }
}
