import { Box, Circle, Grid, Row, Text } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import React from 'react'
import { ViewStyle } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface Direction {
  description?: string
  end?: boolean
  title: string
}

interface TransferDirectionProps {
  destination: Direction
  error?: string
  source: Direction
  style?: ViewStyle
}

const DirectionItem = ({ title, description, end }: Direction) => {
  return (
    <Box alignItems={end ? 'flex-end' : 'flex-start'}>
      <Text
        color="neutral-dark-mode"
        numberOfLines={1}
        variant="body-15-regular"
      >
        {title}
      </Text>
      {description ? (
        <Text color="soft-tect" numberOfLines={1} variant="num-reg-16">
          {description}
        </Text>
      ) : null}
    </Box>
  )
}

function TransferDirection({
  source,
  destination,
  error,
  style
}: TransferDirectionProps) {
  return (
    <Box
      backgroundColor={error ? 'red' : { custom: 'transparent' }}
      borderRadius={12}
      marginTop="s"
      minHeight={104}
      overflow="hidden"
      style={style}
      testID="transfer_direction"
    >
      <Grid
        alignHorizontal="justify"
        alignVertical="center"
        backgroundColor="red"
        borderRadius={12}
        height={70}
        padding={13}
        style={CONTAINER}
      >
        <Row alignItems="flex-start">
          <DirectionItem
            description={source?.description}
            title={source?.title}
          />
        </Row>

        <Row alignItems="center">
          <Circle
            alignItems="center"
            backgroundColor="offWhiteWhite"
            justifyContent="center"
            size={32}
          >
            <Ionicons color="black" name="arrow-forward-sharp" size={14} />
          </Circle>
        </Row>

        <Row alignItems="flex-end">
          <DirectionItem
            description={destination?.description}
            end
            title={destination.title}
          />
        </Row>
      </Grid>

      {!!error && (
        <Box alignItems="center" flex={1} justifyContent="center" width="100%">
          <Box
            alignItems="center"
            alignSelf="center"
            flexDirection="row"
            justifyContent="center"
            width="100%"
          >
            <Icon color="white" name="info-light" size={13} />
            <Box marginHorizontal={9.34} />
            <Text
              color="white"
              fontSize={13}
              textAlign="center"
              variant="button-14-medium"
            >
              {error}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  )
}

const CONTAINER: ViewStyle = { backgroundColor: '#F1F3F6' }

export default TransferDirection
