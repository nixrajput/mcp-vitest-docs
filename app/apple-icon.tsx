import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icons are composited onto the home screen without the rounded
// corners the SVG favicon draws, so this one fills the square and scales the
// mark up: at 180px the 32px geometry would read as a hairline.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#141118",
      }}
    >
      {/* No <title>: satori renders it as visible text rather than metadata. */}
      <svg width="120" height="120" viewBox="0 0 32 32">
        <path
          d="M8 12.5 H21 M17 8.5 L21 12.5 L17 16.5"
          fill="none"
          stroke="#f0a868"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 21.5 H11 M15 17.5 L11 21.5 L15 25.5"
          fill="none"
          stroke="#9b8cff"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    size,
  );
}
