"use client";

import { useEffect, useState } from "react";

// Shows the current time where Taylor is, updated every 30s.
export default function LocalTime({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  if (!now) return null;
  return <span title="My local time">{now} here</span>;
}
