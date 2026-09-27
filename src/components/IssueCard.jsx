import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowUpRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { CATEGORY_COLORS } from '../data/mockData';
import { pkr } from '../utils/currency';

export default function IssueCard({ issue }) {
  const accent = CATEGORY_COLORS[issue.category] || 'teal';

  const pct = Math.min(
    100,
    Math.round((issue.votes / issue.voteThreshold) * 100)
  );

  return (
    <Link
      to={`/issues/${issue.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative h-48 w-full overflow-hidden bg-ink/5">
        {issue.image ? (
          <img
            src={issue.image}
            alt={issue.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement.querySelector('[data-image-fallback]');
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink/5 text-sm text-ink/40">
            No image available
          </div>
        )}

        {/* CATEGORY */}
        <div className="absolute left-3 top-3">
          <span
            className={`rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-sm text-${accent}`}
          >
            {issue.category}
          </span>
        </div>

        {/* STATUS */}
        <div className="absolute right-3 top-3">
          <StatusBadge status={issue.status} />
        </div>

        {/* VIEW ICON */}
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 opacity-0 shadow-sm transition group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-ink" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:underline">
          {issue.title}
        </h3>

        {/* LOCATION */}
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/60">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">
            {issue.location.area}
          </span>
        </p>

        {/* DESCRIPTION */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/65">
          {issue.description}
        </p>

        {/* COST */}
        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3">
          <span className="text-sm text-ink/50">
            Estimated cost
          </span>

          <span className="font-mono text-sm font-semibold text-ink">
            {pkr(issue.estimatedCost)}
          </span>
        </div>

        {/* VOTING */}
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between text-xs text-ink/60">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {issue.votes}/{issue.voteThreshold} votes
            </span>

            <span>
              {issue.households} households
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
            <div
              className={`h-full rounded-full bg-${accent} transition-all`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}