import BUSD from 'app/assets/icons/svg/busd.svg'
import DAI from 'app/assets/icons/svg/dai.svg'
import USDC from 'app/assets/icons/svg/USDC.svg'
import USDT from 'app/assets/icons/svg/usdt.svg'
import { SvgProps } from 'react-native-svg'

export const tokenAssets: Record<
  string | 'usdc' | 'usdt' | 'dai' | 'busd',
  React.FC<SvgProps>
> = {
  busd: BUSD,
  dai: DAI,
  usdc: USDC,
  usdt: USDT
}
