# GitHub Explorer

Search any GitHub username and get a clean, developer-focused view of their profile — repos filtered and sorted, language breakdown as a stacked bar, follower/following/repo stats, and all social links in one place.

**Live features:**
- Search any public GitHub profile (no API key required)
- User card: avatar, bio, stats, company, location, blog, Twitter, email
- Language breakdown as a stacked bar chart (computed from all repos, no chart library)
- Repo list with real-time filter by name/topic, language dropdown, sort (stars / updated / forks / name), and fork toggle
- Skeleton loading placeholders that match the real layout so the page never jumps
- Recent search history in localStorage (dropdown on focus)
- Press `/` from anywhere on the page to focus the search bar
- Fully responsive — readable on mobile
- Error states for 404 (user not found) and 403 (rate limit hit with reset time)

## Stack

- **Vite + React 18 + TypeScript** — standard modern setup
- **Tailwind CSS** — utility-first styling, dark GitHub-adjacent palette
- **Lucide React** — icons (only dependency besides React)
- **GitHub REST API v3** — no API key needed, 60 unauthenticated requests/hour per IP

## How to run

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Project structure

```
src/
  types/github.ts           GitHubUser, GitHubRepo, LanguageStat, FilterState types
  utils/
    api.ts                  Two functions: fetchUser(), fetchRepos() — all GitHub API calls
    languages.ts            Language colour map, computeLanguageStats(), formatNumber(), timeAgo()
  hooks/
    useGitHubProfile.ts     Custom hook — runs both API calls in parallel, exposes status/data/error
  components/
    SearchBar.tsx           Input with "/" shortcut, recent history dropdown, debounce-free
    ProfileCard.tsx         Avatar, name, bio, 3-stat grid, all social meta links
    LanguageBar.tsx         Stacked horizontal bar + legend pills (the signature element)
    RepoFilters.tsx         Text search, language select, sort select, fork toggle
    RepoCard.tsx            Individual repo — name, description, topics, language dot, star/fork/issue counts, time ago
    RepoList.tsx            Holds filter state, applies all filters/sort in a useMemo, renders the grid
    Skeletons.tsx           Shimmer placeholders for profile, language bar, and repo grid
  App.tsx                   Four states: idle (landing), loading, error, success
```

## Key technical decisions

**Parallel fetches:** `useGitHubProfile` runs `fetchUser` and `fetchRepos` with `Promise.all`, cutting the wait roughly in half compared to sequential calls.

**Filter state in `RepoList`:** kept local to that component since nothing else needs it. Avoids prop drilling and keeps `App` clean.

**`useMemo` for filtering:** the filter/sort computation only re-runs when `repos` or `filters` change — not on unrelated re-renders.

**No chart library:** the language bar is plain `div` elements with percentage widths. Anything else would be overkill and would bloat the bundle for a simple UI element.

**Skeleton layout matching:** the shimmer placeholders have the same grid structure as the real content, so when data arrives the page doesn't reflow or jump.

## Adding a GitHub token (optional)

If you want the rate limit raised from 60 to 5 000 requests/hour, create a `.env` file:

```
VITE_GITHUB_TOKEN=ghp_yourpersonalaccesstoken
```

Then in `src/utils/api.ts`, update the headers:

```ts
const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(import.meta.env.VITE_GITHUB_TOKEN
    ? { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
    : {}),
};
```

## Deploy

```bash
npm run build
# Outputs /dist — deploy to Vercel, Netlify, or GitHub Pages.
```

For Vercel: push to GitHub, import the repo, set framework to "Vite", done.

## Resume description

> **GitHub Profile Explorer** — React + TypeScript SPA that queries the GitHub REST API to display any public profile's repos, language breakdown, and stats. Features real-time filtering/sorting with useMemo, parallel data fetching with Promise.all, skeleton loading states, localStorage search history, and a stacked language bar built without a chart library. Deployed on Vercel.
