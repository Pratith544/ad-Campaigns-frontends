import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const campaign = body.campaign;

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY not configured" },
        { status: 500 }
      );
    }

    const messages: any[] = [
      {
        role: "system",
        content:
          "You are an assistant that returns a JSON array of short insight strings about an advertising campaign. Respond with a valid JSON array and nothing else.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Campaign: ${campaign.name}\nStatus: ${campaign.status}\nClicks: ${campaign.clicks}\nImpressions: ${campaign.impressions}\nCost: ${campaign.cost}`,
          },
        ],
      },
    ];

    if ((campaign as any).imageUrl) {
      messages[1].content.push({
        type: "image_url",
        image_url: { url: (campaign as any).imageUrl },
      });
    }

    const payload = {
      model: "openai/gpt-oss-20b:free",
      messages,
    };

    const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return NextResponse.json({ error: txt }, { status: resp.status });
    }

    const data = await resp.json();

    const msg = data?.choices?.[0]?.message?.content;
    let insights: string[] = [];

    if (Array.isArray(msg)) {
      const texts = msg
        .filter((b: any) => b.type === "text")
        .map((t: any) => t.text)
        .join("\n");
      try {
        insights = JSON.parse(texts);
      } catch (e) {
        insights = texts
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    } else if (typeof msg === "string") {
      try {
        insights = JSON.parse(msg);
      } catch (e) {
        insights = msg
          .split("\n")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    } else {
      insights = ["No insights returned by model."];
    }

    return NextResponse.json({ insights });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
