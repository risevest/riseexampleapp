// i didn't remove this because the incoming updated endpoint is quite similar with this
type CampaignTypeServer = 'article' | 'image' | 'video'

export interface CampaignServerType {
  article_url?: string
  campaign_type: CampaignTypeServer
  created_at: string
  description: string
  id: number
  media_url?: string
  slot: number
  thumbnail_url: string
  title: string
}

export interface Campaign {
  createdAt: string
  description: string
  id: number
  thumbnailUrl: string
  title: string
  type:
    | CampaignTypeServer
    | 'setup-guide'
    | 'onboarding-series'
    | 'naira-wallet-intro'
    | 'referral'
  url?: string
}
