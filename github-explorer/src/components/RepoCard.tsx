import { GitFork, GitPullRequest, ExternalLink, Star } from "lucide-react";
import type { GitHubRepo } from "../types/github";
import { formatNumber, getLanguageColor, timeAgo } from "../utils/languages";

interface RepoCardProps {
  repo: GitHubRepo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-surface border border-border hover:border-accent/50 rounded-xl p-4 transition-all hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-mono text-sm text-accent group-hover:underline truncate">
              {repo.name}
            </h4>
            {repo.fork && (
              <span className="text-[9px] font-mono text-muted border border-border rounded-full px-1.5 py-0.5 shrink-0">
                fork
              </span>
            )}
          </div>
          {repo.description && (
            <p className="text-muted text-xs font-body mt-1 leading-relaxed line-clamp-2">
              {repo.description}
            </p>
          )}
        </div>
        <ExternalLink size={13} className="text-muted/0 group-hover:text-muted transition-colors shrink-0 mt-0.5" />
      </div>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {repo.topics.slice(0, 5).map((topic) => (
            <span key={topic} className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              {topic}
            </span>
          ))}
          {repo.topics.length > 5 && (
            <span className="text-[10px] font-mono text-muted">+{repo.topics.length - 5}</span>
          )}
        </div>
      )}

      {/* Footer meta row */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/60">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1 text-[11px] font-mono text-muted">
            <Star size={11} className="text-warn" />
            {formatNumber(repo.stargazers_count)}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 text-[11px] font-mono text-muted">
            <GitFork size={11} />
            {formatNumber(repo.forks_count)}
          </span>
        )}
        {repo.open_issues_count > 0 && (
          <span className="flex items-center gap-1 text-[11px] font-mono text-muted">
            <GitPullRequest size={11} className="text-success" />
            {repo.open_issues_count}
          </span>
        )}
        <span className="text-[11px] font-mono text-muted ml-auto shrink-0">
          {timeAgo(repo.updated_at)}
        </span>
      </div>
    </a>
  );
}
