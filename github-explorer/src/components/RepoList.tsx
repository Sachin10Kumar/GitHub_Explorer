import { useState, useMemo } from "react";
import type { FilterState, GitHubRepo } from "../types/github";
import RepoCard from "./RepoCard";
import RepoFilters from "./RepoFilters";

interface RepoListProps {
  repos: GitHubRepo[];
}

const DEFAULT_FILTERS: FilterState = {
  query: "",
  language: "",
  sort: "stars",
  showForks: false,
};

export default function RepoList({ repos }: RepoListProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const languages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => { if (r.language) langs.add(r.language); });
    return Array.from(langs).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    let result = [...repos];

    if (!filters.showForks) result = result.filter((r) => !r.fork);
    if (filters.language) result = result.filter((r) => r.language === filters.language);
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description ?? "").toLowerCase().includes(q) ||
          r.topics.some((t) => t.includes(q))
      );
    }

    result.sort((a, b) => {
      switch (filters.sort) {
        case "stars":   return b.stargazers_count - a.stargazers_count;
        case "forks":   return b.forks_count - a.forks_count;
        case "updated": return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "name":    return a.name.localeCompare(b.name);
        default:        return 0;
      }
    });

    return result;
  }, [repos, filters]);

  return (
    <div className="space-y-4 animate-fade-up">
      <RepoFilters
        filters={filters}
        setFilters={setFilters}
        languages={languages}
        totalRepos={repos.length}
        filteredCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted font-mono text-sm">
          {filters.query || filters.language
            ? "No repos match your filters. Try clearing them."
            : "No public repositories."}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
