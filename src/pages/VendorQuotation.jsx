import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CalendarClock, CheckCircle2, ClipboardList } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VENDORS, STAGES } from '../data/mockData';
import { pkr } from '../utils/currency';

export default function VendorQuotation() {
  const { id } = useParams();
  const { issues, submitQuotation, approveQuotation, showToast } = useApp();
  const navigate = useNavigate();
  const issue = issues.find((it) => it.id === id);

  useEffect(() => {
    if (issue && !issue.quotation && issue.vendorId) {
      const vendor = VENDORS.find((v) => v.id === issue.vendorId);
      const materials = Math.round(issue.estimatedCost * 0.62);
      const labor = issue.estimatedCost - materials;
      submitQuotation(issue.id, {
        workDescription: `${vendor?.name} proposes repair work for "${issue.title}" covering site preparation, materials sourcing and full restoration to community standard.`,
        materials,
        labor,
        completionDays: 3 + Math.round(Math.random() * 4),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issue?.id]);

  if (!issue) return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-ink/60">Issue not found.</div>;
  if (!issue.vendorId) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-ink/60">No vendor has been selected for this issue yet.</p>
        <Link to={`/vendors?issue=${issue.id}`} className="mt-4 inline-block rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">Select a Vendor</Link>
      </div>
    );
  }

  const vendor = VENDORS.find((v) => v.id === issue.vendorId);
  const q = issue.quotation;
  const budget = q ? q.materials + q.labor : issue.estimatedCost;

  function handleApprove() {
    approveQuotation(issue.id);
    showToast('Quotation approved — moving to community funding.');
    navigate(`/issues/${issue.id}/funding`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
      <Link to={`/issues/${issue.id}`} className="text-sm text-teal hover:underline">← Back to Issue</Link>
      <div className="mt-4 flex items-center gap-2">
        <ClipboardList className="h-6 w-6 text-teal" />
        <h1 className="font-display text-3xl font-semibold text-ink">Public Vendor Quotation</h1>
      </div>
      <p className="mt-2 text-ink/60">for "{issue.title}" · {issue.location.area}</p>

      {vendor && (
        <div className="mt-6 rounded-lg border border-ink/10 bg-white/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Vendor</p>
          <h2 className="mt-1 font-display text-xl font-medium text-ink">{vendor.name}</h2>
          <p className="mt-1 text-sm text-ink/60">{vendor.tagline}</p>
        </div>
      )}

      {q ? (
        <>
          <div className="mt-6 rounded-lg border border-ink/10 bg-white/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Work description</p>
            <p className="mt-2 text-ink/75">{q.workDescription}</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Cost breakdown</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-ink/60">Materials</span><span className="font-mono">{pkr(q.materials)}</span></div>
                <div className="flex justify-between"><span className="text-ink/60">Labour</span><span className="font-mono">{pkr(q.labor)}</span></div>
                <div className="flex justify-between border-t border-ink/10 pt-2 font-semibold"><span>Proposed budget</span><span className="font-mono">{pkr(budget)}</span></div>
              </div>
            </div>
            <div className="rounded-lg border border-ink/10 bg-white/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Timeline</p>
              <p className="mt-3 flex items-center gap-2 text-ink/75"><CalendarClock className="h-4 w-4 text-teal" /> Estimated completion: {q.completionDays} days from funding</p>
              <p className="mt-4 text-xs text-ink/50">This quotation is public to all households supporting this issue.</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border p-5 text-center" style={q.approved ? { borderColor: '#3C6E4740', background: '#3C6E4712' } : { borderColor: '#C9812F40', background: '#C9812F10' }}>
            {q.approved ? (
              <>
                <CheckCircle2 className="mx-auto h-6 w-6 text-moss" />
                <p className="mt-2 font-medium text-ink">This quotation has been approved by the community.</p>
                {STAGES.indexOf(issue.status) >= STAGES.indexOf('Funding') && (
                  <Link to={`/issues/${issue.id}/funding`} className="mt-3 inline-block rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper">
                    Go to Community Funding
                  </Link>
                )}
              </>
            ) : (
              <>
                <p className="font-medium text-ink">Awaiting community approval</p>
                <p className="mt-1 text-sm text-ink/60">Households backing this issue can approve the quotation to move to funding.</p>
                <button onClick={handleApprove} className="mt-4 rounded-md bg-route px-5 py-2.5 text-sm font-semibold text-white hover:bg-route/90">
                  Approve Quotation
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <p className="mt-6 text-ink/60">Preparing quotation…</p>
      )}
    </div>
  );
}
