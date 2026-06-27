import { useCallback, useState } from "react";
import type { GitHubRepo, GitHubUser } from "../types/github";
import { fetchRepos, fetchUser } from "../utils/api";

type Status = "idle" | "loading" | "success" | "error";

export interface ProfileData {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export function useGitHubProfile() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;

    setStatus("loading");
    setError(null);
    setData(null);

    try {
      // Run both requests in parallel — cuts total wait time roughly in half.
      const [user, repos] = await Promise.all([
        fetchUser(trimmed),
        fetchRepos(trimmed),
      ]);
      setData({ user, repos });
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }, []);

  return { status, data, error, search };
}
