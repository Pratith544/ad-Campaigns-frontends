import { Campaign } from './types';

const API_BASE_URL = 'https://ad-campaigns-backend-production.up.railway.app';

export async function checkHealth(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Health check failed');
  }

  return response.json();
}

export async function fetchCampaigns(): Promise<Campaign[]> {
  const response = await fetch(`${API_BASE_URL}/campaigns`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }

  return response.json();
}
