import { Box, Text } from '@risemaxi/sarcelle'
import { DynamicModal, NewButton as Button } from 'app/components'
import React from 'react'

interface LegalNameModalProps {
  isOpen: boolean
  toggle: () => void
}

export default function LegalNameModal({
  isOpen,
  toggle
}: LegalNameModalProps) {
  return (
    <DynamicModal
      headerText="Why does Rise need my legal name?"
      height="35%"
      isModalOpen={isOpen}
      toggleModalVisibility={toggle}
      type="fixedHeight"
    >
      <Box marginTop={16}>
        <Box marginBottom={32}>
          <Text
            color="neutral-dark-mode"
            textAlign="center"
            variant="body-15-regular"
          >
            Rise needs your legal name as it appears on your ID for verification
            and payout purposes.
          </Text>
        </Box>

        <Button onPress={toggle} preset="secondary" text="Okay, got it!" />
      </Box>
    </DynamicModal>
  )
}
