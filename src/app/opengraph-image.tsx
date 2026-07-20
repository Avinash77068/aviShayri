import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

// Default social-share card used by Open Graph and (as a fallback) Twitter.
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #faf7f2 0%, #f4efe7 45%, #efe6f7 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.35), rgba(124,58,237,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -100,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.30), rgba(236,72,153,0))",
          }}
        />
        <div
          style={{
            fontSize: 40,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#7c3aed",
            fontWeight: 700,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 76,
            fontWeight: 700,
            color: "#1c1917",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          Shayari, poetry &amp; verses
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            color: "#78716c",
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          Love · Sad · Attitude · Romantic · Motivational — in Hindi, Urdu &amp; English
        </div>
      </div>
    ),
    { ...size }
  );
}
