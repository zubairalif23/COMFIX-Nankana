import React from 'react';
import { Link } from 'react-router-dom';
import { HandCoins } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import { pkr } from '../utils/currency';

export default function MyContributions() {
  const { myContributions, issues } = useApp();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">My Contributions</h1>
      <p className="mt-2 text-ink/60">Community projects you've helped fund.</p>

      {myContributions.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-ink/20 p-10 text-center text-ink/50">
          You haven't contributed to any projects yet.
          <div className="mt-3"><Link to="/issues" className="text-teal underline">Browse issues to support</Link></div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {myContributions.map((c) => {
            const issue = issues.find((it) => it.id === c.issueId);
            if (!issue) return null;
            return (
              <div key={c.id} className="rounded-lg border border-ink/10 bg-white/60 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-medium text-ink">{issue.title}</p>
                    <p className="text-sm text-ink/50">{issue.location.area} · {new Date(c.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <StatusBadge status={issue.status} />
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-route">
                  <HandCoins className="h-4 w-4" /> You contributed {pkr(c.amount)}
                </p>
                {issue.funding && (
                  <div className="mt-3">
                    <ProgressBar value={issue.funding.collected} max={issue.funding.required} colorClass="bg-moss" label="Project funding status" />
                  </div>
                )}
                <Link to={`/issues/${issue.id}`} className="mt-3 inline-block text-sm text-teal hover:underline">View project →</Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
