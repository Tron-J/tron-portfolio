"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { portfolio, hasPublicContact } from "@/lib/portfolio";
import "./contact-section.css";

/** Native copy fallback for browsers that do not expose the Clipboard API. */
function copyWithSelection(value: string) {
  const previouslyFocused = document.activeElement;
  const field = document.createElement("textarea");
  field.value = value;
  field.readOnly = true;
  field.style.cssText = "position:fixed;left:-9999px;top:0;font-size:16px;";
  document.body.appendChild(field);
  field.select();
  field.setSelectionRange(0, value.length);
  let copied = false;
  try { copied = document.execCommand("copy"); }
  catch { /* The visible email and mailto action remain available. */ }
  finally {
    field.remove();
    if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true });
  }
  return copied;
}

export function ContactSection() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "unavailable">("idle");

  async function copyEmail() {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(portfolio.email);
        copied = true;
      }
    } catch { /* Try native selection if permission or secure context is unavailable. */ }
    if (!copied) copied = copyWithSelection(portfolio.email);
    setCopyStatus(copied ? "copied" : "unavailable");
  }

  if (!hasPublicContact) return null;

  return (
    <section id="contact" className="contact-section section-block" aria-labelledby="contact-heading">
      <div className="wrap contact-layout" data-reveal>
        <div className="contact-heading-copy">
          <h2 id="contact-heading">Contact</h2>
          <p>Have a question about the work or an opportunity to discuss? Email me directly.</p>
        </div>
        <div className="contact-copy contact-card">
          <p className="contact-person">{portfolio.fullName}</p>
          {portfolio.email && <>
            <a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email}<ArrowUpRight size={20} aria-hidden="true" /></a>
            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${portfolio.email}`}><Mail size={17} aria-hidden="true" /> Send email</a>
              <button className="button button-secondary copy-email" type="button" onClick={copyEmail}>{copyStatus === "copied" ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}{copyStatus === "copied" ? "Copied" : "Copy email"}</button>
            </div>
            <p className="copy-feedback" role="status" aria-live="polite" aria-atomic="true">{copyStatus === "copied" ? "Email copied to clipboard." : copyStatus === "unavailable" ? "Select the email above to copy it, or use Send email." : ""}</p>
          </>}
          {(portfolio.github || portfolio.linkedin) && <div className="contact-links">
            {portfolio.github && <a className="text-link" href={portfolio.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>}
            {portfolio.linkedin && <a className="text-link" href={portfolio.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>}
        </div>
      </div>
    </section>
  );
}

