import { useNavigation } from '@react-navigation/native'
import { PolymorphicText, Text } from '@risemaxi/sarcelle'
import React from 'react'

import styles from './styles'
import { Props, TextProps } from './types'

export const FeedText = ({ node, children }: TextProps) => {
  if (node.type === 'blockquote') {
    return <FeedQuote node={node}>{children}</FeedQuote>
  }

  const textProps: Partial<React.ComponentProps<PolymorphicText>> = {
    ...(node.bold && { fontWeight: 'bold' }),
    ...(node.italic && { fontStyle: 'italic' }),
    ...(node.strikethrough && { textDecorationLine: 'line-through' }),
    ...(node.underline && { textDecorationLine: 'underline' })
  }

  return (
    <Text lineHeight={22} variant="body-15-regular" {...textProps}>
      {children as string}
    </Text>
  )
}

export const FeedParagraph = ({ children }: Partial<Props>) => {
  return <Text lineHeight={21}>{children}</Text>
}

export const AlignCenter = ({ children }: Props) => {
  return (
    <Text lineHeight={21} textAlign="center">
      {children}
    </Text>
  )
}
export const AlignLeft = ({ children }: Props) => {
  return (
    <Text lineHeight={21} textAlign="left">
      {children}
    </Text>
  )
}

export const AlignRight = ({ children }: Props) => {
  return (
    <Text lineHeight={21} textAlign="right">
      {children}
    </Text>
  )
}

export const FeedQuote = ({ children }: Props) => {
  return (
    <>
      <Text style={styles.blockquote}>
        <Text style={styles.quote}>“</Text>
        {children}
      </Text>
    </>
  )
}

export const FeedLink = ({ children, node }: Props) => {
  const navigation = useNavigation()
  const linkOut = React.useCallback(
    (type: string, uri: string) => {
      navigation.navigate('App', {
        params: {
          params: {
            prevScreen: 'SingleFeed',
            type,
            uri
          },
          screen: 'ExternalLinks'
        },
        screen: 'AppStack'
      })
    },
    [navigation]
  )
  return (
    <Text
      color="primary"
      onPress={() => linkOut('feed', String(node?.href))}
      textDecorationLine="underline"
      textDecorationStyle="solid"
    >
      {children}
    </Text>
  )
}
