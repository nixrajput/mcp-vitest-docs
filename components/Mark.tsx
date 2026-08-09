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
      {/* Two discrete revisions, not a blend: amber ends where violet begins. */}
      <path
        d="M8 16.5 L13.5 22"
        fill="none"
        stroke="var(--era-old)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <path
        d="M13.5 22 L24 10"
        fill="none"
        stroke="var(--era-now)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
