"use client";

import { useMemo, useState } from "react";
import { Campaign, CampaignStatus } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { formatCurrency, formatNumber } from "@/lib/utils/formatters";
import {
  TrendingUp,
  MousePointerClick,
  Eye,
  DollarSign,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "./ui/input";
import { FilterDropdown } from "./FilterDropdown";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { CreativeCard } from "./CreativeCard";

interface CampaignsTableProps {
  campaigns: Campaign[];
}

type SortBy = "name" | "clicks" | "cost" | "impressions" | null;

export function CampaignsTable({ campaigns }: CampaignsTableProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );

  const filtered = useMemo(() => {
    let list = campaigns.slice();

    if (search.trim().length > 0) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
      );
    }

    if (sortBy) {
      list.sort((a, b) => {
        let av: number | string = (a as any)[sortBy];
        let bv: number | string = (b as any)[sortBy];

        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();

        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [campaigns, search, sortBy, sortDir]);

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-neutral-100 p-3 dark:bg-neutral-800">
          <TrendingUp className="h-6 w-6 text-neutral-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          No campaigns found
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);

  function toggleSort(column: SortBy) {
    if (sortBy === column) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDir("desc");
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Clicks
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {formatNumber(totalClicks)}
              </p>
            </div>
            <div className="rounded-full bg-blue-50 p-3 dark:bg-blue-500/10">
              <MousePointerClick className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Cost
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {formatCurrency(totalCost)}
              </p>
            </div>
            <div className="rounded-full bg-emerald-50 p-3 dark:bg-emerald-500/10">
              <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Total Impressions
              </p>
              <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                {formatNumber(totalImpressions)}
              </p>
            </div>
            <div className="rounded-full bg-violet-50 p-3 dark:bg-violet-500/10">
              <Eye className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex w-full max-w-lg items-center gap-2">
          <Input
            placeholder="Search campaigns by name or id..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <span>Sort:</span>
          <button
            onClick={() => toggleSort("name")}
            className="inline-flex items-center gap-2 rounded-md px-3 py-1 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            Name <ArrowUpDown className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggleSort("clicks")}
            className="inline-flex items-center gap-2 rounded-md px-3 py-1 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            Clicks <ArrowUpDown className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggleSort("cost")}
            className="inline-flex items-center gap-2 rounded-md px-3 py-1 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            Cost <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Campaign Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Clicks
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Cost
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Impressions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filtered.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={campaign.status} />
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-neutral-700 dark:text-neutral-300">
                    {formatNumber(campaign.clicks)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(campaign.cost)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-neutral-700 dark:text-neutral-300">
                    {formatNumber(campaign.impressions)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={!!selectedCampaign}
        onOpenChange={(open) => !open && setSelectedCampaign(null)}
      >
        {selectedCampaign && (
          <DialogContent>
            <DialogTitle>{selectedCampaign.name}</DialogTitle>
            <CreativeCard campaign={selectedCampaign} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
