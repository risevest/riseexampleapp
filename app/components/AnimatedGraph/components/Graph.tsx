import { formatInput } from 'app/utils/numberformatter'
import { scaleLinear, scaleTime } from 'd3-scale'
import * as shape from 'd3-shape'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { interpolate, useDerivedValue } from 'react-native-reanimated'
import { round, useVector } from 'react-native-redash'
import Svg, {
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text
} from 'react-native-svg'

import Cursor from './Cursor'
import GraphHeader from './GraphHeader'

interface DataPoint {
  date: number
  returns: number
  value: number
  value2: number
}

interface GraphProps {
  graphData: DataPoint[]
}

const { width } = Dimensions.get('window')
const height = width * 0.75
const strokeWidth = 4
const CURSOR_RADIUS = 8
const STROKE_WIDTH = CURSOR_RADIUS / 2
const getDomain = (domain: number[]) => [
  Math.min(...domain),
  Math.max(...domain)
]

const Graph = ({ graphData = [] }: GraphProps) => {
  const translation = useVector()
  const data =
    graphData.length === 1
      ? graphData.concat({
          date: new Date().getTime(),
          returns: graphData[0].returns,
          value: graphData[0].value,
          value2: graphData[0].value2
        })
      : graphData

  const firstData = graphData[0]
  const lastData = graphData[graphData.length - 1]
  const inputRange = [0, width]
  const date = useDerivedValue(() => {
    const dateInterpolated = interpolate(translation.y.value, inputRange, [
      lastData.date,
      firstData.date
    ])
    return new Date(dateInterpolated).toDateString().slice(3)
  }, [])
  const price = useDerivedValue(() => {
    const priceInterpolated = interpolate(translation.y.value, inputRange, [
      lastData.value,
      firstData.value
    ])
    return `$${round(priceInterpolated, 2)}`
  })
  const investments = useDerivedValue(() => {
    const investmentsInterpolated = interpolate(
      translation.y.value,
      inputRange,
      [lastData.value2, firstData.value2]
    )
    return `$${round(investmentsInterpolated, 2)}`
  })
  const returns = useDerivedValue(() => {
    const returnsInterpolated = interpolate(translation.y.value, inputRange, [
      lastData.returns,
      firstData.returns
    ])
    return `$${round(returnsInterpolated, 2)}`
  })

  const domainY = getDomain(data?.map((d) => d.value))

  const upperBound = domainY[1]
  const lowerBound = domainY[0]
  const tick = (Number(upperBound) - Number(lowerBound)) / 3

  const scaleX = scaleTime()
    .domain(getDomain(data?.map((d) => d.date)))
    .range([0, width - 40])

  const scaleY = scaleLinear().domain(domainY).range([height, 0])

  const d = shape
    .line<DataPoint>()
    .x((p) => scaleX(p.date))
    .y((p) => scaleY(p.value))
    .curve(shape.curveBasis)(data) as string

  return (
    <View>
      <GraphHeader
        date={date}
        investments={investments}
        price={price}
        returns={returns}
      />
      <View style={styles.container}>
        <Svg style={[StyleSheet.absoluteFill, { height: height * 1.5 }]}>
          <Defs>
            <LinearGradient id="gradient" x1="50%" x2="50%" y1="0%" y2="100%">
              <Stop offset="0%" stopColor="#22D8E2" stopOpacity={0.5} />
              <Stop offset="10%" stopColor="#22D8E2" stopOpacity={0.5} />
              <Stop offset="100%" stopColor="#0898A0" stopOpacity={0.5} />
            </LinearGradient>
          </Defs>

          <Text fill="#fff" fontSize={12} textAnchor="start" x={10} y={0 + 15}>
            {`$${formatInput(`${upperBound.toFixed(2)}`)}`}
          </Text>
          <Line
            stroke="#fff"
            strokeWidth="0.5"
            x1="0"
            x2={width}
            y1={0}
            y2={0}
          />
          <Text
            fill="#fff"
            fontSize={12}
            textAnchor="start"
            x={10}
            y={height * 0.333 + 15}
          >
            {`$${formatInput(
              `${Number(Number(lowerBound) + tick * 2).toFixed(2)}`
            )}`}
          </Text>
          <Line
            stroke="#fff"
            strokeWidth="0.5"
            x1="0"
            x2={width}
            y1={height * 0.333}
            y2={height * 0.333}
          />
          <Text
            fill="#fff"
            fontSize={12}
            textAnchor="start"
            x={10}
            y={height * 0.666 + 15}
          >
            {`$${formatInput(
              `${Number(Number(lowerBound) + tick).toFixed(2)}`
            )}`}
          </Text>
          <Line
            stroke="#fff"
            strokeWidth="0.5"
            x1="0"
            x2={width}
            y1={height * 0.666}
            y2={height * 0.666}
          />
          <Text
            fill="#fff"
            fontSize={12}
            textAnchor="start"
            x={10}
            y={height + 15}
          >
            {`$${formatInput(`${Number(lowerBound.toFixed(2))}`)}`}
          </Text>
          <Line
            stroke="#fff"
            strokeWidth="0.5"
            x1="0"
            x2={width}
            y1={height}
            y2={height}
          />

          <Path
            d={`${d}L ${width - 40} ${height} L 0 ${height}`}
            // d={d}
            fill="url(#gradient)"
          />
          <Path fill="transparent" stroke="#22D8E2" {...{ d, strokeWidth }} />
          {/* <Path fill="transparent" stroke="#fff" {...{ d: d2, strokeWidth }} /> */}
        </Svg>
        <Cursor
          borderColor="#fff"
          borderWidth={STROKE_WIDTH}
          r={CURSOR_RADIUS}
          {...{
            d,
            translation
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    height,
    width: width - 40
  }
})

export default Graph
