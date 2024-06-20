const images = {
  disabledVirtualCardPlaceHolder: require('app/assets/future/images/virtual-card-disabled.png'),
  failedVirtualCardPlaceHolder: require('app/assets/future/images/virtual-card-failed.png'),
  homeGoalAvatar: require('app/assets/future/images/home.jpg'),
  lockOrange: require('app/assets/future/images/lock-orange.png'),
  lockTeal: require('app/assets/future/images/lock-teal.png'),
  riseMoney: require('app/assets/future/images/rise-money.png'),
  sinlgefeedimage: require('app/assets/future/images/feed.png'),
  username: require('app/assets/future/images/username.png'),
  virtualCardPlaceHolder: require('app/assets/future/images/virtual-card.png'),
  virtualCardPlain: require('app/assets/future/images/virtual-card-plain.png'),
  walletIntroduction: require('app/assets/future/images/walletIntroduction.jpg'),
  weddingGoalAvatar: require('app/assets/future/images/wedding.jpg')
}
export type ImagesType = typeof images

const toArray = () => {
  let keys = Object.keys(images)
  return keys.map((key) => images[key as keyof typeof images])
}

export default {
  ...images,
  toArray
}
