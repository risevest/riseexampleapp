import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { NewButton as Button, Screen } from 'app/components'
import { spacing } from 'app/design'
import { NestedStackScreenProps } from 'app/view/navigator/types'
import React from 'react'
import { ViewStyle } from 'react-native'

export function SuccessScreen({
  navigation,
  route
}: NestedStackScreenProps<'AccountSuccessScreen'>) {
  const name = route.params?.name

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
  }

  return (
    <>
      <Box as={Screen} padding="m" style={CONTAINER} unsafe>
        <Box
          alignItems="center"
          marginTop={spacing.massive * 2}
          paddingHorizontal={spacing.massive}
        >
          <Box>
            <Icon
              height={spacing.massive + spacing.larger}
              name="success"
              width={spacing.massive + spacing.larger}
            />
          </Box>

          <Text mt="l" textAlign="center" variant="header-h2-20-medium">
            You’ve created your Rise account
          </Text>

          <Text
            color="soft-tect"
            mt="s"
            textAlign="center"
            variant="body-15-regular"
          >
            {`Welcome, ${name} `}
          </Text>
        </Box>

        <Box>
          <Box
            as={Button}
            marginVertical="m"
            onPress={navigateToHome}
            text="Open Rise Home"
          />
        </Box>
      </Box>
    </>
  )
}

const CONTAINER: ViewStyle = {
  justifyContent: 'space-between'
}
