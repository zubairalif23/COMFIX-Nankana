import React from 'react';

export default function ProgressBar({ value, max, colorClass = 'bg-teal', trackClass = 'bg-ink/10', label }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-ink/70">{label}</span>
          <span className="font-mono text-xs text-ink/60">{pct}%</span>
        </div>
      )}
      <div className={`h-2.5 w-full overflow-hidden rounded-full ${trackClass}`}>
        <div className={`h-full rounded-full ${colorClass} transition-all duration-700 ease-out`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
