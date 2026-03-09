import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Corner — Human-Curated Newsletter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#EDE4D0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#2C1E0F",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            The Corner
          </div>
          <div
            style={{
              width: "120px",
              height: "2px",
              background: "#A0522D",
            }}
          />
          <div
            style={{
              fontSize: "28px",
              color: "#5C4A35",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            Human Soul · AI Backbone · Zero Compromise
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#8A7560",
              marginTop: "16px",
              fontStyle: "italic",
            }}
          >
            A newsletter where every word is written by real people
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
