import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, MapPin, ThumbsUp, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import MapPreview from '../components/MapPreview';
import IssuePhoto from '../components/IssuePhoto';
import StageRoute from '../components/StageRoute';
import { pkr } from '../utils/currency';

export default function IssueDetails() {
  const { id } = useParams();
  const { issues, votedIssueIds, voteIssue, showToast } = useApp();
  const navigate = useNavigate();
  const issue = issues.find((it) => it.id === id);

  if (!issue) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-center text-ink/60">Issue not found. <Link to="/issues" className="text-teal underline">Back to Community Issues</Link></div>;
  }

  const hasVoted = votedIssueIds.includes(issue.id);
  const canVote = issue.status === 'Reported' || issue.status === 'Voting';

  function handleVote() {
    voteIssue(issue.id);
    showToast('Your vote has been recorded — thanks for backing this fix.');
  }

  const nextStepLink = () => {
    if (issue.status === 'Community Approved') return { to: '/vendors', label: 'Go to Vendor Marketplace' };
    if (issue.status === 'Vendor Selected') return { to: `/issues/${issue.id}/quotation`, label: 'View Vendor Quotation' };
    if (issue.status === 'Funding') return { to: `/issues/${issue.id}/funding`, label: 'View Community Funding' };
    if (issue.status === 'In Progress') return { to: `/issues/${issue.id}/tracking`, label: 'View Issue Tracking' };
    if (issue.status === 'Resolved') return { to: `/issues/${issue.id}/resolved`, label: 'View Resolved Issue' };
    return null;
  };
  const next = nextStepLink();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <Link to="/issues" className="text-sm text-teal hover:underline">← Back to Community Issues</Link>

      <div className="mt-4 grid gap-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <IssuePhoto category={issue.category} image={issue.image} className="h-56 w-full" />
        </div>
        <div className="md:col-span-3">
          <div className="flex items-start justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-teal">{issue.category}</span>
            <StatusBadge status={issue.status} />
          </div>
          <h1 className="mt-1 font-display text-2xl font-semibold text-ink md:text-3xl">{issue.title}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/60"><MapPin className="h-4 w-4" /> {issue.location.area}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/50"><Calendar className="h-4 w-4" /> Reported by {issue.reporter} · {new Date(issue.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          <p className="mt-4 text-ink/75">{issue.description}</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-ink/10 bg-white/50 p-5">
        <p className="mb-3 text-sm font-semibold text-ink">Project route</p>
        <StageRoute currentStatus={issue.status} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-ink/10 bg-white/50 p-5">
          <p className="mb-3 text-sm font-semibold text-ink">Location</p>
          <MapPreview label={issue.location.area} />
        </div>

        <div className="rounded-lg border border-ink/10 bg-white/50 p-5">
          <p className="mb-3 text-sm font-semibold text-ink">Community voting</p>
          <ProgressBar value={issue.votes} max={issue.voteThreshold} colorClass="bg-route" label={`${issue.votes} of ${issue.voteThreshold} votes needed`} />
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-ink/60"><Users className="h-4 w-4" /> {issue.households} supporting households</span>
            <span className="font-mono font-semibold text-ink">{pkr(issue.estimatedCost)}</span>
          </div>
          {canVote ? (
            <button
              onClick={handleVote}
              disabled={hasVoted}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                hasVoted ? 'cursor-not-allowed bg-moss/15 text-moss' : 'bg-route text-white hover:bg-route/90'
              }`}
            >
              {hasVoted ? (<><Check className="h-4 w-4" /> Vote recorded</>) : (<><ThumbsUp className="h-4 w-4" /> Vote to Fix</>)}
            </button>
          ) : (
            <div className="mt-4 rounded-md bg-teal/10 px-4 py-2.5 text-center text-sm font-medium text-teal">Voting closed — this issue has moved forward</div>
          )}
        </div>
      </div>

      {next && (
        <div className="mt-6 flex items-center justify-between rounded-lg border border-route/30 bg-route/10 p-4">
          <p className="text-sm text-ink/80">This issue has progressed further along its route.</p>
          <button onClick={() => navigate(next.to)} className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink/90">
            {next.label}
          </button>
        </div>
      )}

      <div className="mt-6 rounded-lg border border-ink/10 bg-white/50 p-5">
        <p className="mb-3 text-sm font-semibold text-ink">Progress &amp; timeline</p>
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
      </div>
    </div>
  );
}
