import { Box } from '@risemaxi/sarcelle'
import {
  NewButton as Button,
  NewHeader as Header,
  Pair,
  Screen
} from 'app/components'
import { useSavedOnboardingProps, useSettingsActions } from 'app/store/settings'
import { AuthStackScreenProps } from 'app/view/navigator/types'
import { format } from 'date-fns'
import React from 'react'

export function ReviewDetails({
  navigation
}: AuthStackScreenProps<'ReviewDetails'>) {
  const props = useSavedOnboardingProps()
  const { setSavedOnboardingProps } = useSettingsActions()

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <Box
      as={Screen}
      footer={
        <Box marginBottom={73} paddingHorizontal="m">
          <Button onPress={goBack} preset="secondary" text="Edit details" />
          <Box marginVertical={4} />
          <Button
            onPress={() => {
              setSavedOnboardingProps(props)
              navigation.navigate('SetupPassword')
            }}
            text="Continue"
          />
        </Box>
      }
      header={
        <Header
          headerText="Review details"
          leftItem="back-icon"
          onLeftPress={goBack}
        />
      }
      paddingHorizontal="m"
    >
      <Pair label="Legal first name" value={props?.firstName ?? ''} />
      <Pair label="Legal last name" value={props?.lastName ?? ''} />
      <Pair label="Email address" value={props?.emailAddress ?? ''} />
      <Pair
        label="Date of birth"
        value={format(new Date(String(props?.dateOfBirth)), 'do MMMM, YYY')}
      />
    </Box>
  )
}
