import {Box, Text} from '@risemaxi/sarcelle';
import {BoxProps} from '@risemaxi/sarcelle/dist/components/box/types';
import Icon from 'app/assets/icons';
import {IconName} from 'app/assets/icons/types';
import {Flatten} from 'app/utils/utilTypes';
import {differenceInMinutes, format} from 'date-fns';
import React from 'react';
import {
  Image,
  ImageStyle,
  InteractionManager,
  Pressable,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast, {ToastConfigParams} from 'react-native-toast-message';

type Alert = 'error' | 'info';

type Props = {
  contentProps: ContentProps;
  type?: Alert;
};
type ContentProps = Flatten<
  {
    description: string;
    icon?: IconName;
    time?: number;
    title: string;
  } & ({preset?: 'normal'} | {image: string; preset?: 'image'})
>;

export type AlertToastProps = ToastConfigParams<Props>;

const formatTime = (time: number) => {
  const diffMinutes = differenceInMinutes(new Date(), time);

  if (diffMinutes < 1) {
    return 'just now';
  }

  return format(time, 'h:mma');
};

const Content = ({
  alertType,
  icon = alertType === 'error' ? 'alert-error-info' : 'alert-feed',
  time = Date.now(),
  ...props
}: ContentProps & {
  alertType: Alert;
}) => (
  <Box p="m" rg="s">
    <Box
      alignItems="center"
      cg="l"
      flexDirection="row"
      justifyContent="space-between">
      <Box alignItems="center" cg="s" flexDirection="row" flexShrink={1}>
        <Icon name={icon} size={16} />
        <Text
          numberOfLines={2}
          variant={props.preset === 'image' ? 'num-reg-16' : 'button-15-bold'}>
          {props.title}
        </Text>
      </Box>
      <Text
        color={alertType === 'error' ? 'red' : 'soft-tect'}
        variant="number-12">
        {formatTime(time)}
      </Text>
    </Box>
    <Box cg="m" flexDirection="row" justifyContent="space-between">
      <Box flexShrink={1}>
        <Text numberOfLines={4} variant="body-13-regular">
          {props.description}
        </Text>
      </Box>
      {props.preset === 'image' && (
        <FastImage source={{uri: props.image}} style={CONTENT_IMAGE} />
      )}
    </Box>
  </Box>
);

const InfoWrapper = ({
  children,
  ...props
}: BoxProps & {children: JSX.Element}) => (
  <Box {...props}>
    <Image
      resizeMode="stretch"
      source={require('app/assets/images/toast-info-blur.png')}
      style={[FULL_WIDTH, TOAST_BLUR]}
    />
    <Box borderRadius={8} overflow="hidden">
      <Image
        source={require('app/assets/images/toast-info-bg.png')}
        style={[StyleSheet.absoluteFillObject, FULL_HEIGHT, FULL_WIDTH]}
      />
      {children}
    </Box>
  </Box>
);

const ErrorWrapper = ({
  children,
  ...props
}: BoxProps & {children: JSX.Element}) => (
  <Box {...props}>
    <Image
      resizeMode="stretch"
      source={require('app/assets/images/toast-error-blur.png')}
      style={[FULL_WIDTH, TOAST_BLUR]}
    />
    <Box
      backgroundColor={{
        custom: '#FEECEC',
      }}
      borderRadius={8}
      overflow="hidden">
      {children}
    </Box>
  </Box>
);

export function AlertToast({props, onPress}: AlertToastProps) {
  const {contentProps, type = 'info'} = props;
  const Wrapper = type === 'info' ? InfoWrapper : ErrorWrapper;

  return (
    <Pressable
      onPress={() => {
        Toast.hide();
        InteractionManager.runAfterInteractions(() => onPress?.());
      }}
      style={FULL_WIDTH}>
      <Wrapper paddingHorizontal="m" width="100%">
        <Content alertType={type} {...contentProps} />
      </Wrapper>
    </Pressable>
  );
}

const CONTENT_IMAGE = {
  aspectRatio: 1,
  height: 64,
} satisfies ImageStyle;

const FULL_HEIGHT = {
  height: '100%',
} satisfies ImageStyle;

const FULL_WIDTH = {
  width: '100%',
} satisfies ImageStyle;

const TOAST_BLUR = {
  alignSelf: 'center',
  bottom: -30,
  height: 50,
  position: 'absolute',
} satisfies ImageStyle;
