import { Campaign } from "./types";

export async function generateInsights(campaign: Campaign) {
  try {
    const res = await fetch("/api/openrouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaign }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.insights && Array.isArray(data.insights)) {
        return data.insights as string[];
      }
    }
  } catch (e) {}

  const insights: string[] = [];
  const ctr =
    campaign.impressions > 0
      ? (campaign.clicks / campaign.impressions) * 100
      : 0;
  const cpc =
    campaign.clicks > 0 ? campaign.cost / campaign.clicks : campaign.cost;

  insights.push(`CTR: ${ctr.toFixed(2)}%`);
  insights.push(
    `Avg. Cost / Click: ${cpc <= 0 ? "$0.00" : `$${cpc.toFixed(2)}`}`
  );

  if (ctr < 0.5) {
    insights.push(
      "Low CTR — consider revising ad copy or targeting to improve engagement."
    );
  } else if (ctr >= 0.5 && ctr < 2) {
    insights.push("Average CTR — small creative or targeting tweaks may help.");
  } else {
    insights.push("Healthy CTR — creative and targeting look good.");
  }

  if (cpc > 5) {
    insights.push(
      "High cost per click — consider optimizing bids or audience sizes."
    );
  }

  if (campaign.cost > 1000) {
    insights.push(
      "High spend campaign — monitor frequency and creative fatigue."
    );
  }

  return insights;
}
