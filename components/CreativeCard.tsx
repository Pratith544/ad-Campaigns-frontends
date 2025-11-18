"use client";

import React, { useEffect, useState } from "react";
import { Campaign } from "@/lib/types";
import { generateInsights } from "@/lib/ai";
import { LoadingSpinner } from "./LoadingSpinner";

interface CreativeCardProps {
  campaign: Campaign;
}

export function CreativeCard({ campaign }: CreativeCardProps) {
  const [insights, setInsights] = useState<string[] | null>(null);

  useEffect(() => {
    let mounted = true;
    generateInsights(campaign).then((res) => {
      if (mounted) setInsights(res);
    });
    return () => {
      mounted = false;
    };
  }, [campaign]);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="h-32 w-56 overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-900">
          <img
            src={
              // Campaign type currently doesn't include an image field — show placeholder
              typeof (campaign as any).imageUrl === "string" &&
              (campaign as any).imageUrl
                ? (campaign as any).imageUrl
                : `https://via.placeholder.com/600x300?text=${encodeURIComponent(
                    campaign.name
                  )}`
            }
            alt={campaign.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {campaign.name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Status: {campaign.status}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-neutral-500">Clicks</p>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {campaign.clicks}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Impressions</p>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {campaign.impressions}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Cost</p>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                ${campaign.cost.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          AI Insights
        </h4>
        {!insights ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner />
            <span className="text-sm text-neutral-500">
              Generating insights…
            </span>
          </div>
        ) : (
          <ul className="list-inside list-disc space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
            {insights.map((insight, i) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
