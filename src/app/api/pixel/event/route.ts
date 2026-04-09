import { NextRequest, NextResponse } from "next/server";
import { sendServerEvent } from "@/lib/pixel";

interface PixelEventBody {
  event_name: string;
  event_id: string;
  event_source_url: string;
  custom_data?: Record<string, unknown>;
  user_data?: {
    em?: string;
    fbc?: string;
    fbp?: string;
  };
}

export async function POST(request: NextRequest) {
  let body: PixelEventBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { event_name, event_id, event_source_url, custom_data, user_data } = body;

  if (!event_name || !event_id) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const success = await sendServerEvent({
    event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id,
    event_source_url: event_source_url ?? "",
    action_source: "website",
    user_data: {
      em: user_data?.em ? [user_data.em] : undefined,
      client_ip_address: request.headers.get("x-forwarded-for") ?? undefined,
      client_user_agent: request.headers.get("user-agent") ?? undefined,
      fbc: user_data?.fbc,
      fbp: user_data?.fbp,
    },
    custom_data,
  });

  return NextResponse.json({ success });
}
