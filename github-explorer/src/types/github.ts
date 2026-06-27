// Shapes returned by the GitHub REST API (v3).
// We only pull the fields we actually use — the real responses have ~80+ fields each.

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  twitter_username: string | null;
  email: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string; // ISO 8601
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string; // ISO 8601
  fork: boolean;
  topics: string[];
}

// Computed from repo language fields — not a raw API type.
export interface LanguageStat {
  name: string;
  count: number;       // number of repos using this language
  percentage: number;  // 0-100
  color: string;       // display colour
}

export type SortKey = "stars" | "updated" | "forks" | "name";

export type FilterState = {
  query: string;
  language: string; // "" == all
  sort: SortKey;
  showForks: boolean;
};
