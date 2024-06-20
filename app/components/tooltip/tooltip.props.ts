import { Box } from '@risemaxi/sarcelle'

export interface ToolTipProp extends React.ComponentProps<typeof Box> {
  hideToolTip: () => void
  text: string
}
