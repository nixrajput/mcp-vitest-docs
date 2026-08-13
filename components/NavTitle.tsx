"use client";

import type { ComponentProps, MouseEvent } from "react";
import { Mark } from "@/components/Mark";
import { appName } from "@/lib/shared";

/**
 * The logo, as a link that also works when it points at the page you are already on. Next skips
 * a navigation to the current route, so a click from /en#lifecycles left the reader mid-page
 * with the hash still in the address bar.
 */
export function NavTitle(props: ComponentProps<"a">) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.(event);
    if (event.defaultPrevented || typeof props.href !== "string") return;
    if (window.location.pathname !== props.href) return;

    event.preventDefault();
    window.history.replaceState(null, "", props.href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a {...props} onClick={onClick} className="inline-flex items-center gap-2">
      <Mark />
      {appName}
    </a>
  );
}
