import { Grid, Row, Text } from '@risemaxi/sarcelle'
import React from 'react'

import { PairProps } from './pair.props'

export default function Pair({
  label,
  value,
  customValueElement,
  showBorder = true
}: PairProps) {
  return (
    <Grid
      borderBottomWidth={showBorder ? 1 : 0}
      borderColor="offWhite0003"
      justifyContent="space-between"
      paddingVertical={10}
    >
      <Row width="content">
        <Text color="soft-tect" numberOfLines={2} variant="body-15-regular">
          {label}
        </Text>
      </Row>

      <Row>
        {customValueElement ? (
          customValueElement
        ) : (
          <Text
            color="neutral-dark-mode"
            numberOfLines={2}
            textAlign="right"
            variant="num-reg-15"
          >
            {value}
          </Text>
        )}
      </Row>
    </Grid>
  )
}
