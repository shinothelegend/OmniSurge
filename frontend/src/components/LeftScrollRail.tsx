"use client";

import { useEffect, useState, useRef } from "react";

interface SectionMarker {
  id: string;
  label: string;
  name: string;
}

interface LeftScrollRailProps {
  sections?: SectionMarker[];
}

export function LeftScrollRail({
  sections = [
    { id: "section-01", label: "01", name: "INTRO" },
    { id: "section-02", label: "02", name: "ARCHITECTURE" },
    { id: "section-03", label: "03", name: "BENCHMARKS" },
    { id: "section-04", label: "04", name: "TELEMETRY" },
    { id: "section-05", label: "05", name: "DEMO REEL" },
    { id: "section-06", label: "06", name: "ACCESS" },
  ],
}: LeftScrollRailProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const progress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
        setScrollProgress(progress);

        // Find active section based on scroll offset
        const sectionElements = sections.map((s) => document.getElementById(s.id));
        const viewportMiddle = currentScroll + window.innerHeight * 0.35;

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const el = sectionElements[i];
          if (el && el.offsetTop <= viewportMiddle) {
            setActiveIdx(i);
            break;
          }
        }
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Section navigation rail"
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none"
    >
      <div className="relative flex flex-col items-center gap-6 py-4">
        {/* Continuous thin vertical track line */}
        <div className="absolute top-3 bottom-3 w-[1px] bg-[#1E1E1E]">
          {/* Filled active progress line */}
          <div
            className="w-full bg-[#E23B3B] transition-all duration-150 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Section Number Markers */}
        {sections.map((section, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              title={`${section.label} — ${section.name}`}
              className="group relative z-10 flex items-center justify-center focus:outline-none"
            >
              <span
                className={`font-mono text-12 px-1 py-0.5 rounded-[2px] transition-colors duration-200 ${
                  isActive
                    ? "text-[#E23B3B] font-bold bg-[#0A0A0A]"
                    : "text-[#8A8A8A] hover:text-[#EDEDED] bg-[#0A0A0A]"
                }`}
              >
                {section.label}
              </span>

              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-[#111111] border border-[#1E1E1E] text-[#EDEDED] text-[10px] font-mono tracking-widest px-2 py-1 whitespace-nowrap shadow-sm">
                {section.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

