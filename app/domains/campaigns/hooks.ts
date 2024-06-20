import { useQuery } from 'react-query'

import { getCampaigns } from './api'
import { Campaign, CampaignServerType } from './types'

function extractCampaign(campaigns: CampaignServerType[]): Campaign[] {
  try {
    return campaigns.map((campaign: CampaignServerType) => {
      return {
        createdAt: campaign.created_at,
        description: campaign.description,
        id: campaign.id,
        thumbnailUrl: campaign.thumbnail_url,
        title: campaign.title,
        type: campaign.campaign_type,
        url: campaign?.article_url || campaign?.media_url
      }
    })
  } catch (_) {
    return []
  }
}

export function useCampaigns() {
  const { data, ...query } = useQuery('campaigns', getCampaigns)

  const campaigns = extractCampaign(data || [])

  return {
    ...query,
    campaigns
  }
}
