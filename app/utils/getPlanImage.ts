/* eslint-disable no-prototype-builtins */
export const setPlanImages = ({ plans, category }: any) => {
  let planImages: any = {}

  plans.forEach((plan: any) => {
    if (category === 'asset-class') {
      planImages[plan?.name?.toLowerCase()] = plan?.iconUrl
    }
    if (category === 'goal') {
      planImages[plan?.planType?.toLowerCase()] = plan?.planImage
    }
  })

  return planImages
}

export const getPlanImage = (plan: IPlan, images: any) => {
  const isGiftedPlan = plan?.type === 'gift'
  if (plan?.pictureUrl) {
    return {
      uri: plan?.pictureUrl
    }
  }

  // remove 'plan' from the string to make sure we can make a match to the properties of images
  const newPlanType = plan?.planType?.toLowerCase().replace('plan', '').trim()

  const isPlanImagePresent = images.hasOwnProperty(newPlanType)

  if (isPlanImagePresent && !isGiftedPlan) {
    return {
      uri: images[newPlanType]
    }
  }

  if (plan?.name === 'Pay Day') {
    return require('app/assets/future/images/payday.jpg')
  }

  if (isGiftedPlan) {
    return require('app/assets/images/gift-plan.jpg')
  }

  return require('app/assets/future/images/default-plan.jpg')
}
