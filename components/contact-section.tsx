"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Code2, Copy, Mail } from "lucide-react";
import { portfolio, hasPublicContact } from "@/lib/portfolio";
import "./contact-section.css";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85h-2.95V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.52V9.2h2.83v1.3h.04a3.1 3.1 0 0 1 2.79-1.54c2.98 0 3.53 1.96 3.53 4.5v5.29Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12.03 0C5.43 0 .06 5.37.06 11.97c0 2.1.55 4.15 1.6 5.96L0 24l6.2-1.63a11.95 11.95 0 0 0 5.82 1.48h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.2-3.5-8.38ZM12.03 21.83a9.94 9.94 0 0 1-5.06-1.38l-.36-.21-3.68.96.98-3.59-.24-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.49 4.47-9.96 9.97-9.96a9.9 9.9 0 0 1 7.04 2.92 9.9 9.9 0 0 1 2.91 7.05c0 5.49-4.47 9.85-10.04 9.85Zm5.47-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61l.45-.52c.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.23 5.11 4.53.71.31 1.27.5 1.7.64.71.22 1.37.19 1.89.12.57-.09 1.77-.73 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

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
          <p>Have a question about the work or an opportunity to discuss? Get in touch by email, WhatsApp, or LinkedIn.</p>
        </div>
        <div className="contact-copy contact-card">
          <p className="contact-person">{portfolio.fullName}</p>
          <ul className="contact-channels" aria-label="Contact Julius Joseph">
            {portfolio.email && <li className="contact-channel contact-channel-email">
              <a className="contact-channel-link contact-email" href={`mailto:${portfolio.email}`} aria-label={`Email Julius Joseph at ${portfolio.email}`}>
                <Mail size={20} aria-hidden="true" />
                <span><span className="contact-channel-label">Email</span><span className="contact-channel-value">{portfolio.email}</span></span>
              </a>
              <button className="copy-email" type="button" onClick={copyEmail} aria-label={`Copy email address ${portfolio.email}`}>{copyStatus === "copied" ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}<span>{copyStatus === "copied" ? "Copied" : "Copy email"}</span></button>
            </li>}
            {portfolio.whatsapp && <li className="contact-channel">
              <a className="contact-channel-link" href={portfolio.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Contact Julius Joseph on WhatsApp at ${portfolio.whatsappNumber}`}>
                <WhatsAppIcon />
                <span><span className="contact-channel-label">WhatsApp</span><span className="contact-channel-value">{portfolio.whatsappNumber}</span></span>
                <ArrowUpRight className="contact-channel-arrow" size={17} aria-hidden="true" />
              </a>
            </li>}
            {portfolio.linkedin && <li className="contact-channel">
              <a className="contact-channel-link" href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Julius Joseph on LinkedIn">
                <LinkedInIcon />
                <span><span className="contact-channel-label">LinkedIn</span><span className="contact-channel-value">Julius Joseph</span></span>
                <ArrowUpRight className="contact-channel-arrow" size={17} aria-hidden="true" />
              </a>
            </li>}
            {portfolio.github && <li className="contact-channel">
              <a className="contact-channel-link" href={portfolio.github} target="_blank" rel="noopener noreferrer" aria-label="Tron on GitHub"><Code2 size={20} aria-hidden="true" /><span><span className="contact-channel-label">GitHub</span><span className="contact-channel-value">Tron</span></span><ArrowUpRight className="contact-channel-arrow" size={17} aria-hidden="true" /></a>
            </li>}
          </ul>
          {portfolio.email && <p className="copy-feedback" role="status" aria-live="polite" aria-atomic="true">{copyStatus === "copied" ? "Email copied to clipboard." : copyStatus === "unavailable" ? "Select the email above to copy it, or follow the email link." : ""}</p>}
        </div>
      </div>
    </section>
  );
}

