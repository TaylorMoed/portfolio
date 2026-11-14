"use client";

import { useState } from "react";

// Shows the address and copies it on click, for people who don't use a mail app.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={`copy-email mono ${copied ? "copied" : ""}`} onClick={copy}>
      <span className="copy-email-text">{email}</span>
      <span className="copy-email-tag" aria-live="polite">{copied ? "copied" : "copy"}</span>
    </button>
  );
}
