"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { hasPublicContact } from "@/lib/portfolio";
import "./site-shell-enhancements.css";

const mainLinks = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  const links = hasPublicContact ? [...mainLinks, { label: "Contact", href: "/#contact" }] : mainLinks;

  useEffect(() => {
    const sections = ["work", "skills", "experience", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 80;
      const readingLine = headerHeight + 56;
      let current = pathname === "/" ? "" : "work";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      });
      // A short final section may never reach the reading line above the footer.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = sections.at(-1)?.id ?? current;
      }
      setActiveSection(current);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(requestUpdate, { rootMargin: "-15% 0px -65% 0px", threshold: 0 })
      : null;
    sections.forEach((section) => observer?.observe(section));
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 761px)");
    const handleResize = () => { if (window.innerWidth >= 761) setOpen(false); };
    breakpoint.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      breakpoint.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="wordmark" href="/" aria-label="Tron home"><Image className="brand-logo" src="/brand/tron-mark.webp" alt="" width={40} height={40} unoptimized priority /><span>Tron</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <a key={link.href} href={link.href} aria-current={activeSection === link.href.split("#")[1] ? "location" : undefined}>{link.label}</a>)}</nav>
        <button ref={toggle} className="mobile-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}</button>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{links.map(link => <a key={link.href} href={link.href} aria-current={activeSection === link.href.split("#")[1] ? "location" : undefined} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={18} aria-hidden="true" /></a>)}</nav>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="wrap footer-inner"><span>© {new Date().getFullYear()} Julius Joseph · Tron</span></div></footer>;
}

