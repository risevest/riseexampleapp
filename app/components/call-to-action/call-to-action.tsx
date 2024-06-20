import { Bleed, Box, Divider } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import React, { ReactNode } from 'react'

interface CallToActionProps {
  element: ReactNode
  element2?: ReactNode
}

function CallToActionContent({ element }: Pick<CallToActionProps, 'element'>) {
  return (
    <Box alignItems="center" flexDirection="row">
      <Box marginRight={19}>
        <Icon name="purple-warning" size={20} />
      </Box>
      <Box width="90%">{element}</Box>
    </Box>
  )
}

export function CallToAction({ element, element2 }: CallToActionProps) {
  return (
    <Box
      backgroundColor="purple004"
      borderRadius={12}
      overflow="hidden"
      padding={10}
      paddingLeft={12}
    >
      <CallToActionContent element={element} />
      {element2 && (
        <>
          <Bleed left="m" marginVertical={10} right="m">
            <Divider color="red" style={DIVIDER} />
          </Bleed>
          <Box>
            <CallToActionContent element={element2} />
          </Box>
        </>
      )}
    </Box>
  )
}

const DIVIDER = {
  backgroundColor: 'CBB2EB',
  borderWidth: 0.5,
  opacity: 0.1
}
