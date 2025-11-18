'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowLeft, RefreshCw } from 'lucide-react';
import { fetchCampaigns } from '@/lib/api';
import { Campaign, CampaignStatus } from '@/lib/types';
import { CampaignsTable } from '@/components/CampaignsTable';
import { FilterDropdown } from '@/components/FilterDropdown';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState<CampaignStatus>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCampaigns();
      setCampaigns(data);
      setFilteredCampaigns(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredCampaigns(campaigns);
    } else {
      setFilteredCampaigns(campaigns.filter((c) => c.status === filter));
    }
  }, [filter, campaigns]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <nav className="border-b border-neutral-200 bg-white/80 backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="rounded-lg p-2 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </Link>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-neutral-900 p-2 dark:bg-neutral-100">
                  <TrendingUp className="h-5 w-5 text-white dark:text-neutral-900" />
                </div>
                <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Grippi
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={loadCampaigns}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Campaign Dashboard
          </h1>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            Monitor and analyze your advertising campaigns in real-time.
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Showing{' '}
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {filteredCampaigns.length}
            </span>{' '}
            {filteredCampaigns.length === 1 ? 'campaign' : 'campaigns'}
          </p>
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                Loading campaigns...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
            <ErrorMessage message={error} onRetry={loadCampaigns} />
          </div>
        ) : (
          <CampaignsTable campaigns={filteredCampaigns} />
        )}
      </main>
    </div>
  );
}
