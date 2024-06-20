import { Box } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { NewHeader as Header } from 'app/components'
import * as React from 'react'
import {
  ScrollView,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'

import { NewButton as Button } from '../button/'
import { useGetModalHeight } from './dynamic-modal.hooks'
import { DynamicModalProps } from './dynamic-modal.props'

export function DynamicModal({
  type,
  height,
  isModalOpen,
  toggleModalVisibility,
  children,
  hideHeader,
  headerText,
  animationIn,
  animationOut,
  animationInDuration,
  animationOutDuration,
  buttons,
  buttonStyle = {},
  headerStyle = {},
  avoidKeyboard,
  onDismiss,
  disableBackDropPress,
  customHeader,
  showVerticalScrollIndicator,
  headerTextStyle,
  paddingVertical,
  paddingHorizontal,
  scrollEnabled = true,
  renderScrollView = true
}: DynamicModalProps) {
  const Wrapper = renderScrollView ? ScrollView : React.Fragment
  const modalHeight = useGetModalHeight(type, height)

  const borderRadius = type === 'fullScreen' ? 0 : 20

  return (
    <Box>
      <Modal
        animationIn={animationIn || 'slideInUp'}
        animationInTiming={animationInDuration || 700}
        animationOut={animationOut || 'slideOutDown'}
        animationOutTiming={animationOutDuration || 700}
        avoidKeyboard={avoidKeyboard}
        backdropColor="#71879C64"
        isVisible={isModalOpen}
        onBackButtonPress={toggleModalVisibility}
        onBackdropPress={
          disableBackDropPress ? undefined : toggleModalVisibility
        }
        onModalHide={onDismiss}
        style={MODAL}
        useNativeDriver
      >
        <Box
          backgroundColor="background"
          borderTopLeftRadius={borderRadius}
          borderTopRightRadius={borderRadius}
          bottom={0}
          //@ts-expect-error can accept string but wasn't defined on the library
          height={modalHeight}
          left={0}
          paddingHorizontal={paddingHorizontal ?? 16}
          paddingVertical={paddingVertical ?? 25}
          position="absolute"
          right={0}
        >
          {type !== 'fullScreen' && !hideHeader && (
            <Header
              headerText={headerText || ''}
              headerTextStyle={{ ...MODAL_HEADER_TEXT, ...headerTextStyle }}
              leftItem={
                <TouchableOpacity onPress={toggleModalVisibility}>
                  <Icon height={36} name="close-icon-bold" width={36} />
                </TouchableOpacity>
              }
              style={[HEADER, headerStyle]}
            />
          )}
          {customHeader && customHeader}
          <Wrapper
            {...(renderScrollView && {
              scrollEnabled: scrollEnabled,
              showsVerticalScrollIndicator: showVerticalScrollIndicator,
              style: SCROLL_VIEW
            })}
          >
            {children}
          </Wrapper>
          {buttons &&
            buttons.map((button, index) => (
              <Button
                disabled={button.disabled || false}
                isLoading={button.isLoading || false}
                key={`${index}-${button.text}`}
                onPress={button.onPress}
                preset={button.preset}
                style={buttonStyle}
                text={button.text}
                textStyle={button.textStyle}
              />
            ))}
        </Box>
      </Modal>
    </Box>
  )
}

const MODAL: ViewStyle = { flex: 1, margin: 0 }
const HEADER: ViewStyle = {
  justifyContent: 'flex-start',
  paddingBottom: 0,
  paddingHorizontal: 0,
  paddingTop: 0
}
const SCROLL_VIEW: ViewStyle = { flex: 1 }
const MODAL_HEADER_TEXT: TextStyle = {
  fontSize: 20,
  fontWeight: '500',
  paddingHorizontal: 5
}
