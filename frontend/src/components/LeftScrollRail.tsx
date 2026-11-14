"use client";

import { useEffect, useState, useRef } from "react";

export interface SectionMarker {
  id: string;
  label: string;
  name: string;
}

const DEFAULT_SECTIONS: SectionMarker[] = [
  { id: "section-01", label: "01", name: "ARCHITECTURE" },
  { id: "section-02", label: "02", name: "EXECUTION" },
  { id: "section-03", label: "03", name: "SETTLEMENT" },
  { id: "section-04", label: "04", name: "DEPTH PROFILE" },
  { id: "section-05", label: "05", name: "POOLS" },
  { id: "section-06", label: "06", name: "DEMO REEL" },
  { id: "section-07", label: "07", name: "INVARIANTS" },
];

export function LeftScrollRail({
  sections = DEFAULT_SECTIONS,
}: {
  sections?: SectionMarker[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef(sections);
  sectionsRef.current = sections;

  useEffect(() => {
    const updatePositions = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
      setScrollProgress(progress);

      const triggerLine = window.innerHeight * 0.45;
      let matchedIdx = 0;

      for (let i = 0; i < sectionsRef.current.length; i++) {
        const el = document.getElementById(sectionsRef.current[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            matchedIdx = i;
          }
        }
      }

      setActiveIdx(matchedIdx);
    };

    window.addEventListener("scroll", updatePositions, { passive: true });
    updatePositions();

    return () => {
      window.removeEventListener("scroll", updatePositions);
    };
  }, []);

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
      <div className="relative flex flex-col items-center gap-7 py-3">
        {/* Continuous 1px vertical track line connecting 01-07 markers */}
        <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-[#1E1E1E] pointer-events-none">
          {/* Accent red progress fill proportional to scroll */}
          <div
            className="w-full bg-[#E23B3B] transition-[height] duration-100 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Numbered Section Markers (01 - 07) */}
        {sections.map((section, idx) => {
          const isActive = activeIdx === idx;
          const isPassed = idx <= activeIdx;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              title={`${section.label} — ${section.name}`}
              className="group relative z-10 flex items-center justify-center focus:outline-none"
            >
              <span
                className={`font-mono text-12 px-1.5 py-0.5 transition-colors duration-150 ${
                  isActive
                    ? "text-[#E23B3B] font-bold bg-[#0A0A0A] border border-[#E23B3B]"
                    : isPassed
                    ? "text-[#EDEDED] font-bold bg-[#0A0A0A] border border-[#1E1E1E]"
                    : "text-[#8A8A8A] hover:text-[#EDEDED] bg-[#0A0A0A] border border-transparent"
                }`}
              >
                {section.label}
              </span>

              {/* Tooltip on hover */}
              <span className="pointer-events-none absolute left-9 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-[#111111] border border-[#1E1E1E] text-[#EDEDED] text-[10px] font-mono tracking-widest px-2 py-1 whitespace-nowrap shadow-sm">
                {section.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
