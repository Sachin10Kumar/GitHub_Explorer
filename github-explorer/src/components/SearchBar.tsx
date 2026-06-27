import { useEffect, useRef, useState } from "react";
import { Search, Clock, X } from "lucide-react";

const HISTORY_KEY = "gh-explorer:history";
const MAX_HISTORY = 6;

function loadHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function saveHistory(username: string, prev: string[]): string[] {
  const next = [username, ...prev.filter((h) => h !== username)].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [history, setHistory] = useState<string[]>(loadHistory);

  // Press "/" anywhere on the page to focus the search box.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit(username: string) {
    const trimmed = username.trim();
    if (!trimmed) return;
    setHistory((prev) => saveHistory(trimmed, prev));
    setValue(trimmed);
    setFocused(false);
    inputRef.current?.blur();
    onSearch(trimmed);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(value);
  }

  const showDropdown = focused && history.length > 0 && !loading;

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className={`flex items-center gap-3 bg-surface border rounded-lg px-4 py-3 transition-colors ${focused ? "border-accent" : "border-border"}`}>
          <Search size={16} className={focused ? "text-accent" : "text-muted"} />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search any GitHub username..."
            className="flex-1 bg-transparent text-bright placeholder:text-muted font-mono text-sm outline-none"
            autoComplete="off"
            spellCheck={false}
            disabled={loading}
          />
          {value && (
            <button type="button" onClick={() => setValue("")} className="text-muted hover:text-bright">
              <X size={14} />
            </button>
          )}
          {!focused && !value && (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-border text-muted">/</kbd>
          )}
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="px-3 py-1.5 bg-accent text-void text-xs font-mono font-semibold rounded hover:bg-accent/90 disabled:opacity-40 transition-all shrink-0"
          >
            {loading ? "···" : "Go"}
          </button>
        </div>
      </form>

      {showDropdown && (
        <div className="absolute z-20 top-full mt-1 w-full bg-surface border border-border rounded-lg overflow-hidden shadow-xl shadow-black/40">
          <p className="px-4 py-2 text-[10px] font-mono text-muted uppercase tracking-widest">Recent</p>
          {history.map((username) => (
            <button
              key={username}
              onMouseDown={() => submit(username)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-border text-sm text-muted hover:text-bright transition-colors"
            >
              <Clock size={13} className="shrink-0" />
              <span className="font-mono">{username}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
