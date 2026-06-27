import { Search } from "lucide-react";
import type { FilterState, SortKey } from "../types/github";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "stars", label: "Stars" },
  { value: "updated", label: "Updated" },
  { value: "forks", label: "Forks" },
  { value: "name", label: "Name" },
];

interface RepoFiltersProps {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  languages: string[];
  totalRepos: number;
  filteredCount: number;
}

export default function RepoFilters({ filters, setFilters, languages, totalRepos, filteredCount }: RepoFiltersProps) {
  function set<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters({ ...filters, [key]: value });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs text-muted uppercase tracking-widest">Repositories</h3>
        <span className="font-mono text-xs text-muted">
          {filteredCount === totalRepos ? totalRepos : `${filteredCount} / ${totalRepos}`}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Text search */}
        <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search size={13} className="text-muted shrink-0" />
          <input
            type="text"
            placeholder="Filter repos..."
            value={filters.query}
            onChange={(e) => set("query", e.target.value)}
            className="bg-transparent text-bright placeholder:text-muted font-mono text-xs outline-none w-full"
          />
        </div>

        {/* Language filter */}
        <select
          value={filters.language}
          onChange={(e) => set("language", e.target.value)}
          className="bg-surface border border-border text-muted font-mono text-xs rounded-lg px-3 py-2 outline-none hover:border-accent transition-colors cursor-pointer"
        >
          <option value="">All languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => set("sort", e.target.value as SortKey)}
          className="bg-surface border border-border text-muted font-mono text-xs rounded-lg px-3 py-2 outline-none hover:border-accent transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>Sort: {label}</option>
          ))}
        </select>

        {/* Fork toggle */}
        <button
          onClick={() => set("showForks", !filters.showForks)}
          className={`px-3 py-2 rounded-lg border font-mono text-xs transition-colors ${
            filters.showForks
              ? "bg-accent/10 border-accent text-accent"
              : "bg-surface border-border text-muted hover:border-muted"
          }`}
        >
          {filters.showForks ? "✓ " : ""}Forks
        </button>
      </div>
    </div>
  );
}
