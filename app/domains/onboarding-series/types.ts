export interface OnboardingVideo {
  displayDuration: number
  thumbnailUrl: string
  title: string
  url: string
}

export interface OnboardingVideoServer {
  display_duration: number
  platform: 'mobile' | 'web'
  thumbnail_url: string
  title: string
  url: string
}
