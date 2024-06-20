import { Box, Circle, Text } from '@risemaxi/sarcelle'
import { getComputedWidth } from 'app/design'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { SlideInLeft, SlideOutRight } from 'react-native-reanimated'

import { SpringBox } from '../animated/spring-box'
import { CustomKeyboardProps } from './custom-keyboard.props'
import { useCustomKeyboard } from './use-custom-keyboard'

const columnWrapperStyle = { justifyContent: 'space-between' } as const

export default function CustomKeyboard(props: CustomKeyboardProps) {
  const {
    disabled,
    description,
    maxLength = 6,
    showPIN = false,
    ...rest
  } = props
  const { borderColor, handleKeyPress, hasError, keypadData, value } =
    useCustomKeyboard(props)

  return (
    <Box flex={1} justifyContent="space-between" {...rest}>
      <Box>
        <Box flexDirection="row" justifyContent="space-between">
          {Array.from({ length: maxLength }, (_, index) => `${index}`).map(
            (item, index) => (
              <Box
                alignItems="center"
                borderColor={borderColor(value?.[index])}
                borderRadius={5}
                borderWidth={1}
                height={42}
                justifyContent="center"
                key={item}
                marginRight={13}
                overflow="hidden"
                width={42}
              >
                {showPIN ? (
                  <>
                    {value?.[index] && (
                      <Text
                        fontSize={18}
                        textAlign="center"
                        variant="num-reg-18"
                      >
                        {value?.[index]}
                      </Text>
                    )}
                  </>
                ) : (
                  <>
                    {value?.[index] && (
                      <Circle backgroundColor="neutral-dark-mode" size={5} />
                    )}
                  </>
                )}
              </Box>
            )
          )}
        </Box>
        {typeof description === 'string' ? (
          <SpringBox
            dampingFactor={2}
            entering={SlideInLeft}
            exiting={SlideOutRight}
            key={`${hasError}`}
            visible={!!hasError}
          >
            <Text color="red">{description}</Text>
          </SpringBox>
        ) : (
          description
        )}
      </Box>
      <Box>
        <FlatList
          bounces={false}
          columnWrapperStyle={columnWrapperStyle}
          data={keypadData}
          keyExtractor={(index) => index.value}
          numColumns={3}
          renderItem={({ index, item }) => (
            <Box
              opacity={disabled ? 0.5 : 1}
              pb={index < 9 ? 'l' : 'none'}
              pointerEvents={disabled ? 'none' : undefined}
            >
              {item.hide ? (
                <Box width={getComputedWidth(72)} />
              ) : (
                <TouchableOpacity
                  onPress={() => handleKeyPress(item.value)}
                  testID={item.value}
                >
                  <Box
                    alignItems="center"
                    aspectRatio={1}
                    justifyContent="center"
                    width={getComputedWidth(72)}
                  >
                    {item.icon ? (
                      item.icon
                    ) : (
                      <Text fontSize={30} lineHeight={35} variant="bold-18">
                        {item.value}
                      </Text>
                    )}
                  </Box>
                </TouchableOpacity>
              )}
            </Box>
          )}
        />
      </Box>
    </Box>
  )
}
