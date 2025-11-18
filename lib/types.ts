export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused';
  clicks: number;
  cost: number;
  impressions: number;
}

export type CampaignStatus = 'All' | 'Active' | 'Paused';
