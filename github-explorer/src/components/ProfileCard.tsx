import { Building2, Calendar, ExternalLink, Globe, Link2, Mail, MapPin, Twitter, Users } from "lucide-react";
import type { GitHubUser } from "../types/github";
import { formatDate, formatNumber } from "../utils/languages";

interface ProfileCardProps {
  user: GitHubUser;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const joinedYear = new Date(user.created_at).getFullYear();

  return (
    <div className="bg-surface border border-border rounded-xl p-6 animate-fade-up">
      <div className="flex items-start gap-5">
        <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="shrink-0">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-20 h-20 rounded-full ring-2 ring-border hover:ring-accent transition-all"
          />
        </a>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              {user.name && (
                <h2 className="text-bright font-body font-semibold text-xl leading-tight">{user.name}</h2>
              )}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-accent text-sm hover:underline inline-flex items-center gap-1"
              >
                @{user.login}
                <ExternalLink size={11} />
              </a>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted bg-border px-2 py-1 rounded-full shrink-0">
              <Calendar size={10} />
              Joined {joinedYear}
            </div>
          </div>

          {user.bio && (
            <p className="text-muted text-sm font-body mt-2 leading-relaxed">{user.bio}</p>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: "Repositories", value: user.public_repos },
          { label: "Followers", value: user.followers },
          { label: "Following", value: user.following },
        ].map(({ label, value }) => (
          <div key={label} className="bg-void border border-border rounded-lg p-3 text-center">
            <p className="font-mono text-xl font-semibold text-bright">{formatNumber(value)}</p>
            <p className="font-mono text-[10px] text-muted mt-0.5 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* Social / meta links */}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {user.company && (
          <MetaItem icon={<Building2 size={13} />} label={user.company} />
        )}
        {user.location && (
          <MetaItem icon={<MapPin size={13} />} label={user.location} />
        )}
        {user.blog && (
          <MetaItem
            icon={<Globe size={13} />}
            label={user.blog.replace(/^https?:\/\//, "")}
            href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
          />
        )}
        {user.email && (
          <MetaItem icon={<Mail size={13} />} label={user.email} href={`mailto:${user.email}`} />
        )}
        {user.twitter_username && (
          <MetaItem
            icon={<Twitter size={13} />}
            label={`@${user.twitter_username}`}
            href={`https://twitter.com/${user.twitter_username}`}
          />
        )}
        <MetaItem
          icon={<Link2 size={13} />}
          label="View on GitHub"
          href={user.html_url}
        />
      </div>
    </div>
  );
}

function MetaItem({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const cls = "flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {icon}
        <span className="truncate max-w-[180px]">{label}</span>
      </a>
    );
  }
  return (
    <span className={cls}>
      {icon}
      <span className="truncate max-w-[180px]">{label}</span>
    </span>
  );
}
