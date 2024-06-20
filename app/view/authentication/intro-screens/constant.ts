export type OnboardingItem = {
  body: string
  lottie: string
  title: string
}

export const onboardingData: OnboardingItem[] = [
  {
    body: 'Personalized investment plans handpicked by experts to beat inflation and grow your wealth.',
    lottie: require('app/assets/icons/json/intro-1.json'),
    title: 'Investments that help you grow'
  },
  {
    body: 'Spread your investments across multiple asset classes.',
    lottie: require('app/assets/icons/json/intro-2.json'),
    title: 'Diversified Portfolio'
  },
  {
    body: 'Get quality investment management, hassle free, handled for you.',
    lottie: require('app/assets/icons/json/intro-3.json'),
    title: 'Managed For You'
  },
  {
    body: 'Dedicated multi-currency bank accounts, virtual cards, interest paying wallets and lots more.',
    lottie: require('app/assets/icons/json/intro-4.json'),
    title: 'Get Additional Benefits'
  }
]
