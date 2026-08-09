// No ground square here, unlike app/icon.svg: in the nav the mark sits on the
// page background, and a filled tile would read as a second surface.
export function Mark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="size-5 shrink-0"
    >
      {/* The round trip the harness drives: request out, response back. */}
      <path
        d="M8 12.5 H21 M17 8.5 L21 12.5 L17 16.5"
        fill="none"
        stroke="var(--era-old)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 21.5 H11 M15 17.5 L11 21.5 L15 25.5"
        fill="none"
        stroke="var(--era-now)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
