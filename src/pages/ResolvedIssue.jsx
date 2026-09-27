import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VENDORS } from '../data/mockData';
import IssuePhoto from '../components/IssuePhoto';
import { pkr } from '../utils/currency';

export default function ResolvedIssue() {
  const { id } = useParams();
  const { issues } = useApp();
  const issue = issues.find((it) => it.id === id);

  if (!issue) return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-ink/60">Issue not found.</div>;
  if (issue.status !== 'Resolved') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-ink/60">This issue hasn't been marked resolved yet.</p>
        <Link to={`/issues/${issue.id}/tracking`} className="mt-4 inline-block rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">View Tracking</Link>
      </div>
    );
  }

  const vendor = VENDORS.find((v) => v.id === issue.vendorId);
  const finalCost = issue.quotation ? issue.quotation.materials + issue.quotation.labor : issue.estimatedCost;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <div className="flex items-center justify-center gap-2 rounded-lg border border-moss/30 bg-moss/10 py-3 text-center font-semibold text-moss">
        <CheckCircle2 className="h-5 w-5" /> Issue Resolved
      </div>

      <h1 className="mt-6 font-display text-3xl font-semibold text-ink">{issue.title}</h1>
      <p className="mt-1 text-ink/60">{issue.location.area}</p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div>
          <IssuePhoto category={issue.category} image={issue.image} variant="before" className="h-48 w-full" />
          <p className="mt-1.5 text-center text-xs font-medium text-ink/50">Before</p>
        </div>
        <div>
          <IssuePhoto category={issue.category} variant="after" className="h-48 w-full" />
          <p className="mt-1.5 text-center text-xs font-medium text-ink/50">After</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Final cost</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">{pkr(finalCost)}</p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Completion date</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            {new Date(issue.resolvedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      {vendor && (
        <div className="mt-4 rounded-lg border border-ink/10 bg-white/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Vendor</p>
          <p className="mt-1 font-display text-lg font-medium text-ink">{vendor.name}</p>
          <p className="text-sm text-ink/60">{vendor.tagline}</p>
        </div>
      )}

      {issue.funding && (
        <div className="mt-4 flex items-center justify-between rounded-lg border border-ink/10 bg-white/60 p-5 text-sm">
          <span className="flex items-center gap-1.5 text-ink/60"><Users className="h-4 w-4" /> {issue.funding.contributors} contributing households</span>
          <span className="font-mono font-medium">{pkr(issue.funding.collected)} raised</span>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/issues" className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90">
          Explore More Community Issues
        </Link>
      </div>
    </div>
  );
}
