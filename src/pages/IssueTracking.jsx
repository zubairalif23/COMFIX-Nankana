import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CalendarCheck2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VENDORS } from '../data/mockData';
import StageRoute from '../components/StageRoute';
import ProgressBar from '../components/ProgressBar';
import IssuePhoto from '../components/IssuePhoto';
import StatusBadge from '../components/StatusBadge';
import { pkr } from '../utils/currency';

export default function IssueTracking() {
  const { id } = useParams();
  const { issues, markResolved, showToast } = useApp();
  const navigate = useNavigate();
  const issue = issues.find((it) => it.id === id);

  if (!issue) return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-ink/60">Issue not found.</div>;
  const vendor = VENDORS.find((v) => v.id === issue.vendorId);

  function handleMarkResolved() {
    markResolved(issue.id);
    showToast('Issue marked as resolved — thank you for confirming.');
    navigate(`/issues/${issue.id}/resolved`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <Link to={`/issues/${issue.id}`} className="text-sm text-teal hover:underline">← Back to Issue</Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Issue Tracking</h1>
          <p className="mt-1 text-ink/60">{issue.title} · {issue.location.area}</p>
        </div>
        <StatusBadge status={issue.status} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-ink/10 bg-white/50 p-5 md:col-span-1">
          <p className="mb-4 text-sm font-semibold text-ink">Project route</p>
          <StageRoute currentStatus={issue.status} orientation="vertical" />
        </div>

        <div className="space-y-6 md:col-span-2">
          {vendor && (
            <div className="rounded-lg border border-ink/10 bg-white/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Vendor</p>
              <p className="mt-1 font-display text-lg font-medium text-ink">{vendor.name}</p>
              <p className="text-sm text-ink/60">{vendor.tagline}</p>
            </div>
          )}

          {issue.funding && (
            <div className="rounded-lg border border-ink/10 bg-white/50 p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">Funding status</p>
              <ProgressBar value={issue.funding.collected} max={issue.funding.required} colorClass="bg-moss" />
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-ink/60">{issue.funding.contributors} households contributed</span>
                <span className="font-mono">{pkr(issue.funding.collected)} / {pkr(issue.funding.required)}</span>
              </div>
            </div>
          )}

          <div className="rounded-lg border border-ink/10 bg-white/50 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/40">Work progress</p>
            <ul className="space-y-3">
              {issue.progressUpdates.map((u, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  <div>
                    <p className="text-ink/80">{u.text}</p>
                    <p className="text-xs text-ink/40">{new Date(u.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                </li>
              ))}
            </ul>
            {issue.expectedCompletion && issue.status === 'In Progress' && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-route">
                <CalendarCheck2 className="h-4 w-4" /> Expected completion: {new Date(issue.expectedCompletion).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/40">Before / after</p>
            <div className="grid grid-cols-2 gap-3">
              <IssuePhoto category={issue.category} image={issue.image} variant="before" className="h-32 w-full" />
              <IssuePhoto category={issue.category} variant="after" className="h-32 w-full" />
            </div>
          </div>

          {issue.status === 'In Progress' && (
            <button onClick={handleMarkResolved} className="w-full rounded-md bg-moss px-4 py-3 text-sm font-semibold text-white hover:bg-moss/90">
              Mark Issue as Resolved
            </button>
          )}
          {issue.status === 'Resolved' && (
            <Link to={`/issues/${issue.id}/resolved`} className="block w-full rounded-md bg-ink px-4 py-3 text-center text-sm font-semibold text-paper hover:bg-ink/90">
              View Resolved Issue
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
