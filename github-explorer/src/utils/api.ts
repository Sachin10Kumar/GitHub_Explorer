import type { GitHubRepo, GitHubUser } from "../types/github";

const BASE = "https://api.github.com";

// The unauthenticated rate limit is 60 requests/hour per IP.
// For a portfolio project that's fine. If you add a personal access token
// here (as an env var) the limit rises to 5 000/hour.
const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

async function ghFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers });

  if (res.status === 404) throw new Error("User not found");
  if (res.status === 403) {
    const reset = res.headers.get("X-RateLimit-Reset");
    const resetTime = reset ? new Date(Number(reset) * 1000).toLocaleTimeString() : "soon";
    throw new Error(`GitHub rate limit hit. Resets at ${resetTime}.`);
  }
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  return res.json() as Promise<T>;
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  return ghFetch<GitHubUser>(`/users/${username}`);
}

// GitHub caps this at 100 per page. For users with >100 repos we'd need
// pagination, but 100 is plenty for a portfolio demo.
export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  return ghFetch<GitHubRepo[]>(
    `/users/${username}/repos?per_page=100&sort=updated`
  );
}
