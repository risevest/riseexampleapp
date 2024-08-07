import React from 'react'
import { TextProps, TextStyle } from 'react-native'

export type TextVariant =
  | 'black'
  | 'danger'
  | 'dark'
  | 'green'
  | 'indigo'
  | 'light'
  | 'orange'
  | 'primary'
  | 'soft-tect'
  | 'success'
  | 'white'
  | 'black'
  | 'green'
  | 'gray'
  | 'inactive'
type TextT =
  | 'bold-14'
  | 'bold-18'
  | 'button-14-medium'
  | 'extra-light-18-card'
  | 'growth-14-reg'
  | 'head-1'
  | 'head-2-20'
  | 'head-2'
  | 'head-mod-18-sb'
  | 'head-mod-20-semibold'
  | 'label-10'
  | 'label-12-reg'
  | 'label-14-reg'
  | 'light-18'
  | 'links-16-ul-sb'
  | 'med-17-tabs'
  | 'num-15-reg'
  | 'num-18-reg'
  | 'plan-head-20-bold'
  | 'r-14-soft'
  | 'r-14-txt'
  | 'r-15-soft'
  | 'r-16-btn'
  | 'r-16-main'
  | 'r-17-soft'
  | 'r-18-news'
  | 'reg-17-main'
  | 'reg-15-soft'
  | 'reg-17-button'
  | 'reg-17-button'
  | 'reg-17-main'
  | 'reg-22-news'
  | 'body-12-reg'
  | 'h1-24-semibold'
  | 'empty'

export interface Props extends TextProps {
  children: React.ReactNode
  textStyle?: TextStyle
  type: TextT
  variant?: TextVariant
}
