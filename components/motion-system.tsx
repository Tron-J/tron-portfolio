"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./scroll-motion.css";
import "./landing-motion.css";

/** Motion enhances content that is already complete and readable. */
export function MotionSystem() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const refreshMotionRef = useRef<(() => void) | null>(null);
  const landingSeenRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const motionPaused = paused || reducedMotion;

  useEffect(() => {
    const body = document.body;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const fields = Array.from(document.querySelectorAll<HTMLElement>(".signal-field, [data-architecture]"));
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".engineering-scene"));
    const visibleScenes = new Set<HTMLElement>();
    let revealObserver: IntersectionObserver | null = null;
    let fieldObserver: IntersectionObserver | null = null;
    let sizeObserver: ResizeObserver | null = null;
    let frame = 0;
    let landingTimer = 0;

    const finishLanding = () => {
      window.clearTimeout(landingTimer);
      body.classList.remove("landing-entering");
      landingSeenRef.current = true;
    };

    const motionAllowed = () => !preference.matches
      && !body.classList.contains("motion-paused")
      && document.visibilityState !== "hidden";

    const reveal = (element: HTMLElement, animate: boolean) => {
      element.classList.add("is-revealed");
      element.classList.toggle("is-entering", animate);
      revealObserver?.unobserve(element);
    };

    const showAll = () => {
      revealElements.forEach((element) => reveal(element, false));
      revealObserver?.disconnect();
    };

    const resetDepth = () => {
      scenes.forEach((scene) => scene.style.removeProperty("--scene-scroll-y"));
    };

    const updateProgress = () => {
      frame = 0;
      if (document.visibilityState === "hidden") return;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progressRef.current) progressRef.current.style.transform = "scaleX(" + progress + ")";

      if (!motionAllowed()) {
        resetDepth();
        return;
      }

      // Scroll/resize-driven updates only, never a continuous JavaScript loop.
      // Translate the full figure to preserve image/SVG registration.
      visibleScenes.forEach((scene) => {
        const bounds = scene.getBoundingClientRect();
        const previous = Number.parseFloat(scene.style.getPropertyValue("--scene-scroll-y")) || 0;
        const center = bounds.top + bounds.height / 2 - previous;
        const smallScreen = window.innerWidth <= 760;
        const limit = smallScreen ? 6 : 12;
        const depth = (window.innerHeight * .42 - center) * (smallScreen ? .015 : .025);
        const offset = Math.max(-limit, Math.min(limit, depth));
        scene.style.setProperty("--scene-scroll-y", offset.toFixed(2) + "px");
      });
    };

    const requestProgress = () => {
      if (!frame && document.visibilityState !== "hidden") frame = window.requestAnimationFrame(updateProgress);
    };

    const refreshMotion = () => {
      if (preference.matches || body.classList.contains("motion-paused")) {
        finishLanding();
        showAll();
        resetDepth();
      }
      requestProgress();
    };
    refreshMotionRef.current = refreshMotion;

    const applyPreference = () => {
      setReducedMotion(preference.matches);
      refreshMotion();
    };

    const updateVisibility = () => {
      body.classList.toggle("tab-inactive", document.visibilityState === "hidden");
      if (document.visibilityState !== "hidden") requestProgress();
    };

    const settleHashTarget = () => {
      let target: HTMLElement | null = null;
      try {
        target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      } catch {
        // A malformed external fragment must not affect readability.
      }
      const hashTarget = target;
      if (!hashTarget) return;
      revealElements.forEach((element) => {
        if (element.contains(hashTarget) || hashTarget.contains(element)) reveal(element, false);
      });
    };

    const handleNavigation = () => {
      finishLanding();
      settleHashTarget();
      requestProgress();
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        showAll();
        finishLanding();
      }
      settleHashTarget();
      requestProgress();
    };

    const finishEntrance = (event: AnimationEvent) => {
      if (event.animationName === "portfolio-section-enter" && event.target instanceof HTMLElement) {
        event.target.classList.remove("is-entering");
      }
    };

    const keepFocusedContentStill = (event: FocusEvent) => {
      finishLanding();
      if (!(event.target instanceof Node)) return;
      const target = event.target;
      revealElements.forEach((element) => {
        if (element.contains(target)) reveal(element, false);
      });
    };

    try {
      if ("IntersectionObserver" in window && !preference.matches) {
        revealObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains("is-revealed")) {
              reveal(entry.target as HTMLElement, motionAllowed());
            }
          });
        }, { rootMargin: "0px 0px -32px 0px", threshold: 0 });

        revealElements.forEach((element) => {
          if (element.classList.contains("is-revealed")) return;
          const siblings = Array.from(element.parentElement?.children ?? [])
            .filter((sibling) => sibling.hasAttribute("data-reveal"));
          const configured = element.dataset.revealDelay;
          const parsed = configured === undefined ? Number.NaN : Number.parseFloat(configured);
          const explicitDelay = configured?.trim().endsWith("s") && !configured.trim().endsWith("ms")
            ? parsed * 1000 : parsed;
          const delay = Number.isFinite(explicitDelay) ? explicitDelay : siblings.indexOf(element) * 80;
          element.style.setProperty("--reveal-delay", Math.max(0, Math.min(400, delay)) + "ms");
          revealObserver?.observe(element);
        });
      } else {
        showAll();
      }

      if ("IntersectionObserver" in window) {
        fieldObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const field = entry.target as HTMLElement;
            field.classList.toggle("is-outside", !entry.isIntersecting);
            if (field.hasAttribute("data-architecture")) field.classList.toggle("is-energized", entry.isIntersecting);
            if (scenes.includes(field)) {
              if (entry.isIntersecting) visibleScenes.add(field);
              else visibleScenes.delete(field);
            }
          });
          requestProgress();
        }, { rootMargin: "80px", threshold: 0 });

        fields.forEach((field) => {
          fieldObserver?.observe(field);
          const bounds = field.getBoundingClientRect();
          const outside = bounds.bottom < -80 || bounds.top > window.innerHeight + 80;
          field.classList.toggle("is-outside", outside);
          if (field.hasAttribute("data-architecture")) field.classList.toggle("is-energized", !outside);
          if (scenes.includes(field) && !outside) visibleScenes.add(field);
        });
      }
    } catch {
      showAll();
      fields.forEach((field) => field.classList.remove("is-outside"));
      fieldObserver?.disconnect();
      visibleScenes.clear();
    }

    // Only the initial, top-of-home visit receives the coordinated entrance.
    // Hash links, history restoration and later route visits stay immediately still.
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (pathname === "/" && !landingSeenRef.current && !window.location.hash
      && window.scrollY < 80 && navigation?.type !== "back_forward" && motionAllowed()) {
      body.classList.add("landing-entering");
      landingTimer = window.setTimeout(finishLanding, 1350);
    } else {
      finishLanding();
    }

    settleHashTarget();
    applyPreference();
    updateVisibility();
    requestProgress();
    body.classList.add("motion-ready");
    preference.addEventListener("change", applyPreference);
    document.addEventListener("visibilitychange", updateVisibility);
    document.addEventListener("animationend", finishEntrance);
    document.addEventListener("focusin", keepFocusedContentStill);
    window.addEventListener("scroll", requestProgress, { passive: true });
    window.addEventListener("resize", requestProgress, { passive: true });
    window.addEventListener("hashchange", handleNavigation);
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("pageshow", handlePageShow);

    if ("ResizeObserver" in window) {
      sizeObserver = new ResizeObserver(requestProgress);
      sizeObserver.observe(document.documentElement);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(landingTimer);
      body.classList.remove("landing-entering");
      revealObserver?.disconnect();
      fieldObserver?.disconnect();
      sizeObserver?.disconnect();
      preference.removeEventListener("change", applyPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("animationend", finishEntrance);
      document.removeEventListener("focusin", keepFocusedContentStill);
      window.removeEventListener("scroll", requestProgress);
      window.removeEventListener("resize", requestProgress);
      window.removeEventListener("hashchange", handleNavigation);
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("pageshow", handlePageShow);
      revealElements.forEach((element) => {
        element.removeAttribute("data-reveal-ready");
        element.classList.remove("is-entering");
        element.style.removeProperty("--reveal-delay");
      });
      fields.forEach((field) => field.classList.remove("is-outside", "is-energized"));
      resetDepth();
      refreshMotionRef.current = null;
      body.classList.remove("motion-ready", "tab-inactive");
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("motion-paused", motionPaused);
    if (motionPaused) {
      document.querySelectorAll("[data-reveal]").forEach((element) => {
        element.classList.add("is-revealed");
        element.classList.remove("is-entering");
      });
    }
    refreshMotionRef.current?.();
    return () => document.body.classList.remove("motion-paused");
  }, [motionPaused, pathname]);

  return (
    <>
      <div className="reading-progress-track" aria-hidden="true">
        <div className="reading-progress" ref={progressRef} style={{ transform: "scaleX(0)" }} />
      </div>
      <button
        type="button"
        className="motion-toggle"
        aria-pressed={motionPaused}
        aria-label={reducedMotion ? "Motion paused by your reduced-motion setting" : undefined}
        disabled={reducedMotion}
        title={reducedMotion ? "Motion is paused by your device's reduced-motion setting." : undefined}
        onClick={() => setPaused((current) => !current)}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" focusable="false">
          {motionPaused ? <path d="M3 1.5 10 6l-7 4.5Z" /> : <><path d="M2 1.5h2.5v9H2Z" /><path d="M7.5 1.5H10v9H7.5Z" /></>}
        </svg>
        <span>{reducedMotion ? "Motion reduced" : motionPaused ? "Resume motion" : "Pause motion"}</span>
      </button>
    </>
  );
}
