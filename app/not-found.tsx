import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";

export default function NotFound() {
  return <><SiteHeader /><main id="main-content" className="wrap not-found"><p className="eyebrow">404 / A loose connection</p><h1>This page<br />isn’t <em>connected.</em></h1><p>It may have moved, or the address might be incomplete.</p><Link className="button button-dark" href="/">Back to the portfolio <ArrowUpRight size={17} aria-hidden="true" /></Link></main><SiteFooter /></>;
}
