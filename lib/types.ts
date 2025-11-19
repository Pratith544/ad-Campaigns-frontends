export interface Campaign {
  id: string;
  name: string;
  status: "Active" | "Paused";
  clicks: number;
  cost: number;
  impressions: number;
  image_url: string;
}

export type CampaignStatus = 'All' | 'Active' | 'Paused';
