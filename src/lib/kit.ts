// Kit (ConvertKit) API integration
// Get your API key from: https://app.kit.com/account/edit
// Create a form in Kit and use its ID below.

const KIT_API_KEY = process.env.KIT_API_KEY ?? "";
const KIT_FORM_ID = process.env.KIT_FORM_ID ?? "";

interface SubscribeParams {
  email: string;
  firstName?: string;
  fields?: Record<string, string>;
  tags?: number[];
}

export async function subscribeToKit(params: SubscribeParams): Promise<boolean> {
  if (!KIT_API_KEY || !KIT_FORM_ID) {
    console.warn("Kit: Missing API key or form ID. Skipping subscription.");
    return false;
  }

  const url = `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email: params.email,
        first_name: params.firstName,
        fields: params.fields,
        tags: params.tags,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Kit subscription error:", text);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Kit subscription failed:", error);
    return false;
  }
}

// Tag IDs — create these in Kit and update the values here.
// Used to segment subscribers for targeted email sequences.
export const KIT_TAGS = {
  quizCompleter: 0,
  skinTypeOily: 0,
  skinTypeDry: 0,
  skinTypeCombination: 0,
  skinTypeSensitive: 0,
  skinTypeNormal: 0,
  concernAcne: 0,
  concernAging: 0,
  concernDarkSpots: 0,
  concernRedness: 0,
  concernDullness: 0,
} as const;
