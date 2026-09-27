import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { pkr } from '../utils/currency';

export default function ContributionConfirmation() {
  const { id } = useParams();
  const { state } = useLocation();
  const { issues } = useApp();
  const issue = issues.find((it) => it.id === id);
  const amount = state?.amount ?? 0;

  if (!issue || !issue.funding) return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-ink/60">Nothing to confirm.</div>;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-moss" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">Contribution confirmed</h1>
      <p className="mt-2 text-ink/70">
        Your contribution of <strong className="font-mono">{pkr(amount)}</strong> toward <strong>{issue.title}</strong> has been recorded.
      </p>

      <div className="mt-6 rounded-lg border border-ink/10 bg-white/60 p-5 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Community project</p>
        <p className="mt-1 font-display text-lg font-medium text-ink">{issue.title}</p>
        <p className="text-sm text-ink/60">{issue.location.area}</p>
        <div className="mt-4">
          <ProgressBar value={issue.funding.collected} max={issue.funding.required} colorClass="bg-moss" label="Updated funding progress" />
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-ink/60">Collected</span>
          <span className="font-mono font-medium">{pkr(issue.funding.collected)} / {pkr(issue.funding.required)}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link to={`/issues/${issue.id}`} className="rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90">View Issue</Link>
        <Link to="/my-contributions" className="rounded-md border border-ink/20 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">My Contributions</Link>
      </div>
    </div>
  );
}
