import type { GitHubRepo, LanguageStat } from "../types/github";

// A hand-picked subset of GitHub's official language colour map.
// Full list: https://github.com/ozh/github-colors
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript:  "#3178C6",
  JavaScript:  "#F1E05A",
  Python:      "#3572A5",
  Rust:        "#DEA584",
  Go:          "#00ADD8",
  Java:        "#B07219",
  "C++":       "#F34B7D",
  C:           "#555555",
  "C#":        "#178600",
  Ruby:        "#701516",
  PHP:         "#4F5D95",
  Swift:       "#F05138",
  Kotlin:      "#A97BFF",
  Dart:        "#00B4AB",
  HTML:        "#E34C26",
  CSS:         "#563D7C",
  SCSS:        "#C6538C",
  Shell:       "#89E051",
  Dockerfile:  "#384D54",
  Vue:         "#41B883",
  Svelte:      "#FF3E00",
  Lua:         "#000080",
  R:           "#198CE7",
  Elixir:      "#6E4A7E",
  Haskell:     "#5E5086",
  Scala:       "#C22D40",
  Clojure:     "#DB5855",
  Jupyter:     "#DA5B0B",
};

export function getLanguageColor(name: string): string {
  return LANGUAGE_COLORS[name] ?? "#8B949E";
}

export function computeLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const counts: Record<string, number> = {};

  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10) // top 10 languages
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100 * 10) / 10,
      color: getLanguageColor(name),
    }));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
