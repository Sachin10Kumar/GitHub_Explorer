import { useMemo } from "react";
import { Github, Telescope } from "lucide-react";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import LanguageBar from "./components/LanguageBar";
import RepoList from "./components/RepoList";
import { ProfileSkeleton, LanguageSkeleton, RepoSkeleton } from "./components/Skeletons";
import { useGitHubProfile } from "./hooks/useGitHubProfile";
import { computeLanguageStats } from "./utils/languages";

const SUGGESTED = ["torvalds", "gaearon", "sindresorhus", "yyx990803", "tj"];

export default function App() {
  const { status, data, error, search } = useGitHubProfile();

  const languageStats = useMemo(
    () => (data ? computeLanguageStats(data.repos) : []),
    [data]
  );

  return (
    <div className="min-h-screen bg-void text-bright font-body">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-border bg-void/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Telescope size={18} className="text-accent" />
            <span className="font-mono text-sm text-bright hidden sm:inline">gh-explorer</span>
          </div>
          <div className="flex-1">
            <SearchBar onSearch={search} loading={status === "loading"} />
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-bright transition-colors shrink-0"
          >
            <Github size={18} />
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* IDLE — landing / hero */}
        {status === "idle" && (
          <div className="text-center py-20 space-y-6 animate-fade-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface border border-border mb-2">
              <Telescope size={28} className="text-accent" />
            </div>
            <div>
              <h1 className="font-mono text-3xl font-bold text-bright tracking-tight">
                GitHub Explorer
              </h1>
              <p className="text-muted font-body text-base mt-2 max-w-md mx-auto">
                Search any GitHub profile. See their repos, language breakdown, and contribution stats — all in one view.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-muted font-mono text-xs">Try:</span>
              {SUGGESTED.map((name) => (
                <button
                  key={name}
                  onClick={() => search(name)}
                  className="font-mono text-xs px-3 py-1.5 bg-surface border border-border rounded-full text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="font-mono text-[11px] text-muted/60 pt-4">
              Press <kbd className="bg-border text-muted px-1 rounded">/</kbd> to focus the search bar
            </p>
          </div>
        )}

        {/* LOADING — skeleton placeholders */}
        {status === "loading" && (
          <div className="space-y-6">
            <ProfileSkeleton />
            <LanguageSkeleton />
            <RepoSkeleton />
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <div className="text-center py-20 animate-fade-up">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface border border-border mb-4">
              <span className="text-2xl">404</span>
            </div>
            <p className="font-mono text-bright">{error}</p>
            <p className="text-muted font-body text-sm mt-1">Check the username and try again.</p>
          </div>
        )}

        {/* SUCCESS */}
        {status === "success" && data && (
          <div className="space-y-6">
            <ProfileCard user={data.user} />
            {languageStats.length > 0 && <LanguageBar stats={languageStats} />}
            <RepoList repos={data.repos} />
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-6 text-center font-mono text-[11px] text-muted/60">
        Built with the GitHub REST API — unauthenticated, 60 req/hr rate limit per IP.
        Data is not stored anywhere.
      </footer>
    </div>
  );
}
