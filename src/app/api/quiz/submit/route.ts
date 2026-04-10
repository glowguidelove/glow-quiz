import { NextRequest, NextResponse } from "next/server";
import { subscribeToKit, tagsForQuizAnswers } from "@/lib/kit";
import { sendServerEvent, hashEmail } from "@/lib/pixel";
import type { QuizAnswers } from "@/types";

interface QuizSubmitBody {
  answers: QuizAnswers;
  email: string;
  routineId: string;
  eventId: string;
  utm?: Record<string, string>;
  fbc?: string;
  fbp?: string;
}

export async function POST(request: NextRequest) {
  let body: QuizSubmitBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { answers, email, routineId, eventId, utm, fbc, fbp } = body;

  if (!answers || !email || !routineId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const hashedEmail = await hashEmail(email);

  const kitPromise = subscribeToKit({
    email,
    tags: tagsForQuizAnswers(answers),
    fields: {
      skin_type: answers.skinType,
      skin_concern: answers.concern,
      sensitivity: answers.sensitivity,
      age_range: answers.ageRange,
      routine_level: answers.routineLevel,
      ingredient_pref: answers.ingredientPref,
      budget: answers.budget,
      routine_id: routineId,
    },
  });

  const capiPromise = sendServerEvent({
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: request.headers.get("referer") ?? "",
    action_source: "website",
    user_data: {
      em: [hashedEmail],
      client_ip_address: request.headers.get("x-forwarded-for") ?? undefined,
      client_user_agent: request.headers.get("user-agent") ?? undefined,
      fbc: fbc ?? undefined,
      fbp: fbp ?? undefined,
    },
    custom_data: {
      content_name: "quiz_email_capture",
      skin_type: answers.skinType,
      concern: answers.concern,
      routine_id: routineId,
      ...utm,
    },
  });

  const [kitSubscribed] = await Promise.all([kitPromise, capiPromise]);

  return NextResponse.json({ success: true, routineId, kitSubscribed });
}
