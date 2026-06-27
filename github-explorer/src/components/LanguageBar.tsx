import type { LanguageStat } from "../types/github";

interface LanguageBarProps {
  stats: LanguageStat[];
}

export default function LanguageBar({ stats }: LanguageBarProps) {
  if (stats.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-xl p-5 animate-fade-up">
      <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Languages</h3>

      {/* The stacked bar — this is the signature element */}
      <div className="flex h-2 rounded-full overflow-hidden gap-px mb-5">
        {stats.map((lang) => (
          <div
            key={lang.name}
            style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
            title={`${lang.name} ${lang.percentage}%`}
            className="transition-all hover:opacity-80"
          />
        ))}
      </div>

      {/* Legend pills */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {stats.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
            <span className="font-mono text-xs text-muted">
              {lang.name}
            </span>
            <span className="font-mono text-xs text-bright">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
