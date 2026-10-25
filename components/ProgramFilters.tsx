"use client";

import { useState } from "react";

const filters = [
  { label: "All", count: "4" },
  { label: "Completed", count: "3" },
  { label: "Upcoming", count: "1" },
] as const;

export function ProgramFilters() {
  const [active, setActive] = useState<(typeof filters)[number]["label"]>("All");

  return (
    <div className="filters" role="tablist" aria-label="Filter programs">
      {filters.map((filter) => (
        <button
          key={filter.label}
          type="button"
          role="tab"
          aria-selected={active === filter.label}
          className={active === filter.label ? "is-on" : ""}
          onClick={() => {
            setActive(filter.label);
            document.querySelectorAll<HTMLElement>("[data-program]").forEach((el) => {
              const kind = el.dataset.program;
              el.hidden = filter.label !== "All" && kind !== filter.label.toLowerCase();
            });
          }}
        >
          {filter.label}
          <span>{filter.count}</span>
        </button>
      ))}
    </div>
  );
}
