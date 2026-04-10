import Script from "next/script";

/** Kit “Embed → JavaScript” snippet. Should match the same form as KIT_FORM_ID when possible. */
const DEFAULT_EMBED_UID = "a29559fc37";

export default function KitFormEmbed() {
  const uid =
    process.env.NEXT_PUBLIC_KIT_EMBED_UID?.trim() || DEFAULT_EMBED_UID;
  const src = `https://glowguidelove.kit.com/${uid}/index.js`;

  return (
    <div className="w-full max-w-lg mx-auto py-2">
      <Script
        id={`kit-form-embed-${uid}`}
        src={src}
        strategy="afterInteractive"
        async
        data-uid={uid}
      />
    </div>
  );
}
