import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Star, Briefcase, CalendarClock, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VENDORS } from '../data/mockData';
import { pkr } from '../utils/currency';

export default function VendorMarketplace() {
  const [params] = useSearchParams();
  const issueId = params.get('issue');
  const { issues, selectVendor, showToast } = useApp();
  const navigate = useNavigate();
  const [detailVendor, setDetailVendor] = useState(null);

  const issue = issueId ? issues.find((it) => it.id === issueId) : null;
  const relevantVendors = issue ? VENDORS.filter((v) => v.categories.includes(issue.category)) : VENDORS;
  const otherVendors = issue ? VENDORS.filter((v) => !v.categories.includes(issue.category)) : [];

  function handleSelect(vendor) {
    if (issue) {
      selectVendor(issue.id, vendor.id);
      showToast(`${vendor.name} selected for "${issue.title}".`);
      navigate(`/issues/${issue.id}/quotation`);
    } else {
      showToast(`Request sent to ${vendor.name}.`);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">Vendor &amp; Fixer Marketplace</h1>
      {issue ? (
        <p className="mt-2 text-ink/60">
          Choosing a vendor for <Link to={`/issues/${issue.id}`} className="font-medium text-teal hover:underline">{issue.title}</Link> ({issue.category}).
        </p>
      ) : (
        <p className="mt-2 text-ink/60">Vetted local vendors ready to take on community-funded repairs.</p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relevantVendors.map((v) => (
          <VendorCard key={v.id} vendor={v} highlighted={!!issue} onDetails={() => setDetailVendor(v)} onSelect={() => handleSelect(v)} issue={issue} />
        ))}
      </div>

      {otherVendors.length > 0 && (
        <>
          <p className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-ink/40">Other vendors</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherVendors.map((v) => (
              <VendorCard key={v.id} vendor={v} onDetails={() => setDetailVendor(v)} onSelect={() => handleSelect(v)} issue={issue} />
            ))}
          </div>
        </>
      )}

      {detailVendor && <VendorModal vendor={detailVendor} onClose={() => setDetailVendor(null)} onSelect={() => { handleSelect(detailVendor); setDetailVendor(null); }} issue={issue} />}
    </div>
  );
}

function VendorCard({ vendor, onDetails, onSelect, highlighted, issue }) {
  return (
    <div className={`flex flex-col rounded-lg border bg-white/60 p-5 ${highlighted ? 'border-teal/40' : 'border-ink/10'}`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-medium text-ink">{vendor.name}</h3>
        <span className="flex items-center gap-1 rounded-full bg-route/10 px-2 py-0.5 text-xs font-semibold text-route">
          <Star className="h-3 w-3 fill-current" /> {vendor.rating}
        </span>
      </div>
      <p className="mt-1 text-xs text-ink/50">{vendor.reviews} reviews · {vendor.categories.join(', ')}</p>
      <p className="mt-2 text-sm text-ink/70">{vendor.tagline}</p>
      <div className="mt-3 flex items-center gap-4 text-xs text-ink/50">
        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {vendor.completedJobs} jobs</span>
        <span className="flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {vendor.yearsActive} yrs active</span>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={onDetails} className="flex-1 rounded-md border border-ink/20 px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5">
          View Details
        </button>
        <button onClick={onSelect} className="flex-1 rounded-md bg-ink px-3 py-2 text-sm font-semibold text-paper hover:bg-ink/90">
          {issue ? 'Select Vendor' : 'Request Vendor'}
        </button>
      </div>
    </div>
  );
}

function VendorModal({ vendor, onClose, onSelect, issue }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-paper p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">{vendor.name}</h2>
            <p className="mt-1 flex items-center gap-1 text-sm text-route"><Star className="h-3.5 w-3.5 fill-current" /> {vendor.rating} · {vendor.reviews} reviews</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-ink/50 hover:bg-ink/5"><X className="h-5 w-5" /></button>
        </div>
        <p className="mt-3 text-sm text-ink/70">{vendor.tagline}</p>
        <p className="mt-2 text-xs text-ink/50">Serves: {vendor.categories.join(', ')}</p>
        <p className="mt-4 text-sm font-semibold text-ink">Previous work</p>
        <ul className="mt-2 space-y-2">
          {vendor.pastWork.map((w, i) => (
            <li key={i} className="flex items-center justify-between rounded-md bg-white/60 px-3 py-2 text-sm">
              <span className="text-ink/75">{w.title} <span className="text-ink/40">· {w.area}</span></span>
              <span className="font-mono text-xs text-ink/60">{pkr(w.cost)}</span>
            </li>
          ))}
        </ul>
        <button onClick={onSelect} className="mt-5 w-full rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-ink/90">
          {issue ? 'Select This Vendor' : 'Request This Vendor'}
        </button>
      </div>
    </div>
  );
}
