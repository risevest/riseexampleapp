import { Box, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { NewButton as Button, Retry, Screen, TextField } from 'app/components'
import { RiseInput } from 'app/components/Input/index'
import { useAddSocialSurvey } from 'app/domains/user'
import { useUser } from 'app/hooks'
import { useSettingsActions } from 'app/store/settings'
import { logEvent } from 'app/utils/analytics'
import amplitude from 'app/utils/analytics/amplitude'
import CustomerIO from 'app/utils/analytics/customer-io'
import { getFromClipboard } from 'app/utils/utilFunctions'
import { NestedStackScreenProps } from 'app/view/navigator/types'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ViewStyle
} from 'react-native'

import { Checkbox } from './component/checkbox'

const referrals = [
  'From family or friends',
  'Twitter',
  'Facebook',
  'Instagram',
  'Other'
]

export function SocialSurvey({
  navigation
}: NestedStackScreenProps<'SocialSurvey'>) {
  const { setIsOnboarding, setIsNewSignUp, setSavedOnboardingProps } =
    useSettingsActions()
  const [referral, setReferral] = useState('')
  const [other, setOther] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const { user, status, refetch } = useUser()

  const addSocialSurveyMutation = useAddSocialSurvey()

  const pasteItem = async () => {
    const item = await getFromClipboard()
    setReferralCode(item)
  }
  const disabled = !referral || (referral === 'other' && !other)

  const addSurvey = () => {
    setIsNewSignUp(true)
    if (disabled) {
      navigation.navigate('AccountSuccessScreen', {
        name: String(user?.firstName)
      })
      return
    }
    addSocialSurveyMutation.mutate(
      {
        informationSource:
          referral.toLowerCase() === 'other' ? other : referral,
        referralCode
      },
      {
        onSuccess: () => {
          logEvent('fill_attribution_form', {
            attribution_channel: referral === 'other' ? other : referral,
            is_referred: String(Boolean(referral))
          })
          amplitude.logEvent('Attribution Form Filled', {
            'In-App Attribution Channel':
              referral === 'other' ? other : referral
          })
          CustomerIO.logEvent('attribution_form_filled', {
            inapp_attribution_channel: referral || other
          })
          setIsOnboarding(false)
          setSavedOnboardingProps(undefined)
          navigation.navigate('AccountSuccessScreen', {
            name: String(user?.firstName)
          })
        }
      }
    )
  }

  return (
    <Box as={Screen} preset="scroll">
      {status === 'pending' && <ActivityIndicator />}
      {status === 'failed' && (
        <Retry onRetry={refetch} text="Failed to fetch user" />
      )}
      {status === 'success' && (
        <>
          <Image
            height={124}
            resizeMode="cover"
            source={require('app/assets/future/images/cloudy-bg.png')}
          />
          <Box paddingHorizontal="m">
            <Text variant="header-h2-20-bold">Just a moment... </Text>
            <Text variant="header-h2-20-medium">
              How did you hear about us?
            </Text>

            <Box marginTop={24}>
              {referrals.map((ref) => (
                <Checkbox
                  checked={referral === ref.toLowerCase()}
                  fontSize={15}
                  key={ref}
                  label={ref}
                  onPress={() => setReferral(ref.toLowerCase())}
                />
              ))}
            </Box>

            {referral === 'other' && (
              <RiseInput
                onChangeText={(text) => setOther(text)}
                style={INPUT_STYLE2}
                value={other}
              />
            )}

            <Box marginBottom={24} marginTop={32}>
              <Box
                alignItems="center"
                borderColor="offWhite0003"
                borderTopWidth={1}
                flexDirection="row"
                justifyContent="space-between"
                paddingVertical={20}
              >
                <Text color="gray" variant="body-15-regular">
                  Enter referral code
                </Text>
                <Icon name="grey-down-arrow" />
              </Box>

              <TextField
                icon={
                  <TouchableOpacity onPress={pasteItem}>
                    <Box
                      backgroundColor="offWhite0003"
                      borderRadius={2}
                      height={36}
                      justifyContent="center"
                      width={61}
                    >
                      <Text
                        color="primary"
                        textAlign="center"
                        variant="button-15-bold"
                      >
                        Paste
                      </Text>
                    </Box>
                  </TouchableOpacity>
                }
                onChangeText={(text) => setReferralCode(text)}
                preset="default"
                value={referralCode}
              />
            </Box>

            <Button
              isLoading={addSocialSurveyMutation.isLoading}
              onPress={addSurvey}
              text="Continue"
            />
          </Box>
        </>
      )}
    </Box>
  )
}

const INPUT_STYLE2: ViewStyle = { marginTop: 16 }
